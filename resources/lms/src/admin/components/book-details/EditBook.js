import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {editBook} from '../../store/actions/bookAction';
import BookForm from './BookForm';
import prepareFormData from '../books/prepareFormData';
import Modal from '../../../shared/components/Modal';
import {fetchAuthors} from '../../store/actions/authorAction';
import {fetchTags} from '../../store/actions/tagAction';
import {fetchGenres} from '../../store/actions/genreAction';
import '../books/Books.scss';
import {prepareFullNames} from "../../../shared/sharedMethod";

const EditBook = (props) => {
    useEffect(() => {
        props.fetchAuthors();
        props.fetchGenres();
        props.fetchTags();
    }, []);
    const { authors, genres, tags, book, toggleModal } = props;
    const { id, is_featured, isbn, name, price, url, description, image } = book;
    const changAbleFields = {
        id,
        is_featured,
        isbn,
        genres: props.book.genres,
        authors: props.book.authors ? prepareFullNames(props.book.authors) : [],
        name,
        price,
        tags: props.book.tags,
        url,
        description,
        image,
    };
    const onSaveBook = (formValues) => {
        props.editBook(id, prepareFormData(formValues));
    };
    const prepareFormOption = {
        onSaveBook,
        initialValues: changAbleFields,
        authors, tags, genres,
        onCancel: toggleModal,
    };
    const prepareModalOption = {
        className: 'book-modal',
        title: 'Edit Book Details',
        toggleModal
    };
    return (
        <Modal {...prepareModalOption} content={<BookForm {...prepareFormOption}/>}/>
    );
};

const mapStateToProps = (state) => {
    const { authors, tags, genres } = state;
    return {
        authors: prepareFullNames(Object.values(authors)),
        tags: Object.values(tags),
        genres: Object.values(genres)
    }
};
export default connect(
    mapStateToProps, {
        editBook,
        fetchAuthors,
        fetchGenres,
        fetchTags,
    }
)(EditBook);
