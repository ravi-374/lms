import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Home.scss';
import {publicImagePath, publicImagePathURL} from "../../../appConstant";
import {appSettingsKey, Routes} from "../../../constants";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getCurrentMember} from "../../../admin/shared/sharedMethod";
import {fetchBooksByNameOrAuthors, fetchFeaturedBooks} from "../../store/actions/bookAction";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const genres = ['Business', 'Science', 'Sports', 'Politics'];

const Home = (props) => {
    const {appSetting, books, searchBooks, totalRecord, history, fetchFeaturedBooks, fetchBooksByNameOrAuthors, isLoading} = props;
    const [search, setSearch] = useState(null);
    const [searchBy, setSearchBy] = useState('book');
    const appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    const appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;

    useEffect(() => {
        fetchFeaturedBooks();
        const script = document.createElement("script");
        script.src = "js/home.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    /**
     * Search books
     * @param searchBy
     * @param page
     */
    const onSearch = (searchBy = 'book', page = 0) => {
        setSearchBy(searchBy);
        let skip = 0;
        if (page > 0) {
            skip = 4 * page;
        }
        let param = '?search=' + search + '&limit=4&by_books=1&skip=' + skip;
        if (searchBy === 'book') {
            param = '?search=' + search + '&limit=4&by_authors=1&skip=' + skip;
        }
        fetchBooksByNameOrAuthors(param);
    };

    /**
     * Render a page
     * @returns {*}
     */
    const renderPageNumber = () => {
        const page = totalRecord / 4;
        for (let i = 1; i <= page; i++) {
            return (
                <li className="page-item"><a className="page-link" href="#">{i}</a></li>
            )
        }
    };
    /**
     *  render pagination
     * @returns {string|*}
     */
    const renderPagination = () => {
        if (!totalRecord || totalRecord < 5) {
            return '';
        }

        return (
            <div className="row justify-content-center no-gutters">
                <nav aria-label="Page navigation">
                    <ul className="pagination mb-0 mt-3">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        {
                            renderPageNumber()
                        }
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        );
    };

    // set search value while search
    const onChangeInput = (event) => {
        setSearch(event.target.value);
    };

    // featured books slider options
    const bookSliderOption = {
        items: 6,
        nav: true,
        rewind: true,
        autoplay: true,
        margin: 10,
        loop: true,
        responsive: false
    };

    /**
     *  Render Featured Books
     * @returns {*}
     */
    const renderFeaturedBooks = () => {
        return (
            <OwlCarousel className="owl-theme" {...bookSliderOption}>
                {books.map((item, i) => {
                    return (
                        <div className="item" key={i}>
                            <div className="popular-book__item-box">
                                <img alt={item.image_path}
                                     src={item.image_path ? item.image_path : publicImagePath.BOOK_AVATAR}/>
                                <span className={'book-name'}>{item.name}</span>
                            </div>
                        </div>
                    )
                })}
            </OwlCarousel>
        );
    };

    /**
     * Render a Genres
     * @returns {*}
     */
    const renderGenres = () => {
        return (
            <section className="category section-spacing--top section-spacing--bottom">
                <div className="container">
                    <h3 className="text-center">Our Genres</h3>
                    <p className="text-center text-description text-description--white-section w-75 mx-auto section-header-row-spacing">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida, quam vitae est Sed non eros
                        elementum nulla sodales ullamcorper.
                    </p>
                    <div className="row">
                        {
                            genres.map((genre) => {
                                return (
                                    <div className="col-12 col-sm-6 col-lg-3 category__box-col">
                                        <div className="category__box">
                                            <div className="category__box-icon-wrapper position-relative">
                                                <div className="category__box-icon position-absolute">
                                                    <i className="fas fa-book"/>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="text-center category__box-title">{genre}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        );
    };

    /**
     * Render Popular Books Section
     * @returns {string|*}
     */
    const renderPopularSection = () => {
        if (books.length < 1) {
            return '';
        }
        return (
            <section className="popular-book section-spacing--top section-spacing--bottom position-relative">
                <div className="popular-book__bg"/>
                <div className="container-fluid popular-book__container">
                    <h3 className="text-center">Popular Books</h3>
                    <p className="section-header-row-spacing text-center w-75 ml-auto mr-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida, quam vitae est Sed non eros
                        elementum nulla sodales ullamcorper.
                    </p>
                    <div className="popular-book__book-item-slider-wrapper">
                        {renderFeaturedBooks()}
                    </div>
                </div>
            </section>
        );
    };

    /**
     * Render Book Card
     * @param book
     * @returns {*}
     */
    const renderBook = (book) => {
        return (
            <div className="card book-search-card">
                <div className="row no-gutters">
                    <div className="book-search-card__col-left">
                        <img alt={book.image_path} src={book.image_path ? book.image_path : publicImagePath.BOOK_AVATAR}
                             className="card-img"/>
                    </div>
                    <div className="book-search-card__col-right">
                        <div className="card-body">
                            <h5 className="card-title">{book.name}</h5>
                            <p className="card-text text-muted">By Mako Sheffield</p>
                            <p className="card-text">
                                {book.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Render searched books
     * @returns {string|*}
     */
    const renderSearchedBooks = () => {
        if (search === '' || searchBooks.length < 1) {
            return '';
        }

        if (search !== '' || searchBooks.length < 1) {
            return (
                <section className="book-search section-spacing--top section-spacing--bottom">
                    <div className="container">
                        No Books Found.
                    </div>
                </section>
            );
        }

        return (
            <section className="book-search section-spacing--top section-spacing--bottom">
                <div className="container">
                    <h2 className="book-search__result-heading text-description text-center">Result for</h2>
                    <h1 className="book-search__book-name text-center mb-5">"{search}"</h1>
                    <div className="row book-search-card-row">
                        {
                            searchBooks.map((item, i) => {
                                return (
                                    <div className="col-12 col-xl-6 book-search-card-container" key={i}>
                                        {renderBook(item)}
                                    </div>
                                )
                            })
                        }
                    </div>
                    {renderPagination()}
                </div>
            </section>
        );
    };

    return (
        <React.Fragment>
            <div className="animated fadeIn">
                <header className="header position-fixed">
                    <HeaderTitle title="Landing"/>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg">
                            <a className="navbar-brand d-flex align-items-center" href="#"
                               onClick={(e) => e.preventDefault()}>
                                <img src={appLogo} alt="logo" className="header__logo"/>
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
                                        <Link to={getCurrentMember() ? Routes.MEMBER_DEFAULT : Routes.MEMBER_LOGIN}
                                              className="nav-link">
                                            {getCurrentMember() ? 'Books' : 'Login'}
                                        </Link>
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
                                <img src="img/landing_slider-1.jpg" alt="slide one"
                                     className="img-fluid landing__slider-img"/>
                            </div>
                            <div className="item">
                                <img src="img/landing_slider-2.jpg" alt="slide two"
                                     className="img-fluid landing__slider-img"/>
                            </div>
                            <div className="item">
                                <img src="img/landing_slider-3.jpg" alt="slide three"
                                     className="img-fluid landing__slider-img"/>
                            </div>
                            <div className="item">
                                <img src="img/landing_slider-4.jpg" alt="slide three"
                                     className="img-fluid landing__slider-img"/>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="landing__text-block">
                            <h1 className="landing__text-block-title">
                                More Than 458,948 Book Over Here
                            </h1>
                            <p className="landing__text-block-desc text-description--landing">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida, quam vitae
                                est Sed non eros elementum nulla sodales ullamcorper.
                            </p>
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
                                </ul>
                                <div className="tab-content">
                                    <div id="book" className="tab-pane fade show active" role="tabpanel"
                                         aria-labelledby="book-tab">
                                        <div className="d-flex align-items-center">
                                            <input type="text" placeholder="Enter book name"
                                                   onChange={(e) => onChangeInput(e)}/>
                                            <span
                                                className="landing-search-box__search-icon d-flex justify-content-center align-items-center"
                                                onClick={() => onSearch()}>
                                            <i className="fas fa-search"/>
                                            </span>
                                        </div>
                                    </div>
                                    <div id="author" className="tab-pane fade" role="tabpanel"
                                         aria-labelledby="author-tab">
                                        <div className="d-flex align-items-center">
                                            <input type="text" placeholder="Enter author name"
                                                   onChange={(e) => onChangeInput(e)}/>
                                            <span
                                                className="landing-search-box__search-icon d-flex justify-content-center align-items-center"
                                                onClick={() => onSearch('author')}>
                                            <i className="fas fa-search"/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {renderSearchedBooks()}
                <section className="about-us section-spacing--top section-spacing--bottom">
                    <div className="container">
                        <h3 className="text-center">About Us</h3>
                        <p className="text-center text-description w-75 mx-auto section-header-row-spacing">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida, quam
                            vitae est Sed non eros elementum nulla sodales ullamcorper.
                        </p>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                                <div className="about-us__box mb-4">
                                    <i className="fas fa-book"/>
                                    <h4 className="mt-4">Member Card</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros
                                        pellentesque
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                                <div className="about-us__box mb-4">
                                    <i className="fas fa-book"/>
                                    <h4 className="mt-4">High Quality Books</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros
                                        pellentesque
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                                <div className="about-us__box mb-4">
                                    <i className="fas fa-book"/>
                                    <h4 className="mt-4">Free All Books</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros
                                        pellentesque
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                                <div className="about-us__box mb-4">
                                    <i className="fas fa-book"/>
                                    <h4 className="mt-4">Up To Date Books</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros
                                        pellentesque
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                                <div className="about-us__box mb-4">
                                    <i className="fas fa-book"/>
                                    <h4 className="mt-4">High Quality Books</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros
                                        pellentesque
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4 about-us__box-col">
                                <div className="about-us__box mb-4">
                                    <i className="fas fa-book"/>
                                    <h4 className="mt-4">Free All Books</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consecte tur adipiscing elit. Nullam ultricies eros
                                        pellentesque
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {renderGenres()}
                {renderPopularSection()}
                <section className="meet-out-staff section-spacing--top section-spacing--bottom">
                    <div className="container">
                        <h3 className="text-center">Meet Our Staff</h3>
                        <p className="section-header-row-spacing text-description text-center w-75 ml-auto mr-auto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida, quam
                            vitae est Sed non eros elementum nulla sodales ullamcorper.
                        </p>
                        <div className="row">
                            <div className="meet-out-staff__slider owl-carousel owl-theme">
                                <div className="item">
                                    <div className="card meet-out-staff__card p-3">
                                        <img src="img/staff/staff-member-place-holder.jpg" alt=""/>
                                        <hr/>
                                        <h5 className="text-center">John Doe</h5>
                                        <p className="text-center text-muted">Designer</p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="card meet-out-staff__card p-3">
                                        <img src="img/staff/staff-member-place-holder.jpg" alt=""/>
                                        <hr/>
                                        <h5 className="text-center">John Doe</h5>
                                        <p className="text-center text-muted">Designer</p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="card meet-out-staff__card p-3">
                                        <img src="img/staff/staff-member-place-holder.jpg" alt=""/>
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
                            <p className="text-center text-description--landing w-75 mx-auto section-header-row-spacing">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida, quam
                                vitae est Sed non eros elementum nulla sodales ullamcorper.
                            </p>
                            <div className="what-people-say__owl-slider owl-carousel owl-theme">
                                <div className="item">
                                    <div className="what-people-say__slider-section text-center mx-auto">
                                        <div className="mt-3">
                                            <h6 className="text-uppercase">John doe</h6>
                                            <h6>student</h6>
                                            <p className="mt-3">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta
                                                earum eligendi error ex exercitationem expedita inventore laudantium
                                                maxime minus nisi odit perspiciatis praesentium, repellendus sint unde
                                                velit vero voluptates?
                                            </p>
                                            <div className="what-people-say__slider-avatar">
                                                <img src="img/user/avatar-1.png" alt=""/>
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
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta
                                                earum eligendi error ex exercitationem expedita inventore laudantium
                                                maxime minus nisi odit perspiciatis praesentium, repellendus sint unde
                                                velit vero voluptates?
                                            </p>
                                            <div className="what-people-say__slider-avatar">
                                                <img src="img/user/avatar-2.png" alt=""/>
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
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta
                                                earum eligendi error ex exercitationem expedita inventore laudantium
                                                maxime minus nisi odit perspiciatis praesentium, repellendus sint unde
                                                velit vero voluptates?
                                            </p>
                                            <div className="what-people-say__slider-avatar">
                                                <img src="img/user/avatar-3.png" alt=""/>
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
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta
                                                earum eligendi error ex exercitationem expedita inventore laudantium
                                                maxime minus nisi odit perspiciatis praesentium, repellendus sint unde
                                                velit vero voluptates?
                                            </p>
                                            <div className="what-people-say__slider-avatar">
                                                <img src="img/user/avatar-4.png" alt=""/>
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
                                <p className="mt-3">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida,
                                    quam vitae est Sed non eros elementum nulla sodales ullamcorper.
                                </p>
                                <div className="space-10"/>
                                <ul className="list-inline list-unstyled social-list">
                                    <li className="list-inline-item">
                                        <a href="#"><i className="fab fa-facebook-f" aria-hidden="true"/></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="fab fa-twitter" aria-hidden="true"/></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="fab fa-linkedin-in" aria-hidden="true"/></a>
                                    </li>
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
                                        <td><i className="fas fa-phone"/></td>
                                        <td>+91 70963 36561</td>
                                    </tr>
                                    <tr>
                                        <td><i className="fas fa-globe-africa"/></td>
                                        <td><a href="http://www.infyom.com/" target="_blank">www.infyom.com</a></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <div className="modal book-detail-modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">The Art Of The Surf</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-column flex-lg-row">
                                <div className="book-detail-modal__media">
                                    <img src="img/book-detail-placeholder.png" className="card-img" alt="book name"/>
                                </div>
                                <div className="pl-0 pl-lg-5">
                                    <div className="d-flex mb-2">
                                        <div className="book-detail-modal__detail-title">Description</div>
                                        <div className="text-description">Lorem ipsum dolor sit amet, consectetur
                                            adipisicing elit. Aperiam beatae consectetur culpa enim ex id inventore
                                            libero minima molestias mollitia necessitatibus, obcaecati odit omnis quo,
                                            repellat sit totam vel veniam.
                                        </div>
                                    </div>
                                    <div className="d-flex mb-2">
                                        <div className="book-detail-modal__detail-title">Author</div>
                                        <div className="text-description">John Doe</div>
                                    </div>
                                    <div className="d-flex mb-2">
                                        <div className="book-detail-modal__detail-title">Genres</div>
                                        <div className="text-description">John Doe</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

Home.propTypes = {
    appSetting: PropTypes.object,
    books: PropTypes.object,
    searchBooks: PropTypes.object,
    history: PropTypes.object,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.boolean,
    fetchFeaturedBooks: PropTypes.func,
};

const mapStateToProps = (state) => {
    const {appSetting, books, searchBooks, totalRecord, isLoading} = state;
    return {appSetting, books, searchBooks, totalRecord, isLoading}
};

export default connect(mapStateToProps, {fetchFeaturedBooks, fetchBooksByNameOrAuthors})(Home);

