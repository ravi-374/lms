import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Col, Row, Button, Table} from 'reactstrap';
import bookValidate from './bookValidate';
import './Books.scss';
import SaveAction from '../../shared/action-buttons/SaveAction';
import InputGroup from '../../shared/components/InputGroup';
import TextArea from '../../shared/components/TextArea';
import ToggleSwitch from '../../shared/components/ToggleSwitch';
import CustomInput from '../../shared/components/CustomInput';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../store/actions/toastAction';
import {bookFormatOptions} from '../../constants';
import ImagePicker from '../../shared/image-picker/ImagePicker';
import TypeAhead from '../../shared/components/TypeAhead';

const BookForm = (props) => {
    const defaultImage = 'images/book-avatar.png';
    const [image, setImage] = useState(defaultImage);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [isDeleteImage, setIsDeleteImage] = useState(false);
    const {initialValues} = props;
    const [genres] = useState(initialValues ? initialValues.selectedGenres : []);
    const [tags] = useState(initialValues ? initialValues.selectedTags : []);
    const [authors] = useState(initialValues ? initialValues.selectedAuthors : []);
    const [file, setFile] = useState(null);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isValidAuthor, setIsValidAuthor] = useState(false);
    const [isValidGenre, setIsValidGenre] = useState(false);
    const [items, setItems] = useState(initialValues ? initialValues.items : [{}]);
    const bookId = props.initialValues ? props.initialValues.id : null;
    useEffect(() => {
        if (initialValues && initialValues.is_featured) {
            setIsFeatured(initialValues.is_featured ? initialValues.is_featured : false);
        }
        if (initialValues) {
            props.change('tags', tags);
            props.change('genres', genres);
            props.change('authors', authors);
            if (initialValues.image) {
                setImage('uploads/books/' + initialValues.image);
                setIsDefaultImage(false);
            }
        } else {
            props.initialize({items: [{}]});
        }

    }, []);
    const onSaveBook = (formValues) => {
        delete formValues.file_name;
        formValues.file = file;
        props.onSaveBook(formValues);
    };
    const onSaveBookItems = (formValues) => {
        apiConfig.post(`books/${+initialValues.id}/items`, {items: formValues.items})
            .then((response) => {
                props.change('items', [...response.data.items]);
                props.addToast({text: 'Item saved successfully.'})
            })
            .catch(({response}) => props.addToast({text: response.data.message, type: 'error'}));
    };
    const onFileChange = (event) => {
        props.change('file_name', 'file_name');
        setFile(event.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        }
    };
    const onRemovePhoto = () => {
        props.change('file_name', 'file_name');
        setFile(null);
        setImage(defaultImage);
        setIsDefaultImage(true);
        if (bookId && !isDeleteImage) {
            setIsDeleteImage(true);
            apiConfig.post(`books/${bookId}/remove-image`)
                .then(response => addToast({text: response.data.message}))
                .catch(({response}) => addToast({text: response.data.message}))
        }
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
    const imagePickerOptions = {image, isDefaultImage, onRemovePhoto, onFileChange};
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
                        <Field name="isbn" label="ISBN No" required groupText="id-card" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <TypeAhead
                            id="author"
                            label="Author"
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
            <Col xs={4} className="book-logo">
                <h5>Book Logo</h5>
                <hr/>
                <div className="mt-5">
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImagePicker {...imagePickerOptions}/>
                </div>
            </Col>
            <Col xs={12} className="mt-2">
                <h5>Additional Details</h5>
                <hr/>
                <Row>
                    <Col xs={12}>
                        <Field name="description" cols={90} rows={3} label="Description" component={TextArea}/>
                    </Col>
                </Row>
            </Col>
            {initialValues ?
                <Fragment>
                    <Col xs={12}>
                        <SaveAction onSave={props.handleSubmit(onSaveBook)} {...props}/>
                    </Col>
                </Fragment> : null
            }
            <Col xs={12} className="mt-3">
                <h5>Book Item Details</h5>
                <FieldArray name="items" component={renderBookItems}
                            bookLanguages={props.bookLanguages}
                            publishers={props.publishers}
                            change={props.change} setItems={setItems}
                            items={items}/>
            </Col>
            {!initialValues ?
                <Fragment>
                    <Col xs={12}>
                        <SaveAction onSave={props.handleSubmit(onSaveBook)} {...props}/>
                    </Col>
                </Fragment> : null
            }
            {initialValues ?
                <Fragment>
                    <Col xs={12}>
                        <SaveAction onSave={props.handleSubmit(onSaveBookItems)} {...props}/>
                    </Col>
                </Fragment> : null
            }
        </Row>
    );
};

const renderBookItems = ({fields, meta: {error, submitFailed}, change, items, setItems, bookLanguages, publishers}) => {
    const validateArray = [];
    fields.forEach(field => validateArray.push(false));
    const [isValidLanguage] = useState(validateArray);
    const onAddSubFields = () => {
        setItems([...items, {id: 1}]);
        return fields.push({});
    };
    const onRemoveSubFields = (index) => {
        return fields.remove(index);
    };
    const prepareSelectedItem = (index, itemArray, field) => {
        switch (field) {
            case'format':
                return itemArray.filter(status => status.id === items[index].format);
            case'language':
                return itemArray.filter(status => status.id === items[index].language_id);
            case'publisher':
                return itemArray.filter(status => status.id === items[index].publisher_id);
            default:
                return [];
        }
    };
    return (
        <div>
            <Table responsive size="md">
                <thead>
                <tr>
                    <th className="book-form__item-header">Edition</th>
                    <th>Format</th>
                    <th className="book-form__item-header">Price</th>
                    <th className="book-form__item-header">Language</th>
                    <th>Publisher</th>
                    <th className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {fields.map((item, index) => {
                        const onSelectBookFormat = (option) => {
                            if (option.length > 0) {
                                change(`${item}.format`, option[0].id);
                            } else {
                                change(`${item}.format`, null);
                            }
                        };
                        const onSelectPublisher = (option) => {
                            if (option.length > 0) {
                                change(`${item}.publisher_id`, option[0].id);
                            } else {
                                change(`${item}.publisher_id`, null);
                            }
                        };
                        const onSelectBookLanguage = (option) => {
                            if (option.length > 0) {
                                isValidLanguage[index] = false;
                                change(`${item}.language_id`, option[0].id);
                            } else {
                                isValidLanguage[index] = true;
                                change(`${item}.language_id`, null);
                            }
                        };
                        return (
                            <tr key={index}>
                                <td style={{width: '300px'}}>
                                    <Field name={`${item}.edition`} type="text" placeholder="Edition"
                                           groupText="file-text" component={CustomInput}/>
                                </td>
                                <td style={{width: '300px'}}>
                                    <TypeAhead
                                        id="format"
                                        options={bookFormatOptions}
                                        placeholder="Select Format"
                                        onChange={onSelectBookFormat}
                                        groupText="wpforms"
                                        defaultSelected={prepareSelectedItem(index, bookFormatOptions, 'format')}
                                    />
                                    <Field name={`${item}.format`} type="hidden" component={InputGroup}/>
                                </td>
                                <td style={{width: '300px'}}>
                                    <Field name={`${item}.price`} min="1" type="number" placeholder="Price"
                                           groupText="money" component={CustomInput}/>
                                </td>
                                <td style={{width: '300px'}}>
                                    <TypeAhead
                                        id="language"
                                        labelText="Language"
                                        required
                                        options={bookLanguages}
                                        placeholder="Select Language"
                                        onChange={onSelectBookLanguage}
                                        groupText="language"
                                        defaultSelected={prepareSelectedItem(index, bookLanguages, 'language')}
                                        isInvalid={isValidLanguage[index]}
                                        dropUp={true}
                                    />
                                    <Field name={`${item}.language_id`} type="hidden" component={InputGroup}/>
                                </td>
                                <td>
                                    <TypeAhead
                                        id="publisher"
                                        options={publishers}
                                        placeholder="Select Publisher"
                                        onChange={onSelectPublisher}
                                        groupText="user-circle-o"
                                        defaultSelected={prepareSelectedItem(index, publishers, 'publisher')}
                                        dropUp={true}
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
