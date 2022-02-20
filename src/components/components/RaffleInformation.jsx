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
const RaffleInformation: React.FC = () => {
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
                    <Reveal className='onStep d-inline' keyframes={inline} delay={900} duration={1200} triggerOnce>
                        <div className="row">
                            <div className="spacer-single"></div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                                    <div className="de_count text-left">
                                        <h3><span>2381$</span></h3>
                                        <h5 className="id-color">Charity Balance</h5>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                                    <div className="de_count text-left">
                                        <h3><span>23810$</span></h3>
                                        <h5 className="id-color">Current Lottery Balance</h5>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                                    <div className="de_count text-left">
                                        <h3><span>2</span></h3>
                                        <h5 className="id-color">NFT Artist</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )
            }
        </div>
    );
};

export default RaffleInformation;
