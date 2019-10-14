import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Home.scss';
import {publicImagePath, publicImagePathURL} from "../../../appConstant";
import {appSettingsKey, Routes} from "../../../constants";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const Home = (props) => {
    const { appSetting, history } = props;
    const appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    const appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "js/home.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const goToHome = (event) => {
        event.preventDefault();
        history.push(Routes.MEMBER_HOME);
    };

    return (
        <>
            <header className="header position-fixed">
                <HeaderTitle title="Index"/>
                <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand d-flex align-items-center" href="#"
                           onClick={(e) => e.preventDefault()}>
                            <img src={appLogo} alt="logo" className="header__logo" />
                            <span className="pl-3">{appName}</span>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto text-uppercase">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={(e) => goToHome(e)}>Home<span
                                        className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>Team</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>Event</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="landing position-relative">
                <div className="position-absolute landing__slider">
                    <div className="landing__owl-slider owl-carousel owl-theme">
                        <div className="item">
                            <img src="img/slide1.jpg" alt="slide one" className="img-fluid landing__slider-img"/>
                        </div>
                        <div className="item">
                            <img src="img/slide2.jpg" alt="slide two" className="img-fluid landing__slider-img"/>
                        </div>
                        <div className="item">
                            <img src="img/slide3.jpg" alt="slide three" className="img-fluid landing__slider-img"/>
                        </div>
                        <div className="item">
                            <img src="img/slide-4.jpg" alt="slide three" className="img-fluid landing__slider-img"/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="landing__text-block">
                        <h1 className="landing__text-block-title">
                            More Than 458,948 Book Over Here </h1>
                        <p className="landing__text-block-desc text-description--landing">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida, quam vitae
                            est Sed non eros elementum nulla sodales ullamcorper. </p>
                        <div className="landing-search-box mt-5">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#book" role="tab"
                                       aria-controls="book" aria-selected="true" id="book-tab">Book</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#author" role="tab"
                                       aria-controls="author" aria-selected="false" id="author-tab">Author</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#publisher" role="tab"
                                       aria-selected="false" id="publisher-tab">Publisher</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="book" className="tab-pane fade show active" role="tabpanel"
                                     aria-labelledby="book-tab">
                                    <div className="d-flex align-items-center">
                                        <input type="text" placeholder="Enter book name"/>
                                        <span
                                            className="landing-search-box__search-icon d-flex justify-content-center align-items-center">
                                <i className="fas fa-search"/>
                            </span>
                                    </div>
                                </div>
                                <div id="author" className="tab-pane fade" role="tabpanel" aria-labelledby="author-tab">
                                    <div className="d-flex align-items-center">
                                        <input type="text" placeholder="Enter author name"/>
                                        <span
                                            className="landing-search-box__search-icon d-flex justify-content-center align-items-center">
                                <i className="fas fa-search"/>
                            </span>
                                    </div>
                                </div>
                                <div id="publisher" className="tab-pane fade" role="tabpanel"
                                     aria-labelledby="publisher-tab">
                                    <div className="d-flex align-items-center">
                                        <input type="text" placeholder="Enter publisher name"/>
                                        <span
                                            className="landing-search-box__search-icon d-flex justify-content-center align-items-center">
                                <i className="fas fa-search"/>
                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-us section-spacing--top section-spacing--bottom">
                <div className="container">
                    <h3 className="text-center">About Us</h3>
                    <p className="text-center text-description w-75 mx-auto section-header-row-spacing">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Ut gravida, quam
                        vitae est Sed non eros elementum nulla
                        sodales ullamcorper.</p>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                            <div className="about-us__box mb-4">
                                <i className="fas fa-book"/>
                                <h4 className="mt-4">Member Card</h4>
                                <p>Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros pellentesque</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                            <div className="about-us__box mb-4">
                                <i className="fas fa-book"/>
                                <h4 className="mt-4">High Quality Books</h4>
                                <p>Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros pellentesque</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                            <div className="about-us__box mb-4">
                                <i className="fas fa-book"/>
                                <h4 className="mt-4">Free All Books</h4>
                                <p>Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros pellentesque</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                            <div className="about-us__box mb-4">
                                <i className="fas fa-book"/>
                                <h4 className="mt-4">Up To Date Books</h4>
                                <p>Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros pellentesque</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                            <div className="about-us__box mb-4">
                                <i className="fas fa-book"/>
                                <h4 className="mt-4">High Quality Books</h4>
                                <p>Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros pellentesque</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                            <div className="about-us__box mb-4">
                                <i className="fas fa-book"/>
                                <h4 className="mt-4">Free All Books</h4>
                                <p>Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros pellentesque</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="category section-spacing--top section-spacing--bottom">
                <div className="container">
                    <h3 className="text-center">Our Category</h3>
                    <p className="text-center text-description text-description--white-section w-75 mx-auto section-header-row-spacing">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Ut gravida, quam
                        vitae est Sed non eros elementum nulla
                        sodales ullamcorper.</p>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3 category__box-col">
                            <div className="category__box">
                                <div className="category__box-icon-wrapper position-relative">
                                    <div className="category__box-icon position-absolute">
                                        <i className="fas fa-book"/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="text-center category__box-title">Music and Art</div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 category__box-col">
                            <div className="category__box">
                                <div className="category__box-icon-wrapper position-relative">
                                    <div className="category__box-icon position-absolute">
                                        <i className="fas fa-book"/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="text-center category__box-title">Music and Art</div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 category__box-col">
                            <div className="category__box">
                                <div className="category__box-icon-wrapper position-relative">
                                    <div className="category__box-icon position-absolute">
                                        <i className="fas fa-book"/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="text-center category__box-title">Music and Art</div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 category__box-col">
                            <div className="category__box">
                                <div className="category__box-icon-wrapper position-relative">
                                    <div className="category__box-icon position-absolute">
                                        <i className="fas fa-book"/>
                                    </div>
                                </div>
                                <hr/>
                                <div className="text-center category__box-title">Music and Art</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="popular-book section-spacing--top section-spacing--bottom position-relative">
                <div className="popular-book__bg"/>
                <div className="container-fluid popular-book__container">
                    <h3 className="text-center">Popular Books</h3>
                    <p className="section-header-row-spacing text-center w-75 ml-auto mr-auto">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Ut gravida, quam
                        vitae est Sed non eros elementum nulla sodales ullamcorper.</p>
                    <div className="popular-book__book-item-slider-wrapper">
                        <div className="popular-book__book-item-slider owl-carousel owl-theme">
                            <div className="item">
                                <img src="img/book/book1.jpg" alt="book one"/>
                            </div>
                            <div className="item">
                                <img src="img/book/book2.jpg" alt="book two"/>
                            </div>
                            <div className="item">
                                <img src="img/book/book3.jpg" alt="book three"/>
                            </div>
                            <div className="item">
                                <img src="img/book/book1.jpg" alt="book one"/>
                            </div>
                            <div className="item">
                                <img src="img/book/book2.jpg" alt="book two"/>
                            </div>
                            <div className="item">
                                <img src="img/book/book3.jpg" alt="book three"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="meet-out-staff section-spacing--top section-spacing--bottom">
                <div className="container">
                    <h3 className="text-center">Meet Our Staff</h3>
                    <p className="section-header-row-spacing text-description text-center w-75 ml-auto mr-auto">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Ut gravida, quam
                        vitae est Sed non eros elementum nulla sodales ullamcorper.</p>
                    <div className="row">
                        <div className="meet-out-staff__slider owl-carousel owl-theme">
                            <div className="item">
                                <div className="card meet-out-staff__card p-3">
                                    <img src="img/staff/team-3.jpg" alt=""/>
                                    <hr/>
                                    <h5 className="text-center">John Doe</h5>
                                    <p className="text-center text-muted">Designer</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="card meet-out-staff__card p-3">
                                    <img src="img/staff/team-3.jpg" alt=""/>
                                    <hr/>
                                    <h5 className="text-center">John Doe</h5>
                                    <p className="text-center text-muted">Designer</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="card meet-out-staff__card p-3">
                                    <img src="img/staff/team-3.jpg" alt=""/>
                                    <hr/>
                                    <h5 className="text-center">John Doe</h5>
                                    <p className="text-center text-muted">Designer</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="card meet-out-staff__card p-3">
                                    <img src="img/staff/team-3.jpg" alt=""/>
                                    <hr/>
                                    <h5 className="text-center">John Doe</h5>
                                    <p className="text-center text-muted">Designer</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="card meet-out-staff__card p-3">
                                    <img src="img/staff/team-3.jpg" alt=""/>
                                    <hr/>
                                    <h5 className="text-center">John Doe</h5>
                                    <p className="text-center text-muted">Designer</p>
                                </div>
                            </div>
                            <div className="item">
                                <div className="card meet-out-staff__card p-3">
                                    <img src="img/staff/team-3.jpg" alt=""/>
                                    <hr/>
                                    <h5 className="text-center">John Doe</h5>
                                    <p className="text-center text-muted">Designer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="what-people-say position-relative">
                <div className="what-people-say__bg position-absolute">
                    <img src="img/user/user-slider-bg.jpg" alt="what people say" className="img-fluid"/>
                </div>
                <div className="what-people-say__content section-spacing--top section-spacing--bottom">
                    <div className="container">
                        <h3 className="text-center">What People Say</h3>
                        <p className="text-center text-description--landing w-75 mx-auto section-header-row-spacing">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Ut gravida, quam
                            vitae est Sed non eros elementum nulla
                            sodales ullamcorper.</p>
                        <div className="what-people-say__owl-slider owl-carousel owl-theme">
                            <div className="item">
                                <div className="what-people-say__slider-section text-center mx-auto">
                                    <div className="mt-3">
                                        <h6 className="text-uppercase">John doe</h6>
                                        <h6>student</h6>
                                        <p className="mt-3">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta earum eligendi error
                                            ex
                                            exercitationem expedita inventore laudantium maxime minus nisi odit perspiciatis
                                            praesentium,
                                            repellendus sint unde velit vero voluptates? </p>
                                        <div className="what-people-say__slider-avatar">
                                            <img src="img/user/client2.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="what-people-say__slider-section text-center mx-auto">
                                    <div className="mt-3">
                                        <h6 className="text-uppercase">John doe</h6>
                                        <h6>student</h6>
                                        <p className="mt-3">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta earum eligendi error
                                            ex
                                            exercitationem expedita inventore laudantium maxime minus nisi odit perspiciatis
                                            praesentium,
                                            repellendus sint unde velit vero voluptates? </p>
                                        <div className="what-people-say__slider-avatar">
                                            <img src="img/user/client2.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="what-people-say__slider-section text-center mx-auto">
                                    <div className="mt-3">
                                        <h6 className="text-uppercase">John doe</h6>
                                        <h6>student</h6>
                                        <p className="mt-3">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta earum eligendi error
                                            ex
                                            exercitationem expedita inventore laudantium maxime minus nisi odit perspiciatis
                                            praesentium,
                                            repellendus sint unde velit vero voluptates? </p>
                                        <div className="what-people-say__slider-avatar">
                                            <img src="img/user/client2.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="what-people-say__slider-section text-center mx-auto">
                                    <div className="mt-3">
                                        <h6 className="text-uppercase">John doe</h6>
                                        <h6>student</h6>
                                        <p className="mt-3">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta earum eligendi error
                                            ex
                                            exercitationem expedita inventore laudantium maxime minus nisi odit perspiciatis
                                            praesentium,
                                            repellendus sint unde velit vero voluptates? </p>
                                        <div className="what-people-say__slider-avatar">
                                            <img src="img/user/client2.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer section-spacing--bottom section-spacing--top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <a href="#"><img src={appLogo} alt="library" height="50"/></a>
                            <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida, quam vitae est Sed non eros elementum nulla sodales ullamcorper.</p>
                            <div className="space-10"/>
                            <ul className="list-inline list-unstyled social-list">
                                <li className="list-inline-item"><a href="#"><i className="fab fa-facebook-f"
                                                                                aria-hidden="true"/> </a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-twitter"
                                                                                aria-hidden="true"/></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-linkedin-in"
                                                                                aria-hidden="true"/></a></li>
                                <li className="list-inline-item"><a href="#"><i className="fab fa-github"/></a></li>
                            </ul>
                            <ul className="list-inline tip yellow">
                                <li><i className="icofont icofont-square"/></li>
                                <li><i className="icofont icofont-square"/></li>
                                <li><i className="icofont icofont-square"/></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-3 ml-auto">
                            <h4>Contact Us</h4>
                            <table className="table borderless addr-dt">
                                <tbody>
                                <tr>
                                    <td><i className="fas fa-map-marker-alt"/></td>
                                    <td>
                                        <address className="mb-0">InfyOm Technologies</address>
                                    </td>
                                </tr>
                                <tr>
                                    <td><i className="far fa-envelope"/></td>
                                    <td>contact@infyom.in</td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-phone-alt"/></td>
                                    <td>+91 70963 36561</td>
                                </tr>
                                <tr>
                                    <td><i className="fas fa-globe-africa"/></td>
                                    <td><a href="http://www.infyom.com/" target="_blank">www.infyom.com</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 col-md-3 ml-auto">
                            <h4 className="">Useful Link</h4>
                            <div className="space-20"/>
                            <ul className="list-unstyled menu-tip">
                                <li><a href="books.html">Costumer Service</a></li>
                                <li><a href="books.html">Help Desk</a></li>
                                <li><a href="books.html">Forum</a></li>
                                <li><a href="books.html">Staff Profile</a></li>
                                <li><a href="books.html">Live Chat</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

Home.propTypes = {
    appSetting: PropTypes.object,
    history: PropTypes.object,
};

const mapStateToProps = (state) => {
    const { appSetting } = state;
    return { appSetting }
};

export default connect(mapStateToProps, {})(Home);

