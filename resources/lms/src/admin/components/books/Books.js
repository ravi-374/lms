import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Books.scss';
import {publicImagePath, publicImagePathURL} from "../../../appConstant";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import DeleteBook from './DeleteBook';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import {Routes} from "../../../constants";
import {getFormattedMessage, prepareFullNames} from "../../../shared/sharedMethod";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {fetchBooks} from '../../store/actions/bookAction';
import {toggleModal} from '../../../store/action/modalAction';

const Books = (props) => {
    const { books, history, isLoading, toggleModal, totalRecord, fetchBooks } = props;
    const [book, setBook] = useState(null);
    const cardModalProps = {
        book,
        toggleModal,
    };

    const onChange = (filter) => {
        fetchBooks(filter, history, true);
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
            name: getFormattedMessage('books.table.cover.column'),
            selector: 'image',
            width: '100px',
            cell: row => {
                const imageUrl = row.image ? publicImagePathURL.BOOK_AVATAR_URL + row.image : publicImagePath.BOOK_AVATAR;
                return <img className="books-table-row__cover-img" src={imageUrl} alt={imageUrl}/>
            },
        },
        {
            name: getFormattedMessage('books.input.isbn.label'),
            selector: 'isbn',
            width: '140px',
            sortable: true,
            cell: row => row.isbn
        },
        {
            name: getFormattedMessage('books.table.book.column'),
            selector: 'name',
            sortable: true,
            wrap: true,
            cell: row => row.name
        },
        {
            name: getFormattedMessage('authors.title'),
            selector: 'author_name',
            sortable: true,
            cell: row => {
                row.author_name = prepareFullNames(row.authors).map((({ name }) => name)).join(',  ');
                return <span>{row.author_name}</span>
            }
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '100px',
            cell: row => <ModalAction isHideEditIcon={true} isHideDetailIcon={false} goToDetailScreen={goToBookDetail}
                                      onOpenModal={onOpenModal} item={row} isEditMode={true}/>,
        },
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Books"/>
                <h5 className="page-heading">{getFormattedMessage('books.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Link to={`${Routes.BOOKS}import-book`} size="md" className="btn btn-primary ml-2">
                        {getFormattedMessage('books.input.import-btn.label')}
                    </Link>
                    <Link to={`${Routes.BOOKS}new`} size="md" className="btn btn-primary ml-2">
                        {getFormattedMessage('books.input.new-btn.label')}
                    </Link>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={books} columns={columns} loading={isLoading}
                                            emptyStateMessageId="books.empty-state.title" totalRows={totalRecord}
                                            onChange={onChange}/>
                            <DeleteBook {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};


Books.propTypes = {
    books: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBooks: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { books, isLoading, totalRecord } = state;
    return { books, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchBooks, toggleModal })(Books);
