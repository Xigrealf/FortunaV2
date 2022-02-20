import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import MintTicketButton from './Buttons/MintTicketButton';
import styled from "styled-components";

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
const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const MintBox = () => (

    <div className='row'>
        <div className="col-lg-6 col-md-6 mb-3">
            {/* <div className="feature-box f-boxed style-3"> */}
            {/* <img }}> */}
            <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                <span>
                    <img src={"./img/FortunaImages/FortunaPrizes.png"} className="lazy nft__item_preview img-fluid" />
                </span>
            </Reveal>
            {/* <i className="wm icon_wallet"></i> */}
            {/* </div> */}
        </div>
        <div className="col-lg-6 col-md-6 mb-3">
            {/* <div className="feature-box f-boxed style-3"> */}
            {/* <img }}> */}
            <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                <span>
                    <img src={"./img/FortunaImages/FortunaTickets.png"} className="lazy nft__item_preview img-fluid" />
                </span>
            </Reveal>
            {/* <i className="wm icon_wallet"></i> */}
            {/* </div> */}
        </div>
        <div className="feature-box f-boxed style-3">
            <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                <div className="text-center">
                    {/* <i className="bg-color-2 i-boxed icon_wallet"></i> */}
                    <img className="img-responsive" src="/img/USDC.png" className="img-fluid d-4" alt="#" />
                </div>
            </Reveal>
            <div className="text">
                <div className="text-center">
                    <MintTicketButton />
                </div>
            </div>
            <i className="wm icon_wallet"></i>
        </div>
    </div >
);
export default MintBox;