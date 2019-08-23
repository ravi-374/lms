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
import ProgressBar from "../../../shared/progress-bar/ProgressBar";

const Authors = (props) => {
    const [isCreateAuthor, setCreateAuthor] = useState(false);
    const [isEdiAuthor, setEditAuthor] = useState(false);
    const [isDeleteAuthor, setDeleteAuthor] = useState(false);
    const [author, setAuthor] = useState(null);
    const { authors, toggleModal, totalRecord, isLoading, fetchAuthors } = props;
    const cardModalProps = { author, isCreateAuthor, isDeleteAuthor, isEdiAuthor, toggleModal };

    const onChange = (filter) => {
        fetchAuthors(filter, true);
    };

    const onOpenModal = (isEdit, author = null, isDelete = false) => {
        setCreateAuthor(!isEdit);
        setEditAuthor(isEdit);
        setDeleteAuthor(isDelete);
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
                <ProgressBar/>
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
    return { authors, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchAuthors, toggleModal })(Authors);
