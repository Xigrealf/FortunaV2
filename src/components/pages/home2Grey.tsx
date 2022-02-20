import React from 'react';
import Particle from '../components/Particle';
import SliderMainParticleGrey from '../components/SliderMainParticleGreyWF';
import FeatureBox from '../components/FeatureBox';
import CarouselCollectionRedux from '../components/CarouselCollectionRedux';
import CarouselNewRedux from '../components/CarouselNewRedux';
import AuthorListRedux from '../components/AuthorListRedux';
import Footer from '../components/footer';

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from '../Styles';
import MintBox from '../components/MintBox';
import NFTCarousel from '../components/NFTCarousel';
//SWITCH VARIABLE FOR PAGE STYLE
const theme = 'GREY'; //LIGHT, GREY, RETRO

const homeone = () => (
  <div className="greyscheme">
    <StyledHeader theme={theme} />
    <section className="jumbotron no-bg relative" style={{ backgroundImage: `url(${'./img/FortunaImages/FortunaBackground1.png'})` }}>
      {/* <Particle/> */}
      <SliderMainParticleGrey />
    </section>


    <section className='container no-top'>
      <div className='row'>
        <div className="spacer-double"></div>
        <div className='col-lg-6 mb-3'>
          <h2>Get Your Tickets Now</h2>
        </div>
        <MintBox />
      </div>
    </section>


     <section className='container no-top no-bottom'>
      <div className='row'>
        <div className="spacer-double"></div>
        <div className='col-lg-12 mb-2'>
          <h2>Raffle NFT's by JosiePops</h2>
        </div>
      </div>
      <NFTCarousel />
    </section>

    <Footer />

  </div>
);
export default homeone;