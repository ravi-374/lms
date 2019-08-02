import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import './BookAllotmentDetails.scss';
import {fetchBookAllotment} from '../../store/actions/bookAllotmentAction';
import {fetchBooks} from '../../store/actions/bookAction';
import {fetchMembers} from '../../store/actions/memberAction';
import {toggleModal} from '../../../store/action/modalAction';
import BookHistoryModal from './BookAllotmentModal';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import {dateFormatter, prepareFullNames} from '../../../shared/sharedMethod';
import {bookFormatOptions} from '../../constants';
import {Routes} from "../../../constants";
import BookStatus from "../../../shared/book-status/book-status";

const BookAllotmentDetail = props => {
    const [isToggle, setIsToggle] = useState(false);
    useEffect(() => {
        props.fetchBookAllotment(+props.match.params.id);
        props.fetchBooks();
        props.fetchMembers();
    }, []);
    const { bookHistory, books, toggleModal, history, members, isLoading } = props;
    if (!bookHistory || !members || !books || isLoading || (books && books.length === 0)) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const onOpenModal = () => {
        setIsToggle(true);
        toggleModal();
    };
    const goBack = () => {
        history.push('/app/admin/books-allotment');
    };
    const renderBookStatus = (bookHistory) => {
        const statusProps = { status: bookHistory.status, item: bookHistory };
        return <BookStatus {...statusProps} item={bookHistory}/>
    };

    const cardModalProps = { isToggle, books, members, toggleModal, bookHistory };
    const member = members.find(member => member.id === +bookHistory.member_id);
    if (member) {
        bookHistory.member_name = member.name;
    }
    const { book_item } = bookHistory;
    const { book } = book_item;
    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading">Book Allotment Details</h5>
                    <div className="d-flex">
                        <Button className="mr-2" color="primary" onClick={() => onOpenModal()}>
                            Edit Book Allotment
                        </Button>
                        <Button onClick={() => goBack()}>Back</Button>
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
                                                <span className="book-history-detail__item-name-heading">Book</span>
                                                <span>
                                                    <Link to={`${Routes.BOOKS + book.id}/details`}>{book.name}</Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="book-history-detail__item-container">
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">Book Code</span>
                                                <span>
                                                    {book_item.book_code}
                                                </span>
                                            </div>
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">Member</span>
                                                <span>
                                                      <Link to={`${Routes.MEMBERS + book_item.member_id}/details`}>
                                                          {bookHistory.member_name}
                                                      </Link>
                                                </span>
                                            </div>
                                            {book_item.language ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">Language</span>
                                                    <span>{book_item.language.language_name}</span>
                                                </div> : null
                                            }
                                            {book_item.publisher ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">Publisher</span>
                                                    <span>{book_item.publisher.name}</span>
                                                </div> : null
                                            }
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">Format</span>
                                                <span>
                                                   {bookFormatOptions.filter(bookFormat => bookFormat.id === +book_item.format).map(({ name }) => name)}
                                                </span>
                                            </div>
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">Edition</span>
                                                <span>
                                                    {book_item.edition}
                                                </span>
                                            </div>
                                            <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">Status</span>
                                                <span> {renderBookStatus(bookHistory)}</span>
                                            </div>
                                            {bookHistory.issuer_name ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">Issuer</span>
                                                    <span>
                                                    {bookHistory.issuer_name}
                                                </span>
                                                </div> : null
                                            }
                                            {bookHistory.returner_name ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">Returner</span>
                                                    <span>{bookHistory.returner_name}</span>
                                                </div> : null
                                            }
                                            {bookHistory.issued_on ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        Issue Date
                                                    </span>
                                                    <span>{dateFormatter(bookHistory.issued_on)}</span>
                                                </div> : null
                                            }
                                            {bookHistory.issue_due_date ?
                                                <div className="book-history-detail__item">
                                                <span
                                                    className="book-history-detail__item-heading">Issue Due Date</span>
                                                    <span>{dateFormatter(bookHistory.issue_due_date)}</span>
                                                </div> : null
                                            }
                                            {bookHistory.return_date ?
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        Return Date
                                                    </span>
                                                    <span>
                                                        {dateFormatter(bookHistory.return_date)}
                                                    </span>
                                                </div> : null
                                            }
                                            {bookHistory.return_due_date ?
                                                <div className="book-history-detail__item">
                                                <span className="book-history-detail__item-heading">
                                                    Return Due Date
                                                </span>
                                                    <span>{dateFormatter(bookHistory.return_due_date)}</span>
                                                </div> : null
                                            }
                                            {bookHistory.note ?
                                                <div className="book-history-detail__item-note">
                                                    <span className="book-history-detail__item-heading">
                                                        Note
                                                    </span>
                                                    <span>{bookHistory.note}</span>
                                                </div> : null
                                            }
                                        </div>
                                    </div>
                                </Row>
                                <BookHistoryModal {...cardModalProps}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state, ownProp) => {
    const { members, booksAllotment, membershipPlans, books, isLoading } = state;
    return {
        bookHistory: booksAllotment[ownProp.match.params.id],
        membershipPlans: Object.values(membershipPlans),
        books: Object.values(books),
        members: prepareFullNames(Object.values(members)),
        isLoading
    }
};
export default connect(mapStateToProps, {
    fetchBookAllotment,
    fetchBooks,
    fetchMembers,
    toggleModal
})(BookAllotmentDetail);
