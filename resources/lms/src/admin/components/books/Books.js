import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {fetchBooks} from '../../store/actions/bookAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import DeleteBook from './DeleteBook';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import {Routes} from "../../../constants";
import {prepareFullNames} from "../../../shared/sharedMethod";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {publicImagePath, publicImagePathURL} from "../../../appConstant";

const Books = (props) => {
    const [book, setBook] = useState(null);

    const { books, history, isLoading, toggleModal, totalRecord } = props;

    const cardModalProps = {
        book,
        toggleModal,
    };
    const onOpenModal = (book = null) => {
        setBook(book);
        toggleModal();
    };
    const goToBookDetail = (bookId) => {
        history.push(`${Routes.BOOKS + bookId}/details`);
    };
    const columns = [
        {
            name: 'Cover',
            selector: 'image',
            width: '95px',
            cell: row => {
                const imageUrl = row.image ? publicImagePathURL.BOOK_AVATAR_URL + row.image : publicImagePath.BOOK_AVATAR;
                return <img className="book-table-row__cover-img" src={imageUrl} alt={imageUrl}/>
            },
        },
        {
            name: 'ISBN No.',
            selector: 'isbn',
            width: '120px',
            sortable: true,
            cell: row => row.isbn
        },
        {
            name: 'Book',
            selector: 'name',
            sortable: true,
            wrap: true,
            cell: row => row.name
        },
        {
            name: 'Authors',
            selector: 'author_name',
            sortable: true,
            cell: row => <span>{prepareFullNames(row.authors).map((({ name }) => name)).join(',  ')}</span>
        },
        {
            name: 'Action',
            selector: 'id',
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '100px',
            cell: row => <ModalAction isHideEditIcon={true} isHideDetailIcon={false} goToDetailScreen={goToBookDetail}
                                      onOpenModal={onOpenModal} item={row} isEditMode={true}/>,
        },
    ];
    const onChange = (filter) => {
        props.fetchBooks(filter, history, true);
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title={'Books | LMS System'}/>
                <h5 className="page-heading">Books</h5>
                <div className="d-flex justify-content-end">
                    <Link to={`${Routes.BOOKS}new`} size="md" className="btn btn-primary ml-2">New Book</Link>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={books} columns={columns} loading={isLoading} totalRows={totalRecord}
                                            onOpenModal={onOpenModal} onChange={onChange}/>
                            <DeleteBook {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );

};

const mapStateToProps = (state) => {
    const { books, isLoading, totalRecord } = state;
    let booksArray = Object.values(books);
    return {
        books: booksArray, isLoading, totalRecord
    };
};

export default connect(mapStateToProps, {
    fetchBooks, toggleModal
})(Books);
