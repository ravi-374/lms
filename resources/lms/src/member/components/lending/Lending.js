import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './lending.scss';
import {appSettingsKey, Routes} from "../../../constants";
import {getCurrentMember} from "../../../admin/shared/sharedMethod";
import {fetchAppSetting} from "../../../store/action/appSettingAction";
import {publicImagePath, publicImagePathURL} from "../../../appConstant";

const Lending = (props) => {
    const { fetchAppSetting, appSetting } = props;
    let appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;
    useEffect(() => {
        window.addEventListener("scroll", trackScrolling);
        fetchAppSetting();
        trackScrolling();
        return (() => document.removeEventListener('scroll', trackScrolling))
    });
    const removeActiveClass = () => {
        const c = document.getElementsByClassName('scrollToLink');
        for (let i = 0; i < c.length; i++) {
            if (c[i].classList.contains('current')) {
                c[i].classList.remove('current');
            }
        }
    };
    const isBottom = (el, prevEle = null, nextEle = null) => {
        if (el) {
            const currentElement = el.getBoundingClientRect().bottom;
            if (nextEle) {
                const nextElement = nextEle.getBoundingClientRect().bottom;
                return (currentElement <= window.innerHeight && nextElement > window.innerHeight);
            }
            if (prevEle) {
                const prevElement = prevEle.getBoundingClientRect().bottom;
                return (currentElement <= window.innerHeight && prevElement < currentElement);
            }
        }
    };
    const trackScrolling = () => {
        let element = document.getElementById('home');
        const currentElement = document.getElementById('scrollToLink-1');
        let element1 = document.getElementById('services');
        const currentElement1 = document.getElementById('scrollToLink-2');
        let element2 = document.getElementById('newsletter');
        const currentElement2 = document.getElementById('scrollToLink-3');
        const scrollElement = document.getElementById('scroll-btn');
        if (scrollElement) {
            scrollElement.classList.add('scroll-btn-fade-in');
        }
        if (window.scrollY === 0 && scrollElement) {
            scrollElement.classList.remove('scroll-btn-fade-in');
        }
        if (isBottom(element, null, element1)) {
            removeActiveClass();
            currentElement.classList.add('current');
        }
        if (isBottom(element1, null, element2)) {
            removeActiveClass();
            currentElement1.classList.add('current');
        }
        if (isBottom(element2, element1, null)) {
            removeActiveClass();
            currentElement2.classList.add('current');
        }
    };
    const scrollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };
    const scrollTo = (sourceElementId, destinationElementId) => {
        const sourceElement = document.getElementById(sourceElementId);
        const destinationElement = document.getElementById(destinationElementId);
        removeActiveClass();
        sourceElement.classList.add('current');
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: destinationElement.offsetTop
        });
    };
    return (
        <div id="page-wrapper">
            <div className="page-wrapper">
                <header className="site-header header-one">
                    <nav className="navbar navbar-expand-lg navbar-light header-navigation stricky">
                        <div className="container clearfix">
                            <div className="logo-box clearfix">
                                <a className="navbar-brand">
                                    <img src={appLogo} className="main-logo" alt="Awesome Image"/>
                                </a>
                                <button className="menu-toggle-btn" onClick={() => {
                                    const ele = document.getElementById("main-navigation");
                                    if (ele.classList.contains("slideDown-show")) {
                                        ele.classList.remove('slideDown-show');
                                        ele.classList.add('slideDown-hide');
                                    } else {
                                        ele.classList.remove('slideDown-hide');
                                        ele.classList.add('slideDown-show');
                                    }
                                }}>
                                    <span className="fa fa-bars"/>
                                </button>
                            </div>
                            <div id="main-navigation" className="main-navigation">
                                <ul className="navigation-box one-page-scroll-menu">
                                    <li className="scrollToLink current" id="scrollToLink-1" onClick={() =>
                                        scrollTo('scrollToLink-1', 'home')}>
                                        <div> Home</div>
                                        <ul className="sub-menu"/>
                                    </li>
                                    <li className="scrollToLink" id="scrollToLink-2" onClick={() =>
                                        scrollTo('scrollToLink-2', 'services')}>
                                        <div> Features</div>
                                    </li>
                                    <li className="scrollToLink" id="scrollToLink-3" onClick={() =>
                                        scrollTo('scrollToLink-3', 'newsletter')}>
                                        <div> Newsletter</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="right-side-box">
                                <Link to={getCurrentMember() ? Routes.MEMBER_DEFAULT : Routes.MEMBER_LOGIN}
                                      className="header-one__btn">
                                    {getCurrentMember() ? 'Books' : 'Login'}
                                </Link>
                            </div>
                        </div>
                    </nav>
                </header>
                <section className="banner-one" id="home"
                         style={{ background: 'transparent url(images/banner/banner-bg-1-1.png) right top no-repeat' }}>
                    <img src={'images/banner/banner-icon-1-1.png'} alt="Awesome Image" className="bubble-1"/>
                    <img src={'images/banner/banner-icon-1-3.png'} alt="Awesome Image" className="bubble-2"/>
                    <img src={'images/banner/banner-icon-1-2.png'} alt="Awesome Image" className="bubble-3"/>
                    <img src={'images/banner/banner-icon-1-4.png'} alt="Awesome Image" className="bubble-4"/>
                    <img src={'images/banner/banner-icon-1-5.png'} alt="Awesome Image" className="bubble-5"/>
                    <img src={'images/banner/banner-icon-1-6.png'} alt="Awesome Image" className="bubble-6"/>
                    <img src={'images/banner/banner-moc-1.png'} className="banner-one__moc" alt="Awesome Image"/>
                    <div className="container page-wrapper__container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="banner-one__content">
                                    <div className="block-title">
                                        <div className="block-title__text">
                                            <span>Library management</span> <br/>
                                            <span>with <br/> Infyom Library management</span>
                                        </div>
                                    </div>
                                    <p className="banner-one__text">
                                        Excepteur sint occaecat cupidatat non proident sunt
                                        in <br/> culpa qui officia deserunt mollit lorem ipsum anim id est
                                        <br/> laborum perspiciatis unde. </p>
                                    <a href="#" onClick={(e) => e.preventDefault()} className="banner-one__btn">
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="service-one" id="services">
                    <div className="container">
                        <div className="block-title text-center">
                            <div className="block-title__text">Features</div>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <div className="service-one__single">
                                    <i className="fa fa-book" aria-hidden="true"/>
                                    <h3 className="service-one__title"><a href="#">Book Management</a></h3>
                                    <p className="service-one__text">
                                        Lorem ipsum is are many variations of pass of majority. </p>
                                    <a href="#" className="service-one__link">
                                        <i className="nonid-icon-left-arrow"/>
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <div className="service-one__single">
                                    <i className="fa fa-book" aria-hidden="true"/>
                                    <h3 className="service-one__title"><a href="#">User Management</a></h3>
                                    <p className="service-one__text">
                                        Lorem ipsum is are many variations of pass of majority. </p>
                                    <a href="#" className="service-one__link"><i className="nonid-icon-left-arrow"/></a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <div className="service-one__single">
                                    <i className="fa fa-book" aria-hidden="true"/>
                                    <h3 className="service-one__title"><a href="#">Genres Management</a></h3>
                                    <p className="service-one__text">
                                        Lorem ipsum is are many variations of pass of majority. </p>
                                    <a href="#" className="service-one__link"><i className="nonid-icon-left-arrow"/></a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <div className="service-one__single">
                                    <i className="service-one__icon nonid-icon-visualization"/>
                                    <h3 className="service-one__title"><a href="#">Content Marketing</a></h3>
                                    <p className="service-one__text">
                                        Lorem ipsum is are many variations of pass of majority. </p>
                                    <a href="#" className="service-one__link"><i className="nonid-icon-left-arrow"/></a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <div className="service-one__single">
                                    <i className="service-one__icon nonid-icon-laptop"/>
                                    <h3 className="service-one__title"><a href="#">Speed Optimization</a></h3>
                                    <p className="service-one__text">
                                        Lorem ipsum is are many variations of pass of majority. </p>
                                    <a href="#" className="service-one__link"><i className="nonid-icon-left-arrow"/></a>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <div className="service-one__single">
                                    <i className="service-one__icon nonid-icon-presentation"/>
                                    <h3 className="service-one__title"><a href="#">Marketing Analysis</a></h3>
                                    <p className="service-one__text">
                                        Lorem ipsum is are many variations of pass of majority. </p>
                                    <a href="#" className="service-one__link"><i className="nonid-icon-left-arrow"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="site-footer" id="newsletter">
                    <img src={'images/banner/banner-icon-1-1.png'} alt="Awesome Image" className="bubble-1"/>
                    <img src={'images/banner/banner-icon-1-3.png'} alt="Awesome Image" className="bubble-2"/>
                    <img src={'images/banner/banner-icon-1-2.png'} alt="Awesome Image" className="bubble-3"/>
                    <img src={'images/banner/banner-icon-1-4.png'} alt="Awesome Image" className="bubble-4"/>
                    <div className="site-footer__subscribe">
                        <div className="container">
                            <div className="block-title text-center">
                                <div className="block-title__text"><span>Subscribe our newsletter</span> <br/>
                                    <span>to get new updates</span></div>
                            </div>
                            <form action="#" className="site-footer__subscribe-form">
                                <input type="text" name="email" placeholder="Enter your email"/>
                                <button type="submit" onClick={(e) => e.preventDefault()}>Get Started</button>
                            </form>
                        </div>
                    </div>
                    <div className="site-footer__main-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 mb-3">
                                    <p>
                                        Made with <i className="fa fa-heart"/> by InfyOm Technologies </p>
                                    <p>
                                        We are a group of creative nerds making awesome stuff for Web &amp; Mobile. We
                                        just
                                        love to contribute to open source technologies. We always try to build something
                                        which helps developers to save their time. so they can spend a bit more time
                                        with
                                        their friends &amp; family. </p>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3 d-flex justify-content-md-end">
                                    <div className="footer-widget footer-widget--about-widget">
                                        <a href="index.html" className="footer-widget__footer-logo">
                                            <img src={appLogo} alt="Awesome Image" width="120"/>
                                        </a>
                                        <p className="d-flex">
                                            <i className="fa fa-phone mr-3" aria-hidden="true"/>
                                            +91 95102 15045 </p>
                                        <p className="d-flex">
                                            <a href="mailto:contact@infyom.com">
                                                <i className="fa fa-envelope mr-3" aria-hidden="true"/>contact@infyom.com
                                            </a>
                                        </p>
                                        <div className="d-flex">
                                            <div className="footer-widget">
                                                <div className="social-block">
                                                    <a href="https://twitter.com/infyom" target="_blank"
                                                       className="social-block__twitter">
                                                        <i className="fa fa-twitter"/>
                                                    </a>
                                                    <a href="https://www.facebook.com/infyom" target="_blank"
                                                       className="social-block__fb">
                                                        <i className="fa fa-facebook-f"/>
                                                    </a>
                                                    <a href="https://in.linkedin.com/company/infyom-technologies"
                                                       target="_blank" className="social-block__linkedin">
                                                        <i className="fa fa-linkedin"/>
                                                    </a>
                                                    <a href="https://github.com/InfyOmLabs" target="_blank"
                                                       className="social-block__github">
                                                        <i className="fa fa-github" aria-hidden="true"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="site-footer__bottom-footer text-center">
                        <div className="container">
                            <p>
                                &copy; Copyright 2019 by
                                <a href="https://www.infyom.com/" target="_blank"> InfyOm Technologies</a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
            <button id="scroll-btn" className="scroll-btn" onClick={() => scrollToTop()}>
                <i className="fa fa-angle-up"/>
            </button>
        </div>
    );
};
const mapStateToProps = (state) => {
    const { appSetting } = state;
    return { appSetting }
};

export default connect(mapStateToProps, { fetchAppSetting })(Lending);

