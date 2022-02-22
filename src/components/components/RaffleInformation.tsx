import React, { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { getTickets } from "../../helpers/TransactionHelper";
import { useWeb3Context, Web3ContextProvider } from "../../hooks/Web3Context";
import { getRaffleInformation, IRaffleDetails } from "../../slices/RaffleSlice";
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


const RaffleInformation: React.FC = () => {
    const dispatch = useDispatch();
    const { connect, provider, address, networkId } = useWeb3Context();
    const [mintAmount, setMintAmount] = useState(0);
    let information;
    const GetTicket = async () => {
        console.log("In Dispatch Function!");
        information = await dispatch(getRaffleInformation({ currentAddress: address, provider, networkID: networkId }));
    }

    return (
        <div>
            {!address
                ? (
                <div>
                    
                </div>
                )
                : (
                    <div className="row text-center">
                        <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                            <h4 className="text-left">Tickets Left: {information.ticketsLeft}</h4>
                        </Reveal>
                        <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                            <p className="">Please Enter Your Desired Amount Of Tickets</p>
                        </Reveal>
                        <Reveal className='onStep w-100' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                            <div className="row justify-content-center align-item-center h-100">
                                <div className="col col-md-6 col-lg-4 col-xl-3">
                                    <div></div>
                                    <form action="#" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                                        <input className="form-control text-center" onChange={(e) => setMintAmount(e.target.valueAsNumber)} placeholder="    Desired Amount Of Tickets" type="number" />
                                    </form>
                                </div>
                            </div>
                        </Reveal>
                       
                    </div>
                )
            }
        </div>
    );
};

export default RaffleInformation;
