import React, {useState, useEffect, createRef} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Col, Row, Button, Table} from 'reactstrap';
import bookValidate from './bookValidate';
import bookValidateWarning from './bookValidateWarning';
import './Books.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import TextArea from '../../../shared/components/TextArea';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import CustomInput from '../../../shared/components/CustomInput';
import {addToast} from '../../../store/action/toastAction';
import {bookFormatOptions} from '../../constants';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import {publicImagePath} from '../../../appConstant';
import Select from "../../../shared/components/Select";
import {fetchSettings} from "../../store/actions/settingAction";
import {mapCurrencyCode} from "../../../shared/sharedMethod";
import SelectCreatable from "../../../shared/components/SelectCreatable";
import _ from 'lodash';

const BookForm = (props) => {
    const [image, setImage] = useState(publicImagePath.BOOK_AVATAR);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const { initialValues, change, currency, authors, tags, genres } = props;
    const [isFeatured, setIsFeatured] = useState(false);
    const [items, setItems] = useState(initialValues ? initialValues.items : [{}]);
    const inputRef = createRef();
    const [file, setFile] = useState(null);
    const [isVisibleAuthorWarn, setIsVisibleAuthorWarn] = useState(true);
    const [isVisibleGenreWarn, setIsVisibleGenreWarn] = useState(true);
    const [isVisibleTagWarn, setIsVisibleTagWarn] = useState(true);

    useEffect(() => {
        props.fetchSettings();
        prepareInitialValues();
    }, []);

    const prepareInitialValues = () => {
        props.initialize({ items: [{}] });
        inputRef.current.focus();
    };
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
    const onChecked = () => {
        setIsFeatured(!isFeatured);
    };

    const onChangeAuthor = (options) => {
        if (options && options.length > 0) {
            const filteredData = _.differenceWith(options, authors, _.isEqual);
            if (filteredData.length > 0) {
                change('new_authors', filteredData);
                setIsVisibleAuthorWarn(true);
            } else {
                change('new_authors', null);
                setIsVisibleAuthorWarn(false);
            }
        }
    };

    const onChangeGenres = (options) => {
        if (options && options.length > 0) {
            const filteredData = _.differenceWith(options, genres, _.isEqual);
            if (filteredData.length > 0) {
                change('new_genres', filteredData);
                setIsVisibleGenreWarn(true);
            } else {
                change('new_genres', null);
                setIsVisibleGenreWarn(false);
            }
        }
    };
    const onChangeTags = (options) => {
        if (options && options.length > 0) {
            const filteredData = _.differenceWith(options, tags, _.isEqual);
            if (filteredData.length > 0) {
                change('new_tags', filteredData);
                setIsVisibleTagWarn(true);
            } else {
                change('new_tags', null);
                setIsVisibleTagWarn(false);
            }
        }
    };
    const imagePickerOptions = { image, buttonName: 'Cover', isDefaultImage, onRemovePhoto, onFileChange };
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
                <hr style={{ marginTop: '0px' }}/>
                <Row>
                    <Col xs={6}>
                        <Field name="isbn" label="ISBN No" required inputRef={inputRef} groupText="id-card"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="authors" label="Authors" required isMulti={true} onChange={onChangeAuthor}
                               isVisibleWarning={isVisibleAuthorWarn} options={authors} placeholder="Select Author"
                               groupText="user-circle-o" component={SelectCreatable}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="genres" label="Genres" required isMulti={true} onChange={onChangeGenres}
                               isVisibleWarning={isVisibleGenreWarn} options={genres} placeholder="Select Genres"
                               groupText="list-alt" component={SelectCreatable}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="name" label="Name" required groupText="book" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="tags" label="Tags" isMulti={true} onChange={onChangeTags}
                               isVisibleWarning={isVisibleTagWarn} options={tags} placeholder="Select Tag"
                               groupText="tag" component={SelectCreatable}/>
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
                <FieldArray name="items" component={renderBookItems} bookLanguages={props.bookLanguages}
                            publishers={props.publishers} currency={currency} setItems={setItems} items={items}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBook)} {...props}/>
            </Col>
        </Row>
    );
};

const renderBookItems = ({ fields, meta: { error, submitFailed }, items, setItems, bookLanguages, publishers, currency }) => {
    const onAddSubFields = () => {
        setItems([...items, { id: 1 }]);
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
                                    <Field name={`${item}.edition`} type="text" placeholder="Edition" groupText="file-text"
                                           component={CustomInput}/>
                                </td>
                                <td className="book-form__format">
                                    <Field name={`${item}.format`} required options={bookFormatOptions}
                                           placeholder="Select Format" groupText="wpforms" component={Select} isMini={true}
                                           menuPlacement="top"/>
                                </td>
                                <td>
                                    <Field name={`${item}.price`} min="1" type="number" placeholder="Price"
                                           groupText={mapCurrencyCode(currency)} component={CustomInput}/>
                                </td>
                                <td className="book-form__language">
                                    <Field name={`${item}.language`} required options={bookLanguages}
                                           placeholder="Select Language" groupText="language" component={Select}
                                           isSearchable={true} menuPlacement="top"/>
                                </td>
                                <td className="book-form__publisher">
                                    <Field name={`${item}.publisher`} options={publishers} placeholder="Select Publisher"
                                           groupText="user-circle-o" component={Select} isSearchable={true}
                                           menuPlacement="top"/>
                                </td>
                                <td className="text-center">
                                    <Button size="sm" color="danger" style={{ marginTop: '10px' }}
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
const mapStateToProps = (state) => {
    return { currency: state.currency };
};

const form = reduxForm({ form: 'bookForm', validate: bookValidate, warn: bookValidateWarning })(BookForm);
export default connect(mapStateToProps, { addToast, fetchSettings })(form);
