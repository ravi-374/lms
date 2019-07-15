import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import TagModal from './TagModal';
import Tag from './Tag';
import './Tags.scss';
import Toasts from '../../shared/toast/Toasts';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchTags} from '../../store/actions/tagAction';

const Tags = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [tag, setTag] = useState(null);
    const {tags, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchTags();
    }, []);
    const cardModalProps = {tag, isDeleteMode, isEditMode, toggleModal};
    const onOpenModal = (isEdit, tag = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setTag(tag);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, tags, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="pull-left text-dark">Tags</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Tag
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {tags.length > 0 ? <Tag {...cardBodyProps}/> :
                                <EmptyComponent title="No tags yet..."/>}
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
    const {tags, searchText, sortObject, isLoading} = state;
    let tagsArray = Object.values(tags);
    if (searchText) {
        tagsArray = searchFilter(tagsArray, searchText);
    }
    if (sortObject) {
        tagsArray = sortFilter(tagsArray, sortObject);
    }
    return {tags: tagsArray, sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchTags, sortAction, toggleModal})(Tags);
