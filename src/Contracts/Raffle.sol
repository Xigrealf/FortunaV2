// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './IStable.sol';
import './IFortunaNFT.sol';
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts@4.4.2/security/Pausable.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";

/// @custom:security-contact fortuna@fortuna.wtf
contract Raffle is VRFConsumerBase, Ownable, Pausable {
    string public name = 'Fortuna Raffle';

    mapping(uint256 => mapping(uint256 => address)) public ticketNumberAddress;
    mapping(uint256 => mapping(address => uint256)) public depositBalance;
    mapping(uint256 => mapping(address => uint256)) public ticketBalance;
    mapping(uint256 => mapping(address => uint256)) public wonAmountByRaffleNumber;
    mapping(address => uint256) public withdrawnWinnings;
    mapping(address => uint256) public withdrawableWinnings;
    mapping(uint256 => uint256) public currentRaffleBalance;
    uint256 public currentRaffleCounter;
    uint256 public currentTicketAmount;
    address public stableCoinAddress;
    uint256 public marketingBalance;
    uint256 public charityBalance;
    uint256 public randomWinner;
    uint256 public teamBalance;
    address public winner;
    bytes32 internal keyHash;
    uint256 internal fee;
    address public nftAddress;
    address public teamAddress;


    struct Percentages {
        uint256 rafflePercentage;
        uint256 teamPercentage;
        uint256 charityPercentage;
    }

    struct RaffleSettings {
        uint256 maxTicketAmount;
        uint256 ticketLimitPerWallet;
        uint256 ticketPrice;
    }

    struct NFTLinks {
        string commonLink;
        string uncommonLink;
        string rareLink;
        string epicLink;
        string legendaryLink;
    }

    Percentages percentages;
    RaffleSettings settings;
    NFTLinks links;

    constructor(address _stable)
        VRFConsumerBase(
        0x3d2341ADb2D31f1c5530cDC622016af293177AE0, // VRF Coordinator
        0xb0897686c545045aFc77CF20eC7A532E3120E0F1  // LINK Token
        )
    {
        keyHash = 0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da;
        fee = 0.0001 * 10 ** 18; // 0.1 LINK (Varies by network)
  
        stableCoinAddress = _stable;

        settings = RaffleSettings(5000,5000,10);
        links = NFTLinks(
        "ipfs://QmaDsTvUgxzho6TjVSYE7xp5kfzV1AcVNrLXi8AMzh8QP1/TylerDurdenV2.json",
        "ipfs://QmaDsTvUgxzho6TjVSYE7xp5kfzV1AcVNrLXi8AMzh8QP1/SonicV2.json",
        "ipfs://QmaDsTvUgxzho6TjVSYE7xp5kfzV1AcVNrLXi8AMzh8QP1/BatmanV2.json",
        "ipfs://QmaDsTvUgxzho6TjVSYE7xp5kfzV1AcVNrLXi8AMzh8QP1/DeadpoolV2.json",
        "ipfs://QmaDsTvUgxzho6TjVSYE7xp5kfzV1AcVNrLXi8AMzh8QP1/EminemV2.json"
        );
        percentages = Percentages(80,10,10);
        currentTicketAmount = 0;
        charityBalance = 0;
        currentRaffleBalance[currentRaffleCounter] = 0;
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

    function setTeamAddress(address contractAddress) public onlyOwner {
        teamAddress = contractAddress;
    }

    // Buy Tickets Function
    function getTickets(uint256 ticketAmount) public {
        uint256 totalTicketAmount = ticketBalance[currentRaffleCounter][msg.sender] + ticketAmount; // Ticket Amount After Function Finishes

        // require(totalTicketAmount >= 1 && totalTicketAmount <= settings.ticketLimitPerWallet, "You can't buy more than X tickets per wallet."); // Set the constraints for ticket amount
        require((currentTicketAmount + ticketAmount) <= settings.maxTicketAmount, "There are X tickets left to claim you can't buy more than that.");

        // Transfer tether tokens to this contract address for staking
        IStable(stableCoinAddress).transferFrom(msg.sender, address(this), ticketAmount * settings.ticketPrice * 1e6);

        // Update Ticket Balance
        ticketBalance[currentRaffleCounter][msg.sender] = ticketBalance[currentRaffleCounter][msg.sender] + ticketAmount;
        // ticketBuyers[ticketBuyers.length] = msg.sender;

        for (uint i = 0; i < ticketAmount; i++) {  //for loop example
            ticketNumberAddress[currentRaffleCounter][currentTicketAmount+i] = msg.sender;    
        }
        currentTicketAmount += ticketAmount;

        //MintNFT
        mintNFT(ticketAmount);
        // Update Deposited Tether Balance
        depositBalance[currentRaffleCounter][msg.sender] = depositBalance[currentRaffleCounter][msg.sender] + ticketAmount * settings.ticketPrice  * 1e6;

        charityBalance += ticketAmount * settings.ticketPrice * percentages.charityPercentage / 100 * 1e6;//To Charity
        teamBalance += ticketAmount * settings.ticketPrice * percentages.teamPercentage / 100 * 1e6; //To Team
        currentRaffleBalance[currentRaffleCounter] += ticketAmount * settings.ticketPrice * percentages.rafflePercentage / 100 * 1e6; //To Lottery Pool
    }

    function mintNFT(uint256 ticketAmount) internal {
        if(ticketAmount <= 2) {
            IFortunaNFT(nftAddress).raffleMint(msg.sender,links.commonLink);
        }
        else if (ticketAmount <= 4) {
            IFortunaNFT(nftAddress).raffleMint(msg.sender,links.uncommonLink);
        }
        else if (ticketAmount <= 6) {
            IFortunaNFT(nftAddress).raffleMint(msg.sender,links.rareLink);
        }
        else if (ticketAmount <= 8) {
            IFortunaNFT(nftAddress).raffleMint(msg.sender,links.epicLink);
        }
        else if (ticketAmount > 8) {
            IFortunaNFT(nftAddress).raffleMint(msg.sender,links.legendaryLink);
        }
       
    }

    // Withdraw Winnings
    function withdrawWinnings() public {
        require(withdrawableWinnings[msg.sender] > 0);

        IStable(stableCoinAddress).transfer(msg.sender, withdrawableWinnings[msg.sender]);
        withdrawnWinnings[msg.sender] = withdrawableWinnings[msg.sender];
        withdrawableWinnings[msg.sender] = 0;
    }

    // Withdraw Winnings
    function withdrawWinningsForAddress(address withdrawAddress) public onlyOwner {
        require(withdrawableWinnings[withdrawAddress] > 0);

        IStable(stableCoinAddress).transfer(withdrawAddress, withdrawableWinnings[withdrawAddress]);
        withdrawnWinnings[withdrawAddress] = withdrawableWinnings[withdrawAddress];
        withdrawableWinnings[withdrawAddress] = 0;
    }

    function updatePercentages(uint256 raffleyPerc, uint256 teamPerc, uint256 charityPerc) public onlyOwner {
        require((raffleyPerc + teamPerc + charityPerc) == 100);
        percentages.rafflePercentage = raffleyPerc;
        percentages.teamPercentage = teamPerc;
        percentages.charityPercentage = charityPerc;
    }


    function updateLottery(uint256 ticketLimit, uint256 ticketPerWalletLimit,uint256 ticketPriceUpdate) public onlyOwner {
        settings = RaffleSettings(ticketLimit, ticketPerWalletLimit, ticketPriceUpdate);
    }

    function updateNFT(string memory common, string memory uncommon, string memory rare, string memory epic, string memory legendary) public onlyOwner {
        links = NFTLinks(common,uncommon,rare,epic,legendary);
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
        randomWinner = (randomness % currentTicketAmount) + 1;
    }

    function expand(uint randomNumber,uint256 n, uint256 raffleTicketCount) internal pure returns (uint256[] memory expandedValues) {
        expandedValues = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            expandedValues[i] = uint256(keccak256(abi.encode(randomNumber, i))) % raffleTicketCount;
        }
        return expandedValues;
    }

    function delegateWinners() public onlyOwner
    {
        winners(expand(randomWinner, 100, currentTicketAmount));
    }

    //Winner %62.5 1 Person
    //Secondary Winner %1.25 24 Person
    //%0.1 75 Person
    function winners(uint256[] memory randomNumbers) internal onlyOwner{
        for(uint256 i = 0; i < 100; i++){
            if(i == 0){
                withdrawableWinnings[ticketNumberAddress[currentRaffleCounter][randomNumbers[i]]] += currentRaffleBalance[currentRaffleCounter] * 625 / 1000;
            } else if (i > 0 && i <= 24) {
                withdrawableWinnings[ticketNumberAddress[currentRaffleCounter][randomNumbers[i]]] += currentRaffleBalance[currentRaffleCounter] * 125 / 10000;
            } else{
                withdrawableWinnings[ticketNumberAddress[currentRaffleCounter][randomNumbers[i]]] += currentRaffleBalance[currentRaffleCounter] / 1000;
            }
        }
        resetLottery();
    }

    function resetLottery() public onlyOwner
    {
        currentRaffleCounter++;
        currentTicketAmount = 0;
        currentRaffleBalance[currentRaffleCounter] = 0;
    }

    function withdrawTeamBalance() public onlyOwner
    {
        //Send Token To Team Wallet
        IStable(stableCoinAddress).transfer(teamAddress, teamBalance);
    }

    function withdrawCharityBalance() public onlyOwner
    {
        //Send Charity Balance
        IStable(stableCoinAddress).transfer(teamAddress, charityBalance);
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

    function getCurrentRaffleBalance() public view returns(uint256) {
        return (currentRaffleBalance[currentRaffleCounter]);
    }

    function getWinningsAmount() public view returns(uint256) {
        return withdrawableWinnings[msg.sender];
    }

    function getCurrentTickets() public view returns(uint256) {
        return ticketBalance[currentRaffleCounter][msg.sender];
    }
}