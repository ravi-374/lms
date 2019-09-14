import React, {useState} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import BookLanguageModal from './BookLanguageModal';
import './BookLanguages.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ReactDataTable from "../../../shared/table/ReactDataTable";

const BookLanguages = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookLanguage, setBookLanguage] = useState(null);
    const { bookLanguages, toggleModal, totalRecord, isLoading,appName, appLogo } = props;
    const cardModalProps = { bookLanguage, isDeleteMode, isEditMode, toggleModal };

    const onChange = (filter) => {
        props.fetchBookLanguages(filter, true);
    };

    const columns = [
        {
            name: 'Code',
            selector: 'language_code',
            sortable: true,
            cell: row => <span>{row.language_code}</span>,
        },
        {
            name: 'Name',
            selector: 'language_name',
            sortable: true,
            cell: row => <span>{row.language_name}</span>,
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

    const onOpenModal = (isEdit, bookLanguage = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setBookLanguage(bookLanguage);
        toggleModal();
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle appLogo={appLogo} title={`Book Languages | ${appName}`}/>
                <ProgressBar/>
                <h5 className="page-heading">Book Languages</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Book Language
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={bookLanguages} columns={columns} loading={isLoading}
                                            totalRows={totalRecord} onOpenModal={onOpenModal} onChange={onChange}/>
                            <BookLanguageModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { bookLanguages, isLoading, totalRecord } = state;
    return { bookLanguages, totalRecord, isLoading };
};

export default connect(mapStateToProps, { fetchBookLanguages, toggleModal })(BookLanguages);
