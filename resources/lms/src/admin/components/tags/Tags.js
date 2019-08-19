import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import TagModal from './TagModal';
import './Tags.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchTags} from '../../store/actions/tagAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import PublisherModal from "../publishers/PublisherModal";

const Tags = (props) => {
    const [isCreateTag, setCreateMode] = useState(false);
    const [isEditTag, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [tag, setTag] = useState(null);
    const { tags, toggleModal, totalRecord, isLoading } = props;
    const cardModalProps = { tag, isDeleteMode, isEditTag, isCreateTag, toggleModal };

    const onOpenModal = (isEdit, tag = null, isDelete = false) => {
        setEditMode(isEdit);
        setCreateMode(!isEdit);
        setDeleteMode(isDelete);
        setTag(tag);
        toggleModal();
    };

    const fetchTags = (filter) => {
        props.fetchTags(filter, true);
    };

    const onChange = (filter) => {
        fetchTags(filter);
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
                <ProgressBar/>
                <HeaderTitle title={'Tags | LMS System'}/>
                <h5 className="page-heading">Tags</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Tag
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={tags} columns={columns} loading={isLoading} totalRows={totalRecord}
                                            onChange={onChange}/>
                            <PublisherModal {...cardModalProps}/>
                            <TagModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { tags, isLoading, totalRecord } = state;
    let tagsArray = Object.values(tags);
    return { tags: tagsArray, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchTags, toggleModal })(Tags);
