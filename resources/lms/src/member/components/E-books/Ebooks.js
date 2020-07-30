import React from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {fetchEBookRequests} from "../../store/actions/ebookAction";
import {icon} from "../../../constants";

const Ebooks = (props) => {
    const { ebooks, isLoading, fetchEBookRequests } = props;

    const onChange = (filter) => {
        fetchEBookRequests(filter, true);
    };

    const columns = [
        {
            name: getFormattedMessage('e-books.input.isbn.label'),
            selector: 'isbn',
            width: '200px',
            sortable: true,
            cell: row => <span>{row.isbn_no}</span>,
        },
        {
            name: getFormattedMessage('e-books.input.name.label'),
            selector: 'e_book_name',
            sortable: true,
            cell: row => <span>{row.name}</span>,
        },
        {
            name: getFormattedMessage('e-books.input.edition.label'),
            selector: 'edition',
            sortable: true,
            cell: row => <span>{row.edition}</span>,
        },
        {
            name: getFormattedMessage('e-books.input.language.label'),
            selector: 'language_name',
            sortable: true,
            cell: row => <span>{row.language_name}</span>,
        },
        {
            name: getFormattedMessage('e-books.input.author.label'),
            selector: 'authors',
            width: '300px',
            sortable: true,
            cell: row => <span>{row.authors}</span>,
        }
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title="Books Request"/>
                <h5 className="page-heading">{getFormattedMessage('e-book.title')}</h5>
                <ProgressBar/>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={ebooks} columns={columns} loading={isLoading}
                                            emptyStateMessageId="e-book.empty-state.title"
                                            emptyNotFoundStateMessageId="e-books.not-found.empty-state.title"
                                            onChange={onChange} icon={(icon.BOOK)}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Ebooks.propTypes = {
    ebooks: PropTypes.array,
    isLoading: PropTypes.bool,
    fetchEBookRequests: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { ebooks, isLoading } = state;
    return { ebooks, isLoading };
};

export default connect(mapStateToProps, { fetchEBookRequests })(Ebooks);
