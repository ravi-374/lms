import React, {createRef, useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Button} from 'reactstrap';
import {reduxForm, Field} from 'redux-form';
import InputGroup from '../../../shared/components/InputGroup';
import Radio from '../../../shared/components/Radio';
import TypeAhead from '../../../shared/components/TypeAhead';
import {resetSearchBooks} from "../../store/actions/bookSearchAction";
import './Books.scss';

const BookSearchForm = (props) => {
    const {books, authors, change, onSearchBook, resetSearchBooks} = props;
    const [isAuthorChecked, setIsAuthorChecked] = useState(false);
    const [isBookChecked, setIsBookChecked] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const typeAheadRef = createRef();
    const prepareParams = (item) => {
        if (isBookChecked) {
            return `id=${item[0].id}&search_by_book=${true}`
        } else if (isAuthorChecked) {
            return `id=${item[0].id}&search_by_author=${true}`
        }
    };
    const searchBook = (formValues) => {
        onSearchBook(prepareParams(formValues.item));
    };
    const onSelectItem = (option) => {
        if (option.length > 0) {
            change('item', option);
            setIsDisabled(false);
        } else {
            change('item', null);
            setIsDisabled(true);
        }
    };
    const onCheckedBook = () => {
        setIsBookChecked(!isBookChecked);
        typeAheadRef.current.getInstance().clear();
        setIsAuthorChecked(false);
        resetSearchBooks();
    };
    const onCheckedAuthor = () => {
        setIsAuthorChecked(!isAuthorChecked);
        typeAheadRef.current.getInstance().clear();
        setIsBookChecked(false);
        resetSearchBooks();
    };
    const onResetSearch = () => {
        change('item', null);
        typeAheadRef.current.getInstance().clear();
        setIsDisabled(true);
        resetSearchBooks();
    };
    const {handleSubmit} = props;
    return (
        <Row className="animated fadeIn flex-column">
            <div className="d-flex">
                <div className="flex-1"/>
                <div className="flex-2">
                    <Col xs={12} className="book-form__filter-by">
                        <span className="book-form__filter-by-label">Search By</span>
                        <div className="ml-4">
                            <Field name="filter_by" label="Book" value="book" checked={isBookChecked}
                                   onChange={onCheckedBook} component={Radio}/>
                        </div>
                        <div className="ml-2">
                            <Field name="filter_by" label="Author" value="author" checked={isAuthorChecked}
                                   onChange={onCheckedAuthor} component={Radio}/>
                        </div>
                    </Col>
                </div>
            </div>
            <div className="d-flex">
                <div className="flex-1"/>
                <div className="flex-2">
                    <Col xs={12}>
                        <span className="book-form__input-label">{isBookChecked ? 'Book' : 'Author'} Name</span>
                        <div className="book-form__input-book">
                            <TypeAhead
                                id="item"
                                options={isBookChecked ? books : authors}
                                placeholder={`Select ${isBookChecked ? 'Book' : 'Author' }`}
                                onChange={onSelectItem}
                                groupText={isBookChecked ? 'book' : 'user-circle-o'}
                                reference={typeAheadRef}
                            />
                            <Field name="item" type="hidden" component={InputGroup}/>
                        </div>
                    </Col>
                </div>
            </div>
            <Col xs={12} className=" mt-2 d-flex flex-row justify-content-center">
                <Button onClick={handleSubmit(searchBook)} disabled={isDisabled} color="primary">Search</Button>
                <Button className="ml-2" onClick={() => onResetSearch()}>Reset</Button>
            </Col>
        </Row>
    )
};

const bookSearchForm = reduxForm({form: 'bookSearchForm'})(BookSearchForm);
export default connect(null, {resetSearchBooks})(bookSearchForm);
