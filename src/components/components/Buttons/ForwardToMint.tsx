import { Link } from "@material-ui/core";
import { PrimaryButton } from "@olympusdao/component-library";
import React, { useEffect } from "react";
import Reveal from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { getTickets } from "../../../helpers/TransactionHelper";
import { useWeb3Context, Web3ContextProvider } from "../../../hooks/Web3Context";
import { getTicketsMockTether } from "../../../slices/LotterySlice";
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
const MintTicketButton: React.FC = () => {
    const dispatch = useDispatch();
    const { connect, provider, address, networkId } = useWeb3Context();

    console.log("Here!");
    const GetTicket = async () => {
        console.log("In Dispatch Function!");
        await dispatch(getTicketsMockTether({ currentAddress: address, amount: "1", provider, networkID: networkId }));
    }
    return (
        <div>
            {!address
                ? (
                    <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
                        <span onClick={connect} className="btn-main inline lead"> Please Connect Your Wallet In Order To Participate! </span>
                        <span className='lines'></span>
                        <div className="mb-sm-30"></div>
                    </Reveal>
                )
                : (
                    <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
                        <h4> <span className="color">You Can Mint Your Tickets Below</span></h4>
                        <div className="mb-sm-30"></div>
                    </Reveal>
                )
            }
        </div>
    );
};

export default MintTicketButton;
