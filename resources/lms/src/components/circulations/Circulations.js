import React, {useState, useEffect} from 'react';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import CirculationModal from './CirculationModal';
import Circulation from './Circulation';
import './Circulations.scss';
import Toasts from '../../shared/toast/Toasts';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchCirculations} from '../../store/actions/circulationAction';
import {fetchBooks} from '../../store/actions/bookAction';
import {fetchMembers} from '../../store/actions/memberAction';

const Circulations = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [circulation, setCirculation] = useState(null);
    const {circulations, books, members, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchCirculations();
        props.fetchBooks();
        props.fetchMembers();
    }, []);
    const cardModalProps = {circulation, books, members, isEditMode, isDeleteMode, toggleModal};
    const onOpenModal = (isEdit, circulation = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setCirculation(circulation);
        toggleModal();
    };
    const cardBodyProps = {books, members, sortAction, sortObject, circulations, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="pull-left text-dark">Circulations</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        Issue/Reserve Book
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {circulations.length > 0 ? <Circulation {...cardBodyProps}/> :
                                <EmptyComponent title="No circulations yet..."/>}
                            <CirculationModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {books, circulations, members, searchText, sortObject, isLoading} = state;
    let circulationsArray = Object.values(circulations);
    if (searchText) {
        circulationsArray = searchFilter(circulationsArray, searchText);
    }
    if (sortObject) {
        circulationsArray = sortFilter(circulationsArray, sortObject);
    }
    return {
        books: prepareBooks(Object.values(books)),
        circulations: circulationsArray,
        members: prepareMembers(Object.values(members)),
        sortObject,
        isLoading
    };
};
const prepareBooks = (books) => {
    let bookArray = [{id: 0, name: 'Select Book'}];
    books.forEach(book => {
        book.quantity = 1;
        bookArray.push(book);
    });
    return bookArray;
};
const prepareMembers = (members) => {
    let memberArray = [{id: 0, name: 'Select Member'}];
    members.forEach(member => {
        memberArray.push({id: member.id, name: member.first_name + ' ' + member.last_name});
    });
    return memberArray;
};

export default connect(mapStateToProps, {
    fetchCirculations,
    fetchBooks,
    fetchMembers,
    sortAction,
    toggleModal
})(Circulations);
