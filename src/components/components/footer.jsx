import React from 'react';
import { Link } from '@reach/router';

const footer = () => (
    <footer className="footer-light">
        <div className="container">
            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-1">
                    <div className="widget">
                        <h5>NFT Artists</h5>
                            <ul>
                                <li><a href="https://jossiepops.com/">JossiePops</a></li>
                                {/* <li><Link to="">Art</Link></li>
                                <li><Link to="">Music</Link></li>
                                <li><Link to="">Domain Names</Link></li>
                                <li><Link to="">Virtual World</Link></li>
                                <li><Link to="">Collectibles</Link></li> */}
                            </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-1">
                    <div className="widget">
                        <h5>Resources</h5>
                            <ul>
                                {/* <li><Link to="">Help Center</Link></li>
                                <li><Link to="">Partners</Link></li>
                                <li><Link to="">Suggestions</Link></li> */}
                                <li><a href="https://discord.gg/5CuuX4f5">Discord</a></li>
                                <li><a href="https://fortuna-1.gitbook.io/fortuna-protocol/">GitBook</a></li>
                                {/* <li><Link to="">Newsletter</Link></li> */}
                            </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-1">
                    <div className="widget">
                        <h5>Community</h5>
                        <ul>
                            <li><a href="https://discord.gg/5CuuX4f5">Community</a></li>
                            {/* <li><Link to="">Documentation</Link></li> */}
                            {/* <li><Link to="">Brand Assets</Link></li> */}
                            {/* <li><Link to="">Blog</Link></li>
                                <li><Link to="">Forum</Link></li>
                                <li><Link to="">Mailing List</Link></li> */}
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-1">
                    <div className="widget">
                    <h5>Charity</h5>
                        <ul>
                            <li><a href="https://theoceancleanup.com/">Ocean Cleanup</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="subfooter">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="de-flex">
                            <div className="de-flex-col">
                                <span onClick={() => window.open("", "_self")}>
                                    <img alt="" className="f-logo d-1" src="./img/logo.png" />
                                    <img alt="" className="f-logo d-3" src="./img/logo-2-light.png" />
                                    <img alt="" className="f-logo d-4" src="./img/logo-3.png" />
                                    <span className="copy">&copy; Copyright 2021 - Gigaland by Designesia</span>
                                </span>
                            </div>
                            <div className="de-flex-col">
                                <div className="social-icons">
                                    {/* <span onClick={() => window.open("", "_self")}><i className="fa fa-facebook fa-lg"></i></span> */}
                                    <span onClick={() => window.open("https://twitter.com/FortunaProtocol", "_self")}><i className="fa fa-twitter fa-lg"></i></span>
                                    {/* <span onClick={() => window.open("", "_self")}><i className="fa fa-linkedin fa-lg"></i></span>
                                    <span onClick={() => window.open("", "_self")}><i className="fa fa-pinterest fa-lg"></i></span>
                                    <span onClick={() => window.open("", "_self")}><i className="fa fa-rss fa-lg"></i></span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);
export default footer;