import React, {useState, useEffect, Fragment} from 'react';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import BookItemModal from './BookItemModal';
import BookItem from './BookItem';
import './BookItems.scss';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import {toggleModal} from '../../../store/action/modalAction';
import {setBookItems} from '../../store/actions/bookItemAction';

const BookItems = (props) => {
    const {
        bookLanguages, publishers, bookItemList, bookItems,
        sortAction, sortObject, toggleModal, setBookItems, bookId, isParentToggle, setIsParentToggle, currency
    } = props;
    const [isCreateMode, setCreateMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookItem, setBookItem] = useState(null);
    useEffect(() => {
        setBookItems([...bookItemList]);
    }, []);
    const cardModalProps = {
        bookItem,
        bookLanguages,
        publishers,
        isCreateMode,
        isDeleteMode,
        isEditMode,
        toggleModal,
        bookItems,
        bookId
    };
    const onOpenModal = (isEdit, bookItem = null, isDelete = false) => {
        setIsParentToggle(false);
        setCreateMode(!isEdit);
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setBookItem(bookItem);
        toggleModal();
    };
    const cardBodyProps = { sortAction, sortObject, bookItems, bookLanguages, publishers, onOpenModal, currency };
    return (
        <Fragment>
            {bookItems.length > 0 ? <BookItem {...cardBodyProps}/> :
                <EmptyComponent isShort={true} title="No book Items yet..."/>}
            <Button className="pull-right" onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                New Book Item
            </Button>
            {!isParentToggle ? <BookItemModal {...cardModalProps}/> : null}
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    const { bookItems, searchText, sortObject, isLoading } = state;
    let bookItemsArray = Object.values(bookItems);
    if (searchText) {
        bookItemsArray = searchFilter(bookItemsArray, searchText);
    }
    if (sortObject) {
        bookItemsArray = sortFilter(bookItemsArray, sortObject);
    }
    return { bookItems: bookItemsArray, sortObject, isLoading };
};

export default connect(mapStateToProps, { setBookItems, sortAction, toggleModal })(BookItems);
