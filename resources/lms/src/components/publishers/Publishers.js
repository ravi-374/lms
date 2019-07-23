import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import PublisherModal from './PublisherModal';
import Publisher from './Publisher';
import './Publishers.scss';
import Toasts from '../../shared/toast/Toasts';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchPublishers} from '../../store/actions/publisherAction';

const Publishers = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [publisher, setPublisher] = useState(null);
    const {publishers, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchPublishers();
    }, []);
    const cardModalProps = {publisher, isDeleteMode, isEditMode, toggleModal};
    const onOpenModal = (isEdit, publisher = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setPublisher(publisher);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, publishers, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="page-heading">Publishers</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Publisher
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {publishers.length > 0 ? <Publisher {...cardBodyProps}/> :
                                <EmptyComponent title="No publishers yet..."/>}
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
    const {publishers, searchText, sortObject, isLoading} = state;
    let publishersArray = Object.values(publishers);
    if (searchText) {
        publishersArray = searchFilter(publishersArray, searchText);
    }
    if (sortObject) {
        publishersArray = sortFilter(publishersArray, sortObject);
    }
    return {publishers: publishersArray, sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchPublishers, sortAction, toggleModal})(Publishers);
