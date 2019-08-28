import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import './BookDetails.scss';
import EditBook from './EditBook';
import {fetchBook} from '../../store/actions/bookAction';
import BookItems from '../book-items/BookItems';

import {toggleModal} from '../../../store/action/modalAction';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import {prepareFullNames} from "../../../shared/sharedMethod";

const BookDetail = props => {
    const { book, toggleModal, history, fetchBook } = props;
    const [isToggle, setIsToggle] = useState(false);
    const [isParentToggle, setIsParentToggle] = useState(false);
    useEffect(() => {
        fetchBook(+props.match.params.id);
    }, []);
    if (!book || !book.genres) {
        return null;
    }
    const onOpenModal = () => {
        setIsToggle(true);
        setIsParentToggle(true);
        toggleModal();
    };
    const goBack = () => {
        history.goBack();
    };
    const bookFormOptions = { book, toggleModal };
    const bookItemFormOptions = {
        bookItemList: book.items,
        bookId: book.id,
        goBack,
        isParentToggle,
        setIsParentToggle,
    };

    const imageUrl = book.image ? publicImagePathURL.BOOK_AVATAR_URL + book.image : publicImagePath.BOOK_AVATAR;
    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle title={'Book-Details | LMS System'}/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading">{book.name}</h5>
                    <div className="d-flex">
                        <Button className="mr-2" color="primary" onClick={() => onOpenModal()}>
                            Edit Book Details
                        </Button>
                        <Button onClick={() => goBack()}>Back</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row className="book-detail-row no-gutters">
                                    <div className="book-image-container">
                                        <div className="book-image-holder">
                                            <img src={imageUrl} height="250" alt={imageUrl}/>
                                        </div>
                                    </div>
                                    <div className="book-detail">
                                        <div className="book-detail__item-container">
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-isbn-heading">ISBN</span>
                                                <span>{book.isbn}</span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-genre-heading">Genre(s)</span>
                                                <span>
                                                    {book.genres.map((({ name }) => name)).join(',  ')}
                                                </span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-authors-heading">Author(s)</span>
                                                <span>
                                                    {prepareFullNames(book.authors).map((({ name }) => name)).join(',  ')}
                                                </span>
                                            </div>
                                            {book.tags.length > 0 ?
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-tags-heading">Tag(s)</span>
                                                    <span>
                                                    {book.tags.map((({ name }) => name)).join(',  ')}
                                                </span>
                                                </div> : null
                                            }
                                            {book.url ?
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-url-heading">URL</span>
                                                    <span>
                                                       <a target="_blank" href={book.url}>
                                                            {book.url}
                                                        </a>
                                                     </span>
                                                </div> : null
                                            }
                                            {book.description ?
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-desc-heading">Description</span>
                                                    <span className="book-detail__item-desc-text">
                                                    {book.description}
                                                    </span>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                </Row>
                                <div className={book.description ? 'mt-3' : 'mt-5'}>
                                    <h5 className="mb-3">Book Items</h5>
                                    <BookItems {...bookItemFormOptions}/>
                                </div>
                                {isToggle && isParentToggle ? <EditBook {...bookFormOptions}/> : null}
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state, ownProp) => {
    const { books } = state;
    return {
        book: books.find(book => book.id === +ownProp.match.params.id),
    }
};
export default connect(mapStateToProps, {
    fetchBook,
    toggleModal,
})(BookDetail);
