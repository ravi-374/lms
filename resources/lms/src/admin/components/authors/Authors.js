import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../../shared/components/SearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import AuthorModal from './AuthorModal';
import Author from './Author';
import './Authors.scss';
import Toasts from '../../../shared/toast/Toasts';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const Authors = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [author, setAuthor] = useState(null);
    const {authors, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchAuthors();
    }, []);
    const cardModalProps = {author, isDeleteMode, isEditMode, toggleModal};
    const onOpenModal = (isEdit, author = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setAuthor(author);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, authors, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title={'Authors | LMS System'}/>
                <h5 className="page-heading">Authors</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Author
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {authors.length > 0 ? <Author {...cardBodyProps}/> :
                                <EmptyComponent title="No authors yet..."/>}
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
    const {authors, searchText, sortObject, isLoading} = state;
    let authorsArray = Object.values(authors);
    if (searchText) {
        authorsArray = searchFilter(authorsArray, searchText);
    }
    if (sortObject) {
        authorsArray = sortFilter(authorsArray, sortObject);
    }
    return {authors: authorsArray, sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchAuthors, sortAction, toggleModal})(Authors);
