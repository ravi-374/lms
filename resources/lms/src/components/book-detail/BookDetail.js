import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import './BookDetail.scss';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {fetchBook} from '../../store/actions/bookAction';
import BookItemForm from './BookItemForm';
import {prepareAuthor, prepareBookLanguage, preparePublisher} from '../books/prepareArray';
import {toggleModal} from '../../store/actions/modalAction';
import EditBook from './EditBook';

const BookDetail = props => {
    const [isToggle, setIsToggle] = useState(false);
    useEffect(() => {
        props.fetchBook(+props.match.params.id);
        props.fetchBookLanguages();
        props.fetchPublishers();
    }, []);
    const {book, bookLanguages, publishers, toggleModal, history} = props;
    if (!book || !book.genres) {
        return null;
    }
    const onOpenModal = () => {
        setIsToggle(true);
        toggleModal();
    };
    const goBack = () => {
        history.push('/app/books');
    };
    const bookItemFormOptions = {bookItems: book.items, bookId: book.id, bookLanguages, publishers};
    const bookFormOptions = {book, toggleModal};
    const imageUrl = book.image ? 'uploads/books/' + book.image : 'images/book-avatar.png';
    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">Book Detail</h5>
                    <div className="d-flex">
                        <Button className="mr-2" color="primary" onClick={() => onOpenModal()}>Edit Book Detail</Button>
                        <Button onClick={() => goBack()}>Back</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row className="book-detail-row no-gutters">
                                    <div className="image-holder-wrapper">
                                        <div className="image-holder">
                                            <img src={imageUrl} height="400" width="400" alt={imageUrl}/>
                                        </div>
                                    </div>
                                    <div className="book-detail">
                                        <div className="book-detail__item-container">
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-heading">Title</span>
                                                <span>{book.name}</span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-heading">ISBN</span>
                                                <span>{book.isbn}</span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-heading">Genre(s)</span>
                                                <span>
                                                    {book.genres.map((({name}) => name)).join(',  ')}
                                                </span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-heading">Author(s)</span>
                                                <span>
                                                    {prepareAuthor(book.authors).map((({name}) => name)).join(',  ')}
                                                </span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-heading">Tag(s)</span>
                                                <span>
                                                    {book.tags.map((({name}) => name)).join(',  ')}
                                                </span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-heading">URL</span>
                                                <span>
                                                    {book.url ? book.url : 'N/A'}
                                                </span>
                                            </div>
                                            <div className="book-detail__item">
                                                <span className="book-detail__item-heading">Description</span>
                                                <span>
                                                    {book.description ? book.description : 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <Col xs={12}>
                                    <BookItemForm {...bookItemFormOptions}/>
                                </Col>
                                {isToggle ? <EditBook {...bookFormOptions}/> : null}
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state, ownProp) => {
    const {books, publishers, bookLanguages} = state;
    return {
        book: books[ownProp.match.params.id],
        bookLanguages: prepareBookLanguage(Object.values(bookLanguages)),
        publishers: preparePublisher(Object.values(publishers))
    }
};
export default connect(mapStateToProps, {
    fetchBook,
    fetchBookLanguages,
    fetchPublishers,
    toggleModal
})(BookDetail);
