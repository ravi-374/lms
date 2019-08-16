import React, {useState, useEffect,createRef} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Col, Row, Button, Table} from 'reactstrap';
import bookValidate from './bookValidate';
import './Books.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import TextArea from '../../../shared/components/TextArea';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import CustomInput from '../../../shared/components/CustomInput';
import PriceInput from '../../../shared/components/PriceInput';
import {addToast} from '../../../store/action/toastAction';
import {bookFormatOptions} from '../../constants';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import TypeAhead from '../../../shared/components/TypeAhead';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import Select from "../../../shared/components/Select";

const BookForm = (props) => {
    const [image, setImage] = useState(publicImagePath.BOOK_AVATAR);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const {initialValues, change} = props;
    const [genres] = useState(initialValues ? initialValues.selectedGenres : []);
    const [tags] = useState(initialValues ? initialValues.selectedTags : []);
    const [authors] = useState(initialValues ? initialValues.selectedAuthors : []);
    const [file, setFile] = useState(null);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isValidAuthor, setIsValidAuthor] = useState(false);
    const [isValidGenre, setIsValidGenre] = useState(false);
    const [items, setItems] = useState(initialValues ? initialValues.items : [{}]);
    const inputRef = createRef();
    useEffect(() => {
        if (initialValues && initialValues.is_featured) {
            setIsFeatured(initialValues.is_featured ? initialValues.is_featured : false);
        }
        if (initialValues) {
            props.change('tags', tags);
            props.change('genres', genres);
            props.change('authors', authors);
            if (initialValues.image) {
                change('file_name', true);
                setImage(publicImagePathURL.BOOK_AVATAR_URL + initialValues.image);
                setIsDefaultImage(false);
            }
        } else {
            props.initialize({items: [{}]});
            inputRef.current.focus();
        }

    }, []);
    const onSaveBook = (formValues) => {
        formValues.file = file;
        props.onSaveBook(formValues);
    };
    const onFileChange = (event) => {
        change('file_name', true);
        setFile(event.target.files[0]);
        setIsDefaultImage(false);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        }
    };
    const onRemovePhoto = () => {
        change('file_name', false);
        setFile(null);
        setImage(publicImagePath.BOOK_AVATAR);
        setIsDefaultImage(true);
    };
    const onSelectGenres = (options) => {
        setIsLoading(false);
        props.change('genres', options);
        if (options.length === 0) {
            setIsValidGenre(true);
        } else {
            setIsValidGenre(false);
        }
    };
    const onSelectAuthor = (options) => {
        props.change('authors', options);
        if (options.length === 0) {
            setIsValidAuthor(true);
        } else {
            setIsValidAuthor(false);
        }
    };
    const onSelectTag = (options) => {
        props.change('tags', options);
    };
    const onChecked = () => {
        setIsFeatured(!isFeatured);
    };
    if (isLoading && initialValues && genres.length === 0) {
        return null;
    }
    const imagePickerOptions = {image, buttonName: 'Cover', isDefaultImage, onRemovePhoto, onFileChange};
    return (
        <Row className="animated fadeIn book-form m-3">
            <Col xs={8} className="primary-detail">
                <div className="d-flex justify-content-between">
                    <h5>Primary Details</h5>
                    <div className="d-flex">
                        <div>
                            <Field name="is_featured" checked={isFeatured} label="Is Featured" onChange={onChecked}
                                   component={ToggleSwitch}/>
                        </div>
                    </div>
                </div>
                <hr style={{marginTop: '0px'}}/>
                <Row>
                    <Col xs={6}>
                        <Field name="isbn" label="ISBN No" required inputRef={inputRef} groupText="id-card"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <TypeAhead
                            id="author"
                            label="Authors"
                            required
                            multiple={true}
                            options={props.authors}
                            placeholder="Select Author"
                            onChange={onSelectAuthor}
                            groupText="user-circle-o"
                            defaultSelected={authors}
                            isInvalid={isValidAuthor}
                        />
                        <Field name="authors" type="hidden" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <TypeAhead
                            id="genres"
                            label="Genres"
                            required
                            multiple={true}
                            options={props.genres}
                            placeholder="Select Genres"
                            onChange={onSelectGenres}
                            groupText="list-alt"
                            defaultSelected={genres}
                            isInvalid={isValidGenre}
                        />
                        <Field name="genres" type="hidden" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="name" label="Name" required groupText="book" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <TypeAhead
                            id="tags"
                            label="Tags"
                            multiple={true}
                            options={props.tags}
                            placeholder="Select Tag"
                            onChange={onSelectTag}
                            groupText="tag"
                            defaultSelected={tags}
                        />
                        <Field name="tags" type="hidden" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="url" label="URL" groupText="link" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="book-cover">
                <h5>Book Cover</h5>
                <hr/>
                <div className="mt-5">
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImagePicker {...imagePickerOptions}/>
                </div>
            </Col>
            <Col xs={12} className="mt-2">
                <Row>
                    <Col xs={12}>
                        <Field name="description" cols={90} rows={3} label="Description" component={TextArea}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={12} className="mt-3">
                <h5>Book Items</h5>
                <FieldArray name="items" component={renderBookItems}
                            bookLanguages={props.bookLanguages}
                            publishers={props.publishers} setItems={setItems}
                            items={items}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBook)} {...props}/>
            </Col>
        </Row>
    );
};

const renderBookItems = ({fields, meta: {error, submitFailed}, items, setItems, bookLanguages, publishers}) => {
    const onAddSubFields = () => {
        setItems([...items, {id: 1}]);
        return fields.push({});
    };
    const onRemoveSubFields = (index) => {
        return fields.remove(index);
    };
    return (
        <div>
            <Table responsive size="md" className="table-multi-item-responsive">
                <thead>
                <tr>
                    <th className="book-form__item-header">Edition</th>
                    <th className="book-form__item-header">Format</th>
                    <th className="book-form__item-header">Price</th>
                    <th className="book-form__item-header">Language</th>
                    <th>Publisher</th>
                    <th className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {fields.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <Field name={`${item}.edition`} type="text" placeholder="Edition"
                                           groupText="file-text" component={CustomInput}/>
                                </td>
                                <td className="book-form__format">
                                    <Field
                                        name={`${item}.format`}
                                        required
                                        options={bookFormatOptions}
                                        placeholder="Select Format"
                                        groupText="wpforms"
                                        component={Select}
                                        isMini={true}
                                        menuPlacement="top"
                                    />
                                </td>
                                <td>
                                    <Field name={`${item}.price`} min="1" type="number" placeholder="Price"
                                           groupText="money" component={PriceInput}/>
                                </td>
                                <td className="book-form__language">
                                    <Field
                                        name={`${item}.language`}
                                        required
                                        options={bookLanguages}
                                        placeholder="Select Language"
                                        groupText="language"
                                        component={Select}
                                        isSearchable={true}
                                        isMini={true}
                                        menuPlacement="top"
                                    />
                                </td>
                                <td className="book-form__publisher">
                                    <Field
                                        name={`${item}.publisher`}
                                        options={publishers}
                                        placeholder="Select Publisher"
                                        groupText="user-circle-o"
                                        component={Select}
                                        isSearchable={true}
                                        isMini={true}
                                        menuPlacement="top"
                                    />
                                    <Field name={`${item}.publisher_id`} type="hidden" component={InputGroup}/>
                                </td>
                                <td className="text-center">
                                    <Button size="sm" color="danger" style={{marginTop: '10px'}}
                                            onClick={() => onRemoveSubFields(index, item)}>
                                        <i className="cui-trash icon font-md"/>
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
            <button type="button" className="btn btn-outline-primary" onClick={() => onAddSubFields()}>Add Item
            </button>
            {submitFailed && error && <div className="text-danger mt-3">{error}</div>}
        </div>
    )
};

const form = reduxForm({form: 'bookForm', validate: bookValidate})(BookForm);
export default connect(null, {addToast})(form);
