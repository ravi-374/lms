import React, {useState} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import AuthorModal from './AuthorModal';
import './Authors.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ModalAction from "../../../shared/action-buttons/ModalAction";

const Authors = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [author, setAuthor] = useState(null);
    const { authors, toggleModal, totalRecord, isLoading } = props;
    const cardModalProps = { author, isDeleteMode, isEditMode, toggleModal };

    const fetchAuthors = (filter) => {
        props.fetchAuthors(filter);
    };

    const onChange = (filter) => {
        fetchAuthors(filter);
    };

    const onOpenModal = (isEdit, author = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setAuthor(author);
        toggleModal();
    };
    const columns = [
        {
            name: 'Name',
            selector: 'first_name',
            sortable: true,
            cell: row => <span>{row.first_name} {row.last_name}</span>,
        },
        {
            name: 'Action',
            selector: 'id',
            right: true,
            cell: row => <ModalAction onOpenModal={onOpenModal} item={row}/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title={'Authors | LMS System'}/>
                <h5 className="page-heading">Authors</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Author
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={authors} columns={columns} loading={isLoading}
                                            totalRows={totalRecord} onOpenModal={onOpenModal} onChange={onChange}/>
                            <AuthorModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { authors, isLoading, totalRecord } = state;
    let authorsArray = Object.values(authors);
    return { authors: authorsArray, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchAuthors, toggleModal })(Authors);
