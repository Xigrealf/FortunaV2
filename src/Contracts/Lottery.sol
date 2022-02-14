// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Tether.sol';
import './IFortunaNFT.sol';
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts@4.4.2/security/Pausable.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";

/// @custom:security-contact fortuna@fortuna.wtf
contract Lottery is VRFConsumerBase, Ownable, Pausable {
    string public name = 'Lottery HQ';

    mapping(uint256 => mapping(uint256 => address)) public ticketNumberAddress;
    mapping(uint256 => mapping(address => uint256)) public depositBalance;
    mapping(uint256 => mapping(address => uint256)) public ticketBalance;
    mapping(uint256 => mapping(address => uint256)) public wonAmountByRaffleNumber;
    mapping(address => uint256) public withdrawnWinnings;
    mapping(address => uint256) public withdrawableWinnings;
    mapping(uint256 => uint256) public currentRaffleBalance;
    uint256 public currentTicketAmount;

    uint256 public marketingBalance;
    uint256 public currentLottery;
    uint256 public charityBalance;
    uint256 public teamPercentage;
    uint256 public countOfWinners;
    uint256[] public randomNumbers;
    uint256 public teamBalance;
    uint256 public ticketPrice;
    address public winner;
    bool public mainPrizeWon;
    bytes32 internal keyHash;
    Tether public tether;
    uint256 internal fee;
    address public nftAddress;
    uint256 public currentRaffleCounter;
    address public chainLinkMessageback;

    struct Percentages {
        uint256 teamPercentage;
        uint256 rafflePercentage;
        uint256 charityPercentage;
    }

    struct RaffleSettings {
        uint256 maxTicketAmount;
        uint256 ticketLimitPerWallet;
        uint256 ticketPrice;
    }

    Percentages percentages;
    RaffleSettings settings;

    constructor(Tether _tether)
        VRFConsumerBase(
        0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
        0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        )
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.1 LINK (Varies by network)
  
        tether = _tether;

        settings = RaffleSettings(50,20,10);
        percentages = Percentages(80,10,0);
        currentTicketAmount = 0;
        charityBalance = 0;
        currentRaffleBalance[currentRaffleCounter] = 0;
        ticketPrice = 10 * 1e18;
        teamBalance = 0;
        marketingBalance = 0;
        currentRaffleCounter = 1;
    }
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setNFTAddress(address contractAddress) public onlyOwner {
        nftAddress = contractAddress;
    }

    // Buy Tickets Function
    function getTickets(uint256 ticketAmount) public {
        uint256 totalTicketAmount = ticketBalance[currentRaffleCounter][msg.sender] + ticketAmount; // Ticket Amount After Function Finishes

        // require(totalTicketAmount >= 1 && totalTicketAmount <= settings.ticketLimitPerWallet, "You can't buy more than X tickets per wallet."); // Set the constraints for ticket amount
        require((currentTicketAmount + ticketAmount) < settings.maxTicketAmount, "There are X tickets left to claim you can't buy more than that.");

        // Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), ticketAmount * 10 * 1e18);

        // Update Ticket Balance
        ticketBalance[currentRaffleCounter][msg.sender] = ticketBalance[currentRaffleCounter][msg.sender] + ticketAmount;
        // ticketBuyers[ticketBuyers.length] = msg.sender;

        for (uint i = 0; i < ticketAmount; i++) {  //for loop example
            ticketNumberAddress[currentRaffleCounter][currentTicketAmount+i] = msg.sender;    
        }
        currentTicketAmount += ticketAmount;

        //MintNFT
        // mintNFT(ticketAmount);
        // IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmNW34iGqj4EqsN4yhU3iFhZWWs45c9R7fotJKrkJnBx41");

        // Update Deposited Tether Balance
        depositBalance[currentRaffleCounter][msg.sender] = depositBalance[currentRaffleCounter][msg.sender] + ticketAmount * settings.ticketPrice  * 1e18;

        charityBalance += ticketAmount * settings.ticketPrice * percentages.charityPercentage / 100 * 1e18;//To Charity
        teamBalance += ticketAmount * settings.ticketPrice * percentages.teamPercentage / 100 * 1e18; //To Team
        currentRaffleBalance[currentRaffleCounter] += ticketAmount * settings.ticketPrice * percentages.rafflePercentage / 100 * 1e18; //To Lottery Pool
    }

    // function mintNFT(uint256 ticketAmount) internal {
    //     if(ticketAmount == 1) {
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmNW34iGqj4EqsN4yhU3iFhZWWs45c9R7fotJKrkJnBx41");
    //     }
    //     else if (ticketAmount == 2) {
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmcM8wihikMmpz2FMxPoXnnHgZoDmKJs8nwzckzgEKdtp3");
    //     }
    //     else if (ticketAmount == 3) {
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmPJQdCpsUS9WifmrVUV649E36mbYTvo22FC8Lt61MFtoZ");
    //     }
    //     else if (ticketAmount == 4) {
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmPJQdCpsUS9WifmrVUV649E36mbYTvo22FC8Lt61MFtoZ");
    //     }
    //     else if (ticketAmount >= 5) {
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmPJQdCpsUS9WifmrVUV649E36mbYTvo22FC8Lt61MFtoZ");
    //     }
    //     else if (ticketAmount >= 15)
    //     {
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmPJQdCpsUS9WifmrVUV649E36mbYTvo22FC8Lt61MFtoZ");
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmPJQdCpsUS9WifmrVUV649E36mbYTvo22FC8Lt61MFtoZ");
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmPJQdCpsUS9WifmrVUV649E36mbYTvo22FC8Lt61MFtoZ");
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmPJQdCpsUS9WifmrVUV649E36mbYTvo22FC8Lt61MFtoZ");
    //         IFortunaNFT(nftAddress).raffleMint(msg.sender,"QmPJQdCpsUS9WifmrVUV649E36mbYTvo22FC8Lt61MFtoZ");
    //     }
    // }

    // Withdraw Winnings
    function withdrawWinnings() public {
        require(withdrawableWinnings[msg.sender] > 0);

        tether.transfer(msg.sender, withdrawableWinnings[msg.sender]);
        withdrawnWinnings[msg.sender] = withdrawableWinnings[msg.sender];
        withdrawableWinnings[msg.sender] = 0;
    }

    function updatePercentages(uint256 raffleyPerc, uint256 teamPerc, uint256 charityPerc) private onlyOwner {
        require((raffleyPerc + teamPerc + charityPerc) == 100);
        percentages.rafflePercentage = raffleyPerc;
        percentages.teamPercentage = teamPerc;
        percentages.charityPercentage = charityPerc;
    }


    function updateLottery(uint256 ticketLimit, uint256 ticketPerWalletLimit,uint256 ticketPriceUpdate) private onlyOwner {
        settings = RaffleSettings(ticketLimit, ticketPerWalletLimit, ticketPriceUpdate);
    }

    /** 
     * Requests randomness 
     */
    function getRandomNumber() public onlyOwner returns (bytes32 requestId)  {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        chainLinkMessageback = msg.sender;
        require(msg.sender == 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255);
        uint256 randomWinner = randomness;
        randomNumbers = expand(randomWinner,101);
    }

    function expand(uint256 randomValue, uint256 n) public returns (uint256[] memory expandedValues) {

        expandedValues = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            expandedValues[i] = uint256(keccak256(abi.encode(randomValue, i))) % currentTicketAmount;
        }
        return expandedValues;
    }

    //Winner %62.5 1 Person
    //Secondary Winner %1.25 24 Person
    //%0.001 75 Person
    function winners() public onlyOwner{
        bool primary = false;
        bool secondary = false;
        for(uint256 i = 0; i < 100; i++){
            if(i == 0){
                withdrawableWinnings[ticketNumberAddress[currentRaffleCounter][randomNumbers[i]]] += currentRaffleBalance[currentRaffleCounter] * 625 / 1000;
            } else if (i > 0 && i <= 24) {
                withdrawableWinnings[ticketNumberAddress[currentRaffleCounter][randomNumbers[i]]] += currentRaffleBalance[currentRaffleCounter] * 125 / 10000;
            } else{
                withdrawableWinnings[ticketNumberAddress[currentRaffleCounter][randomNumbers[i]]] += currentRaffleBalance[currentRaffleCounter] / 100000;
            }
        }
        resetLottery();
    }

    function resetLottery() public onlyOwner
    {
        currentRaffleCounter++;
        currentRaffleBalance[currentRaffleCounter] = 0;
    }

    function withdrawTeamBalance() public onlyOwner
    {
        //Send Token To Team Wallet
        tether.transfer(msg.sender, teamBalance);
    }

    function sendCharityBalance() public onlyOwner
    {
        //Send Charity Balance
        tether.transfer(msg.sender, charityBalance);
    }

    function ticketsLeft() public view returns (uint256) {
        return (settings.maxTicketAmount - currentTicketAmount);
    }

    function raffleSettings() public view returns(uint256, uint256, uint256) {
        return(settings.maxTicketAmount, settings.ticketLimitPerWallet, settings.ticketPrice);
    }

    function getPercentages() public view returns(uint256, uint256 , uint256){
        return (percentages.rafflePercentage, percentages.charityPercentage, percentages.teamPercentage);
    }

    function raffleCounter() public view returns(uint256) {
        return currentRaffleCounter;
    }

    function getWinningsAmount() public view returns(uint256) {
        return withdrawableWinnings[msg.sender];
    }

}