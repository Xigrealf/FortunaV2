import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home2Grey';
import Home2grey from './pages/home2Grey';
import Explore from './pages/explore';
import Exploregrey from './pages/exploreGrey';
import Explore2 from './pages/explore2';
import Explore2grey from './pages/explore2Grey';
import ExploreOpensea from './pages/Opensea/explore';
// import Rangking from './pages/rangking';
import RankingRedux from './pages/RankingRedux';
import RankingReduxgrey from './pages/RankingReduxGrey';
import Colection from './pages/colection';
import Colectiongrey from './pages/colectionGrey';
// import ItemDetail from './pages/ItemDetail';
import ItemDetailRedux from './pages/ItemDetailRedux';
import ItemDetailReduxgrey from './pages/ItemDetailReduxGrey';
import Author from './pages/Author';
import AuthorGrey from './pages/AuthorGrey';
import AuthorOpensea from './pages/Opensea/author';
import Login from './pages/login';
import Logingrey from './pages/loginGrey';
import LoginTwo from './pages/loginTwo';
import LoginTwogrey from './pages/loginTwoGrey';
import Register from './pages/register';
import Registergrey from './pages/registerGrey';
import Price from './pages/price';
import Works from './pages/works';
import News from './pages/news';
import NewsSingle from './pages/newsSingle';
import Create from './pages/create';
import Creategrey from './pages/createGrey';
import Create2 from './pages/create2';
import Create3 from './pages/create3';
import Createoption from './pages/createOptions';
import Activity from './pages/activity';
import Activitygrey from './pages/activityGrey';
import Contact from './pages/contact';
import Contactgrey from './pages/contactGrey';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Accordion from './pages/accordion';
import Alerts from './pages/alerts';
import Progressbar from './pages/progressbar';
import Tabs from './pages/tabs';
import Minter from './pages/Minter';
import Mintergrey from './pages/MinterGrey';
import Profile from './pages/Profile';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const app = () => (
  <div className="wraper">
    <GlobalStyles />
    <Header />
    <PosedRouter>
      <ScrollTop path="/">
        <Home exact path="/">
          <Redirect to="/" />
        </Home>
        
        <Home2grey path="/home2Grey" />
        <Explore path="/explore" />
        <Exploregrey path="/exploreGrey" />
        <Explore2 path="/explore2" />
        <Explore2grey path="/explore2Grey" />
        <ExploreOpensea path="/exploreOpensea" />
        <RankingRedux path="/rangking" />
        <RankingReduxgrey path="/rangkingGrey" />
        <Colection path="/colection/:collectionId" />
        <Colectiongrey path="/colectionGrey/:collectionId" />
        <ItemDetailRedux path="/ItemDetail/:nftId" />
        <ItemDetailReduxgrey path="/ItemDetailGrey/:nftId" />
        <Author path="/Author/:authorId" />
        <Profile path="/Profile/:authorId" />
        <AuthorGrey path="/AuthorGrey/:authorId" />
        <AuthorOpensea path="/AuthorOpensea" />
        <Login path="/login" />
        <Logingrey path="/loginGrey" />
        <LoginTwo path="/loginTwo" />
        <LoginTwogrey path="/loginTwoGrey" />
        <Register path="/register" />
        <Registergrey path="/registerGrey" />
        <Price path="/price" />
        <Works path="/works" />
        <News path="/news" />
        <NewsSingle path="/news/:postId" />
        <Create path="/create" />
        <Creategrey path="/createGrey" />
        <Create2 path="/create2" />
        <Create3 path="/create3" />
        <Createoption path="/createOptions" />
        <Activity path="/activity" />
        <Activitygrey path="/activityGrey" />
        <Contact path="/contact" />
        <Contactgrey path="/contactGrey" />
        <ElegantIcons path="/elegantIcons" />
        <EtlineIcons path="/etlineIcons" />
        <FontAwesomeIcons path="/fontAwesomeIcons" />
        <Accordion path="/accordion" />
        <Alerts path="/alerts" />
        <Progressbar path="/progressbar" />
        <Tabs path="/tabs" />
        <Minter path="/mint" />
        <Mintergrey path="/minter" />
      </ScrollTop>
    </PosedRouter>
    <ScrollToTopBtn />
  </div>
);
export default app;