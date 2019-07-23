import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import bookFormValidate from './bookFormValidate';
import '../books/Books.scss';
import SaveAction from '../../shared/action-buttons/SaveAction';
import InputGroup from '../../shared/components/InputGroup';
import TextArea from '../../shared/components/TextArea';
import ToggleSwitch from '../../shared/components/ToggleSwitch';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../store/actions/toastAction';
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
        }

    }, []);
    const onSaveBook = (formValues) => {
        delete formValues.file_name;
        formValues.file = file;
        props.onSaveBook(formValues);
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
            <Col xs={4} className="book-logo">
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
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBook)} {...props}/>
            </Col>
        </Row>
    );
};

const bookForm = reduxForm({form: 'bookForm', validate: bookFormValidate})(BookForm);
export default connect(null, {addToast})(bookForm);
