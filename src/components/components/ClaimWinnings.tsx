import React, { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { getTickets } from "../../helpers/TransactionHelper";
import { useWeb3Context, Web3ContextProvider } from "../../hooks/Web3Context";
import { claimWinnings, getRaffleInformation, RaffleDetails } from "../../slices/RaffleSlice";
import { keyframes } from "@emotion/react";

const inline = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  .d-inline{
    display: inline-block;
   }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;



const ClaimWinnings: React.FC = () => {
    const dispatch = useDispatch();
    let Loaded = false;
    let abc: any;
    const { connect, provider, address, networkId } = useWeb3Context();
    const [raffleInformation, setRaffleInformation] = useState<RaffleDetails>({ winnings: 0, raffleCounter: 0, ticketsLeft: 0, ticketsOwned: 0, prizePool: 0 });
    useEffect(() => {
            console.log("In Dispatch GetRaffleInformation Function!");
            Loaded = true;
            getInformation();
    }, [networkId]);

    const getInformation = async() => {
        console.log("Inside Get Information");
        let raffleDetails = await dispatch<any>(getRaffleInformation({ currentAddress: address, provider, networkID: networkId })).unwrap();
        setRaffleInformation(raffleDetails);
    }

    const ClaimWinnings = async () => {
        console.log("In Dispatch Function!");
        await dispatch(claimWinnings({ currentAddress: address, provider, networkID: networkId }));
    }
    return (
        <div>
            {!address
                ? (
                    <div></div>
                )
                : (
                    <div>
                        <div className="spacer-single"></div>
                        <div className="row">
                        <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                                <h5 className="">Current Winnings: {raffleInformation.winnings}</h5>
                            </Reveal>
                            <Reveal className='onStep d-inline' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
                                <span onClick={ClaimWinnings} className="btn-main inline lead">Claim Winnings</span>
                                <div className="mb-sm-30"></div>
                            </Reveal>
                        </div>
                        <div className="spacer-single"></div>
                    </div>
                )
            }
        </div>
    );
};

export default ClaimWinnings;
