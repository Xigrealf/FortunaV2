import React, { useEffect } from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import Particle from './Particle';
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



const slidermainparticle = () => (
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-6">
        <Particle />
        <div className="spacer-single"></div>
        <h1> <span className="text-uppercase color">Welcome To Fortuna</span></h1>
        <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
          <h1 className="col-white">Create, sell or collect digital items.</h1>
        </Reveal>
        <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={900} triggerOnce>
          <p className="lead col-white">
            Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable
          </p>
        </Reveal>
        <div className="spacer-10"></div>
        <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
          <MintTicketButton />
          <div className="mb-sm-30"></div>
        </Reveal>

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
      </div>
      <div className="col-md-6 xs-hide">
        <Reveal className='onStep d-inline' keyframes={inline} delay={300} duration={1200} triggerOnce>
          <img src="https://cdn.discordapp.com/attachments/939445012788314123/941356209603235840/ezgif.com-gif-maker.gif" className="img-fluid" alt="" />
        </Reveal>
      </div>
    </div>
  </div>
);
export default slidermainparticle;