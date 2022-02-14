import React from 'react';
import Particle from '../components/Particle';
import SliderMainParticleGrey from '../components/SliderMainParticleGrey';
import FeatureBox from '../components/FeatureBox';
import CarouselCollectionRedux from '../components/CarouselCollectionRedux';
import CarouselNewRedux from '../components/CarouselNewRedux';
import AuthorListRedux from '../components/AuthorListRedux';
import Footer from '../components/footer';

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from '../Styles';
import MintBox from '../components/MintBox';
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
          <h2>New Items</h2>
        </div>
      </div>
      <CarouselNewRedux />
    </section>

    {/* <section className='container no-top no-bottom'>
      <div className='row'>
        <div className="spacer-double"></div>
        <div className='col-lg-12'>
          <h2>Top Sellers</h2>
        </div>
        <div className='col-lg-12'>
          <AuthorListRedux />
        </div>
      </div>
    </section>  */}
{/* 
    <section className='container no-top no-bottom'>
      <div className='row'>
        <div className="spacer-double"></div>
        <div className='col-lg-12 mb-2'>
          <h2>Hot Collections</h2>
        </div>
        <div className='col-lg-12'>
          <CarouselCollectionRedux />
        </div>
      </div>
    </section> */}

    {/* <section className='container no-top'>
      <div className='row'>
        <div className="spacer-double"></div>
        <div className='col-lg-12 mb-3'>
          <h2>Create and Sell Now</h2>
        </div>
        <FeatureBox />
      </div>
    </section> */}

    <Footer />

  </div>
);
export default homeone;