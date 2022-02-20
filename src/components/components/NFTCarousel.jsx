import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from "./Clock";
import { carouselNew } from './constants';
import * as selectors from '../../store/selectors';
import { fetchNftsBreakdown } from "../../store/actions/thunks";
import NFTS from "../../constants/currentNFTs.json";
import api from "../../core/api";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const NFTCarousel = () => {

    const dispatch = useDispatch();
    const nftsState = useSelector(selectors.nftBreakdownState);
    const nfts = nftsState.data ? nftsState.data : [];
    console.log("🚀 ~ file: NFTCarousel.jsx ~ line 28 ~ NFTCarousel ~ NFTS", NFTS)
    const obj = NFTS.toString()
    console.log("🚀 ~ file: NFTCarousel.jsx ~ line 28 ~ NFTCarousel ~ obj", obj)
    const nftArray = obj.NFTList;
    console.log("🚀 ~ file: NFTCarousel.jsx ~ line 27 ~ NFTCarousel ~ nftArray", nftArray)
    
    const [height, setHeight] = useState(0);

    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }
    
    useEffect(() => {
        dispatch(fetchNftsBreakdown());
    }, [dispatch]);

    return (
         <div className='nft'>
         <Slider {...carouselNew}>
           <div className='itm'>
             <div className="d-item">
               <div className="nft__item">
                   <div className="nft__item_wrap" style={{height: `${height}px`}}>
                     <Outer>
                       <span>
                           <img src={"http://bafybeicx6psefo754bjgpolobqkbets4uzdn4xql7rsu6ip6igmupdzcgq.ipfs.dweb.link/BatmanFortuna.gif"} className="lazy nft__item_preview img-fluid" onLoad={onImgLoad} alt=""/>
                       </span>
                     </Outer>
                   </div>
                   <div className="nft__item_info">
                       <span>
                           <h4>{"Sonic"}</h4>
                       </span>
                       <div className="nft__item_like">
                           <h4 className="text-secondary">{"Common"}</h4>
                       </div>                                                        
                   </div> 
               </div>
             </div>
           </div>
           <div className='itm'>
             <div className="d-item">
               <div className="nft__item">
                   <div className="nft__item_wrap" style={{height: `${height}px`}}>
                     <Outer>
                       <span>
                           <img src={"http://bafybeicx6psefo754bjgpolobqkbets4uzdn4xql7rsu6ip6igmupdzcgq.ipfs.dweb.link/BatmanFortuna.gif"} className="lazy nft__item_preview img-fluid" onLoad={onImgLoad} alt=""/>
                       </span>
                     </Outer>
                   </div>
                   <div className="nft__item_info">
                       <span>
                           <h4>{"Batman"}</h4>
                       </span>
                       <div className="nft__item_like">
                           <h4 className="text-success">{"Uncommon"}</h4>
                       </div>                                                        
                   </div> 
               </div>
             </div>
           </div>
           <div className='itm'>
             <div className="d-item">
               <div className="nft__item">
                   <div className="nft__item_wrap" style={{height: `${height}px`}}>
                     <Outer>
                       <span>
                           <img src={"http://bafybeicx6psefo754bjgpolobqkbets4uzdn4xql7rsu6ip6igmupdzcgq.ipfs.dweb.link/DeadpoolFortuna.gif"} className="lazy nft__item_preview img-fluid" onLoad={onImgLoad} alt=""/>
                       </span>
                     </Outer>
                   </div>
                   <div className="nft__item_info">
                       <span>
                           <h4>{"Deadpool"}</h4>
                       </span>
                       <div className="nft__item_like">
                           <h4 className="text-primary">{"Rare"}</h4>
                       </div>                                                        
                   </div> 
               </div>
             </div>
           </div>
           <div className='itm'>
             <div className="d-item">
               <div className="nft__item">
                   <div className="nft__item_wrap" style={{height: `${height}px`}}>
                     <Outer>
                       <span>
                           <img src={"http://bafybeicx6psefo754bjgpolobqkbets4uzdn4xql7rsu6ip6igmupdzcgq.ipfs.dweb.link/EminemFortuna.gif"} className="lazy nft__item_preview img-fluid" onLoad={onImgLoad} alt=""/>
                       </span>
                     </Outer>
                   </div>
                   <div className="nft__item_info">
                       <span>
                           <h4>{"Eminem"}</h4>
                       </span>
                       <div className="nft__item_like">
                           <h4 className="text-danger">{"Epic"}</h4>
                       </div>                                                        
                   </div> 
               </div>
             </div>
           </div>
           <div className='itm'>
             <div className="d-item">
               <div className="nft__item">
                   <div className="nft__item_wrap" style={{height: `${height}px`}}>
                     <Outer>
                       <span>
                           <img src={"http://bafybeicx6psefo754bjgpolobqkbets4uzdn4xql7rsu6ip6igmupdzcgq.ipfs.dweb.link/EminemFortuna.gif"} className="lazy nft__item_preview img-fluid" onLoad={onImgLoad} alt=""/>
                       </span>
                     </Outer>
                   </div>
                   <div className="nft__item_info">
                       <span>
                           <h4>{"Tyler Durden"}</h4>
                       </span>
                       <div className="nft__item_like">
                           <h4 className="text-warning">{"Legendary"}</h4>
                       </div>                                                        
                   </div> 
               </div>
             </div>
           </div>
         </Slider>
       </div>
    );
}

export default memo(NFTCarousel);
