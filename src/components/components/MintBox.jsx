import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import MintTicketButton from './Buttons/MintTicketButton';

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


const MintBox = () => (
    <div className='row'>
        <div className="spacer-10"></div>
        <div className="col-lg-4 col-md-6 mb-3 w-100">
            <div className="feature-box f-boxed style-3">
                <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                    <div className="text-center">
                        {/* <i className="bg-color-2 i-boxed icon_wallet"></i> */}
                        <img src="/img/USDC.png" className="img-fluid d-4" alt="#" />
                    </div>
                </Reveal>
                <div className="text">
                    <div className="text-center">
                        <MintTicketButton />
                    </div>
                </div>
                <i className="wm icon_wallet"></i>
            </div>
        </div>
    </div>
);
export default MintBox;