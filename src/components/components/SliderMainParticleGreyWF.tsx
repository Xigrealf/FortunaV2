import React, { Component, useEffect, useState } from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import Particle from './Particle';
import ForwardToMint from './Buttons/ForwardToMint';
import { useDispatch } from "react-redux";
import { useWeb3Context, Web3ContextProvider } from "../../hooks/Web3Context";
import { getCurrentRaffleBalance, getTicketsLeft, getRaffleCounter } from "../../slices/RaffleSlice";

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



const SliderMainParticle: React.FC = () => {
  const dispatch = useDispatch();
  const { connect, provider, address, networkId } = useWeb3Context();
  const [ticketsLeft, setTicketsLeft] = useState(null);
  console.log("Here!");
  const GetTicketsLeft = async () => {
    console.log("In Dispatch Function!");
    let transactionDetail = await dispatch(getTicketsLeft({ currentAddress: address, provider, networkID: networkId }));
    console.log("🚀 ~ file: SliderMainParticleGrey.tsx ~ line 44 ~ GetTicket ~ transactionDetail", transactionDetail)
  }
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <Particle />
          <div className="spacer-single"></div>
          <div className="spacer-single"></div>
          <div className="spacer-single"></div>
          <div className="spacer-10"></div>

          <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
            <h1 className="col-white">Charity, Raffle, </h1>
            <h1 className="col-white"> NFT </h1>
          </Reveal>

          <div className="spacer-10"></div>
          <Reveal className='onStep d-inline' keyframes={inline} delay={800} duration={900} triggerOnce>
            <ForwardToMint />
            <div className="mb-sm-30"></div>
          </Reveal>

          <Reveal className='onStep d-inline' keyframes={inline} delay={900} duration={1200} triggerOnce>
            <div className="row">
              <div className="spacer-single"></div>
              <div className="row">
                  <div className="de_count text-left">
                    <h3>Welcome To Fortuna NFT Raffle</h3>
                  </div>
                {/* <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                  <div className="de_count text-left">
                    <h5 className="id-color">Current Lottery Balance</h5>
                  </div>
                </div> */}

                {/* <div className="col-lg-4 col-md-6 col-sm-4 mb30"> */}
                  <div className="de_count text-left">
                    <h5 className="id-color">Current Featured Artist</h5>
                    <h3 className='text-warning'>JossiePops</h3>
                  </div>
                  <div className="de_count text-left">
                    <h5 className="id-color">Current Charity</h5>
                    <h3 className='text-primary'>Ocean Cleanup</h3>
                  </div>
                {/* </div> */}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
export default SliderMainParticle;