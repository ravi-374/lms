import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Button} from 'reactstrap';
import {reduxForm, Field} from 'redux-form';
import Radio from '../../../shared/components/Radio';
import {resetSearchBooks} from "../../store/actions/bookSearchAction";
import './Books.scss';
import Select from "../../../shared/components/Select";

const BookSearchForm = (props) => {
    const { books, authors, change, onSearchBook, resetSearchBooks, setSearch } = props;
    const [isAuthorChecked, setIsAuthorChecked] = useState(false);
    const [isBookChecked, setIsBookChecked] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const prepareParams = (item) => {
        if (isBookChecked) {
            return `id=${item.id}&search_by_book=${true}`
        } else if (isAuthorChecked) {
            return `id=${item.id}&search_by_author=${true}`
        }
    };
    const searchBook = (formValues) => {
        onSearchBook(prepareParams(formValues.item));
        setSearch(true);
    };
    const onSelectItem = () => {
        setIsDisabled(false);
    };
    const onCheckedBook = () => {
        change('item', null);
        setIsDisabled(true);
        setSearch(false);
        setIsBookChecked(!isBookChecked);
        setIsAuthorChecked(false);
        resetSearchBooks();
    };
    const onCheckedAuthor = () => {
        change('item', null);
        setIsDisabled(true);
        setSearch(false);
        setIsAuthorChecked(!isAuthorChecked);
        setIsBookChecked(false);
        resetSearchBooks();
    };
    const onResetSearch = () => {
        change('item', null);
        setIsDisabled(true);
        setSearch(false);
        resetSearchBooks();
    };
    const { handleSubmit } = props;
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
                            <Field name="item" options={isBookChecked ? books : authors}
                                   placeholder={`Select ${isBookChecked ? 'Book' : 'Author' }`} onChange={onSelectItem}
                                   groupText={isBookChecked ? 'book' : 'user-circle-o'} component={Select}
                                   isSearchable={true}/>
                        </div>
                    </Col>
                    <Col xs={12} className="d-flex flex-row justify-content-end book-form__btn">
                        <Button onClick={handleSubmit(searchBook)} disabled={isDisabled} color="primary">Search</Button>
                        <Button className="ml-2" onClick={() => onResetSearch()}>Reset</Button>
                    </Col>
                </div>
            </div>
        </Row>
    )
};

const bookSearchForm = reduxForm({ form: 'bookSearchForm' })(BookSearchForm);
export default connect(null, { resetSearchBooks })(bookSearchForm);
