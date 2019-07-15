import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Col, Row, Button, Table} from 'reactstrap';
import bookValidate from './bookValidate';
import './Books.scss';
import SaveAction from '../../shared/action-buttons/SaveAction';
import InputGroup from '../../shared/components/InputGroup';
import TextArea from "../../shared/components/TextArea";
import CheckBox from "../../shared/components/CheckBox";
import MultiSelect from '../../shared/multi-select/MultiSelect';
import CustomInput from "../../shared/components/CustomInput";
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../store/actions/toastAction';
import {bookFormatOptions, bookStatusOptions} from '../../constants';
import ImagePicker from '../../shared/image-picker/ImagePicker';

const BookForm = (props) => {
    const [image, setImage] = useState(null);
    const {initialValues} = props;
    const [genres] = useState(initialValues ? initialValues.selectedGenres : []);
    const [tags] = useState(initialValues ? initialValues.selectedTags : []);
    const [authors] = useState(initialValues ? initialValues.selectedAuthors : []);
    const [publisher] = useState(initialValues ? initialValues.publisher : []);
    const [bookLanguage] = useState(initialValues ? initialValues.bookLanguage : []);
    const [file, setFile] = useState(null);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState(initialValues ? initialValues.items : [{format: 1, is_available: 1}]);
    useEffect(() => {
        if (initialValues && initialValues.is_featured) {
            setIsFeatured(initialValues.is_featured ? initialValues.is_featured : false);
        }
        if (initialValues) {
            props.change('tags', tags);
            props.change('genres', genres);
            props.change('authors', authors);
            props.change('publisher_id', initialValues.publisher_id);
            props.change('language_id', initialValues.language_id);
            if (initialValues.image) {
                setImage('/images/books/' + initialValues.image);
            }
        } else {
            props.initialize({items: [{format: 1, is_available: 1}]});
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
    const onSelectGenres = (options) => {
        setIsLoading(false);
        props.change('genres', options);
    };
    const onSelectAuthor = (options) => {
        props.change('authors', options);
    };
    const onSelectPublisher = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            props.change('publisher_id', option[0].id);
        } else {
            props.change('publisher_id', null);
        }
    };
    const onSelectBookLanguage = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            props.change('language_id', option[0].id);
        } else {
            props.change('language_id', null);
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
    return (
        <Row className="animated fadeIn book-form m-3">
            <Col xs={4} className="book-logo">
                <h5>Book Image</h5>
                <hr/>
                <div>
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImagePicker onFileChange={onFileChange} image={image}/>
                </div>
            </Col>
            <Col xs={8} className="primary-detail">
                <div className="d-flex">
                    <h5>Primary Details</h5>
                    <div className="ml-5 d-flex">
                        <div>
                            <Field name="is_featured" checked={isFeatured} label="Is Featured" onChange={onChecked}
                                   component={CheckBox}/>
                        </div>
                    </div>
                </div>
                <hr style={{marginTop: '0px'}}/>
                <Row>
                    <Col xs={6}>
                        <Field name="isbn" label="ISBN No" required groupText="id-card" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <MultiSelect
                            label="Genres"
                            placeholder="Select Genres"
                            groupText="list-alt"
                            options={props.genres}
                            multiple
                            required
                            onSelect={onSelectGenres}
                            selctedItems={genres}
                        />
                        <Field name="genres" type="hidden" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <MultiSelect
                            label="Author"
                            placeholder="Select Author"
                            groupText="user-circle-o"
                            options={props.authors}
                            required
                            multiple
                            onSelect={onSelectAuthor}
                            selctedItems={authors}
                        />
                        <Field name="authors" type="hidden" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <MultiSelect
                            label="Publisher"
                            placeholder="Select Publisher"
                            groupText="user-circle-o"
                            options={props.publishers}
                            required
                            onSelect={onSelectPublisher}
                            selctedItems={publisher}
                        />
                        <Field name="publisher_id" type="hidden" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="name" label="Name" required groupText="book" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <MultiSelect
                            label="Language"
                            placeholder="Select Language"
                            groupText="language"
                            options={props.bookLanguages}
                            required
                            onSelect={onSelectBookLanguage}
                            selctedItems={bookLanguage}
                        />
                        <Field name="language_id" type="hidden" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={12} className="mt-2">
                <h5>Additional Details</h5>
                <hr/>
                <Row>
                    <Col xs={6}>
                        <MultiSelect
                            label="Tags"
                            placeholder="Select Tag"
                            groupText="tag"
                            options={props.tags}
                            multiple
                            required
                            onSelect={onSelectTag}
                            selctedItems={tags}
                        />
                        <Field name="tags" type="hidden" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="url" label="URL" groupText="link" component={InputGroup}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="description" required cols={90} rows={3} label="Description" component={TextArea}/>
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
                <FieldArray name="items" component={renderBookItems} change={props.change} setItems={setItems}
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

const renderBookItems = ({fields, meta: {error, submitFailed}, change, items, setItems}) => {
    const onAddSubFields = () => {
        setItems([...items, {id: 1, format: 1, is_available: 1}]);
        return fields.push({format: 1, is_available: 1});
    };
    const onRemoveSubFields = (index) => {
        return fields.remove(index);
    };
    const prepareItem = (index, itemArray, isStatus) => {
        const field = isStatus ? items[index].is_available : items[index].format;
        const currentItem = itemArray.find(status => status.id === field);
        return [{id: currentItem.id, name: currentItem.name}]
    };
    return (
        <div>
            <Table responsive size="md">
                <thead>
                <tr>
                    <th>Edition</th>
                    <th>Format</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {fields.map((item, index) => {
                        const onSelectBookStatus = (option) => {
                            if (option.length > 0 && option[0].id !== 0) {
                                change(`${item}.is_available`, option[0].id);
                            } else {
                                change(`${item}.is_available`, null);
                            }
                        };
                        const onSelectBookFormat = (option) => {
                            if (option.length > 0 && option[0].id !== 0) {
                                change(`${item}.format`, option[0].id);
                            } else {
                                change(`${item}.format`, null);
                            }
                        };
                        return (
                            <tr key={index}>
                                <td>
                                    <Field name={`${item}.edition`} type="text" placeholder="Edition"
                                           groupText="file-text" component={CustomInput}/>
                                </td>
                                <td>
                                    <MultiSelect
                                        placeholder="Select Format"
                                        groupText="wpforms"
                                        options={bookFormatOptions}
                                        onSelect={onSelectBookFormat}
                                        selctedItems={prepareItem(index, bookFormatOptions)}
                                    />
                                    <Field name={`${item}.format`} type="hidden" component={InputGroup}/>
                                </td>
                                <td>
                                    <Field name={`${item}.location`} type="text" placeholder="Location"
                                           groupText="map-marker" component={CustomInput}/>
                                </td>
                                <td>
                                    <Field name={`${item}.price`} min="1" type="number" placeholder="Price"
                                           groupText="money" component={CustomInput}/>
                                </td>
                                <td>
                                    <MultiSelect
                                        placeholder="Select status"
                                        groupText="info-circle"
                                        options={bookStatusOptions}
                                        onSelect={onSelectBookStatus}
                                        selctedItems={prepareItem(index, bookStatusOptions)}
                                    />
                                    <Field name={`${item}.is_available`} type="hidden" component={InputGroup}/>
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
