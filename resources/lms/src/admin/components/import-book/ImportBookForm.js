import React, {useState, useEffect, createRef} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Col, Row, Button, Table} from 'reactstrap';
import importBookValidate from './importBookValidate';
import importBookValidateWarning from './importBookValidateWarning';
import '../books/Books.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import TextArea from '../../../shared/components/TextArea';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import CustomInput from '../../../shared/components/CustomInput';
import {addToast} from '../../../store/action/toastAction';
import {bookFormatOptions} from '../../constants';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import {publicImagePath} from '../../../appConstant';
import SelectCreatable from "../../../shared/components/SelectCreatable";
import {fetchSettings} from "../../store/actions/settingAction";
import {mapCurrencyCode} from "../../../shared/sharedMethod";
import {fetchImportBook} from "../../store/actions/importBookAction";
import {prepareCreatableObject} from "../../shared/prepareArray";
import {prepareImportedBookObject} from "../../shared/prepareArray";

const ImportBookForm = (props) => {
    const {
        change, currency, authors, tags, genres, initialValues,
        fetchImportBook, bookLanguages, publishers, fetchSettings
    } = props;
    const [image, setImage] = useState(publicImagePath.BOOK_AVATAR);
    const [isDefaultImage, setIsDefaultImage] = useState(false);
    const [isFeatured, setIsFeatured] = useState(!!(initialValues && initialValues.is_featured));
    const [items, setItems] = useState([{}]);
    const inputRef = createRef();
    const [file, setFile] = useState(null);
    const [isVisibleWarn, setIsVisibleWarn] = useState(true);
    useEffect(() => {
        fetchSettings();
        inputRef.current.focus();
    }, []);

    const onFocusLostISBN = (event) => {
        if (event.target.value) {
            fetchImportBook(event.target.value);
        }
    };

    const onImportBook = (formValues) => {
        formValues.file = file;
        props.onImportBook(formValues);
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
    const cover = initialValues && initialValues.image_url
        ? initialValues.image_url : image;
    const defImage = initialValues && initialValues.image_url
        ? isDefaultImage : true;
    const imagePickerOptions = {
        image: cover,
        buttonName: 'Cover',
        isDefaultImage: defImage,
        onRemovePhoto,
        onFileChange
    };
    const onChangeAuthor = (options) => {
        if (options.length > 0) {
            let dummyData = [];
            initialValues.new_authors.forEach(item => {
                dummyData = options.filter(author => author.value === item.value);
            });
            dummyData.length > 0 ? setIsVisibleWarn(true) : setIsVisibleWarn(false);
        }
    };
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
                        <Field name="isbn" label="ISBN No" placeholder="Type ISBN To Search A Book... " required
                               inputRef={inputRef} onBlur={(e) => onFocusLostISBN(e)} groupText="id-card"
                               onClick={() => onFocusLostISBN} appendGroupText="search" isAppendIcon
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="authors" label="Authors" required isMulti={true} onChange={onChangeAuthor}
                               isVisibleWarning={isVisibleWarn} options={authors} placeholder="Select Author"
                               groupText="user-circle-o" component={SelectCreatable}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="genres" label="Genres" required isMulti={true} options={genres}
                               placeholder="Select Genres" groupText="list-alt" component={SelectCreatable}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="name" label="Name" required groupText="book" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="tags" label="Tags" isMulti={true} options={tags} placeholder="Select Tag"
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
                <FieldArray name="items" component={renderBookItems} bookLanguages={bookLanguages}
                            publishers={publishers} currency={currency} setItems={setItems} items={items}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onImportBook)} {...props}/>
            </Col>
        </Row>
    );
};

const renderBookItems = ({ fields, meta: { error, submitFailed }, items, setItems, bookLanguages, publishers, currency }) => {
    const [isVisibleWarning, setIsVisibleWarning] = useState(true);
    const onAddSubFields = () => {
        setItems([...items, { id: 1 }]);
        return fields.push({});
    };
    const onRemoveSubFields = (index) => {
        return fields.remove(index);
    };
    const onChangePublisher = () => {
        setIsVisibleWarning(false);
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
                                    <Field name={`${item}.format`} required
                                           options={prepareCreatableObject(bookFormatOptions)} placeholder="Select Format"
                                           groupText="wpforms" component={SelectCreatable} isMini={true}
                                           menuPlacement="top"/>
                                </td>
                                <td>
                                    <Field name={`${item}.price`} min="1" type="number" placeholder="Price"
                                           groupText={mapCurrencyCode(currency)} component={CustomInput}/>
                                </td>
                                <td className="book-form__language">
                                    <Field name={`${item}.language`} required options={bookLanguages}
                                           placeholder="Select Language" groupText="language" component={SelectCreatable}
                                           menuPlacement="top"/>
                                </td>
                                <td className="book-form__publisher">
                                    <Field name={`${item}.publisher`} options={publishers}
                                           isVisibleWarning={isVisibleWarning} onChange={onChangePublisher}
                                           placeholder="Select Publisher" groupText="user-circle-o"
                                           component={SelectCreatable} menuPlacement="top"/>
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
const prepareData = (book, ownProps) => {
    const { isbn, authors, publishers, genres, tags, languages, name, is_featured, image_url, published_on, description, url } = book;
    let authorArray = [], genreArray = [], publisherArray = [], tagArray = [], languageArray = [];
    let itemArray = [];
    let newAuthors = [];
    if (authors && authors.length > 0) {
        authorArray = prepareImportedBookObject(authors);
        authorArray.forEach((author) => {
            const existAuthor = ownProps.authors.find(auth => +auth.value === +author.value);
            if (existAuthor) {
                author.label = existAuthor.label;
            } else {
                ownProps.authors.push(author);
                newAuthors.push(author);
            }
        });
    }
    if (genres && genres.length > 0) {
        genreArray = prepareImportedBookObject(genres);
    }
    if (publishers && publishers.length > 0) {
        publisherArray = prepareImportedBookObject(publishers);
    }
    if (tags && tags.length > 0) {
        tagArray = prepareImportedBookObject(tags);
    }
    // if (languages && languages.length > 0) {
    //     languageArray = prepareImportedBookObject(languages);
    // }
    // if (publisherArray.length > 0) {
    //     publisherArray.forEach(publisher => itemArray.push({ publisher }));
    // }
    // if (languageArray.length > 0) {
    //     languageArray.forEach(language => itemArray.push({ language }));
    // }
    // if (publisherArray.length > 0 && languageArray.length > 0) {
    //     itemArray = [];
    //     if (publisherArray.length > languageArray.length) {
    //         publisherArray.forEach((publisher, index) => itemArray.push({
    //             publisher,
    //             language: languageArray[index] ? languageArray[index] : null
    //         }));
    //     } else {
    //         languageArray.forEach((language, index) => itemArray.push({
    //             language,
    //             publisher: publisherArray[index] ? publisherArray[index] : null
    //         }));
    //     }
    // }
    itemArray = itemArray.length > 0 ? itemArray : [{}];
    return {
        items: [...itemArray], ...{
            isbn,
            name,
            authors: authorArray,
            new_authors: newAuthors,
            genres: genreArray,
            publishers: publisherArray,
            tags: tagArray,
            languages: languageArray,
            is_featured,
            published_on,
            image_url,
            description,
            url
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    return { currency: state.currency, initialValues: prepareData(state.importBook, ownProps) };
};

const form = reduxForm({
    form: 'importBookForm',
    validate: importBookValidate,
    warn: importBookValidateWarning,
    enableReinitialize: true
})(ImportBookForm);

export default connect(mapStateToProps, { addToast, fetchSettings, fetchImportBook })(form);
