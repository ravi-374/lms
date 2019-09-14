import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import PublisherModal from './PublisherModal';
import './Publishers.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ModalAction from "../../../shared/action-buttons/ModalAction";

const Publishers = (props) => {
    const [isCreateMode, setCreateMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [publisher, setPublisher] = useState(null);
    const { publishers, toggleModal, totalRecord, isLoading, appName, appLogo } = props;

    const cardModalProps = { publisher, isDeleteMode, isEditMode, isCreateMode, toggleModal };
    const onOpenModal = (isEdit, publisher = null, isDelete = false) => {
        setEditMode(isEdit);
        setCreateMode(!isEdit);
        setDeleteMode(isDelete);
        setPublisher(publisher);
        toggleModal();
    };

    const onChange = (filter) => {
        props.fetchPublishers(filter, true);
    };

    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
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
                <HeaderTitle appLogo={appLogo} title={`Publishers | ${appName}`}/>
                <ProgressBar/>
                <h5 className="page-heading">Publishers</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Publisher
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={publishers} columns={columns} loading={isLoading}
                                            totalRows={totalRecord} onOpenModal={onOpenModal} onChange={onChange}/>
                            <PublisherModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { publishers, isLoading, totalRecord } = state;
    return { publishers, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchPublishers, toggleModal })(Publishers);
