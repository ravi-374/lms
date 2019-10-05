import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './BookAllotmentDetails.scss';
import BookAllotmentDetailsModal from './BookAllotmentDetailsModal';
import {bookFormatOptions} from '../../constants';
import {Routes} from "../../../constants";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import {dateFormatter, getFormattedMessage, getFormattedOptions} from '../../../shared/sharedMethod';
import BookStatus from "../../../shared/book-status/book-status";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {fetchBookAllotment} from '../../store/actions/bookAllotmentAction';
import {toggleModal} from '../../../store/action/modalAction';

const BookAllotmentDetail = props => {
    const { bookHistory, fetchBookAllotment, toggleModal, history, match } = props;
    const [isToggle, setIsToggle] = useState(false);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);

    useEffect(() => {
        fetchBookAllotment(+match.params.id);
    }, []);

    if (!bookHistory) {
        return <ProgressBar/>;
    }

    const onOpenModal = () => {
        setIsToggle(true);
        toggleModal();
    };

    const goBack = () => {
        history.goBack();
    };

    const renderBookStatus = (bookHistory) => {
        const statusProps = { status: bookHistory.status, item: bookHistory };
        return <BookStatus {...statusProps} item={bookHistory}/>
    };

    const cardModalProps = { isToggle, toggleModal, bookHistory };
    const { book_item } = bookHistory;
    const { book } = book_item;
    const bookItemFormat = booksFormatOptions.find(bookFormat => bookFormat.id === +book_item.format);

    return (
        <div className="animated fadeIn">
            <HeaderTitle title="Book Allotment Details"/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading"> {getFormattedMessage('books-allotment.edit-book-allotment-details.title')}</h5>
                    <div className="d-flex">
                        <Button className="mr-2" color="primary" onClick={() => onOpenModal()}>
                            {getFormattedMessage('books-allotment.modal.edit.title')}
                        </Button>
                        <Button onClick={() => goBack()}>{getFormattedMessage('global.input.back-btn.label')}</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row className="no-gutters">
                                    <div className="book-history-detail">
                                        <div className="book-history-detail__item-container">
                                            <div className="book-history-detail__item-name">
                                                <span className="book-history-detail__item-name-heading">
                                                    {getFormattedMessage('books-allotment.select.book.label')}
                                                </span>
                                                <span>
                                                    <Link to={`${Routes.BOOKS + book.id}/details`}>{book.name}</Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="book-history-detail__item-container">
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">
                                                    {getFormattedMessage('books.items.input.book-code.label')}
                                                </span>
                                                <span>
                                                    {book_item.book_code}
                                                </span>
                                            </div>
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">
                                                    {getFormattedMessage('books-allotment.select.member.label')}
                                                </span>
                                                <span>
                                                      <Link to={`${Routes.MEMBERS + bookHistory.member_id}/details`}>
                                                          {bookHistory.member.first_name + ' ' + bookHistory.member.last_name}
                                                      </Link>
                                                </span>
                                            </div>
                                            {book_item.language ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {getFormattedMessage('books.items.select.language.label')}
                                                    </span>
                                                    <span>{book_item.language.language_name}</span>
                                                </div> : null
                                            }
                                            {book_item.publisher ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {getFormattedMessage('books.items.select.publisher.label')}
                                                    </span>
                                                    <span>{book_item.publisher.name}</span>
                                                </div> : null
                                            }
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">
                                                    {getFormattedMessage('books.items.select.format.label')}
                                                </span>
                                                <span>
                                                    {bookItemFormat ? bookItemFormat.name : null}
                                                </span>
                                            </div>
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">
                                                    {getFormattedMessage('books.items.input.edition.label')}
                                                </span>
                                                <span>
                                                    {book_item.edition}
                                                </span>
                                            </div>
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">
                                                    {getFormattedMessage('books-allotment.select.status.label')}
                                                </span>
                                                <span> {renderBookStatus(bookHistory)}</span>
                                            </div>
                                            {bookHistory.issuer_name ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {getFormattedMessage('books-allotment.table.issuer.column')}
                                                    </span>
                                                    <span>
                                                         <Link to={`${Routes.USERS + bookHistory.issuer_id}/details`}>
                                                          {bookHistory.issuer_name}
                                                         </Link>
                                                    </span>
                                                </div> : null
                                            }
                                            {bookHistory.returner_name ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {getFormattedMessage('books-allotment.table.returner.column')}
                                                    </span>
                                                    <span>
                                                         <Link to={`${Routes.USERS + bookHistory.returner_id}/details`}>
                                                          {bookHistory.returner_name}
                                                         </Link>
                                                    </span>
                                                </div> : null
                                            }
                                            {bookHistory.issued_on ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {getFormattedMessage('books-allotment.table.issue-date.column')}
                                                    </span>
                                                    <span>{dateFormatter(bookHistory.issued_on)}</span>
                                                </div> : null
                                            }
                                            {bookHistory.issue_due_date ?
                                                <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">
                                                    {getFormattedMessage('books-allotment.table.issue-due-date.column')}
                                                </span>
                                                    <span>{dateFormatter(bookHistory.issue_due_date)}</span>
                                                </div> : null
                                            }
                                            {bookHistory.return_date ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                       {getFormattedMessage('books-allotment.table.return-date.column')}
                                                    </span>
                                                    <span>
                                                        {dateFormatter(bookHistory.return_date)}
                                                    </span>
                                                </div> : null
                                            }
                                            {bookHistory.return_due_date ?
                                                <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">
                                                    {getFormattedMessage('books-allotment.table.return-due-date.column')}
                                                </span>
                                                    <span>{dateFormatter(bookHistory.return_due_date)}</span>
                                                </div> : null
                                            }
                                            {bookHistory.note ?
                                                <div className="book-history-detail__item-note">
                                                    <span className="book-history-detail__item-heading">
                                                        {getFormattedMessage('books-allotment.input.note.label')}
                                                    </span>
                                                    <span>{bookHistory.note}</span>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                </Row>
                                <BookAllotmentDetailsModal {...cardModalProps}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

BookAllotmentDetail.propTypes = {
    bookHistory: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    fetchBookAllotment: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state, ownProp) => {
    const { booksAllotment } = state;
    return {
        bookHistory: booksAllotment.find(bookAllotment => bookAllotment.id === +ownProp.match.params.id)
    }
};
export default connect(mapStateToProps, { fetchBookAllotment, toggleModal })(BookAllotmentDetail);
