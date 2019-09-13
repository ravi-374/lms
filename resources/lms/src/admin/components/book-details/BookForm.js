import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import bookFormValidate from './bookFormValidate';
import '../books/Books.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import TextArea from '../../../shared/components/TextArea';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import {addToast} from '../../../store/action/toastAction';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import Select from "../../../shared/components/Select";

const BookForm = (props) => {
    const [image, setImage] = useState(publicImagePath.BOOK_AVATAR);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const { initialValues, change, authors, tags, genres } = props;
    const [file, setFile] = useState(null);
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        if (initialValues && initialValues.is_featured) {
            setIsFeatured(initialValues.is_featured ? initialValues.is_featured : false);
        }
        if (initialValues) {
            if (initialValues.image) {
                change('file_name', true);
                setImage(publicImagePathURL.BOOK_AVATAR_URL + initialValues.image);
                setIsDefaultImage(false);
            }
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

    const onChecked = () => {
        setIsFeatured(!isFeatured);
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
                    <Col xs={12}>
                        <Field name="name" label="Name" required groupText="book" component={InputGroup}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="authors" label="Authors" required isMulti={true} options={authors}
                               placeholder="Select Author" groupText="user-circle-o" isSearchable={true}
                               component={Select}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="isbn" label="ISBN No" required groupText="id-card" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="genres" label="Genres" required isMulti={true} options={genres}
                               placeholder="Select Genres" groupText="list-alt" isSearchable={true} component={Select}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="tags" label="Tags" isMulti={true} options={tags} placeholder="Select Tag"
                               groupText="tag" isSearchable={true} component={Select}/>
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

const bookForm = reduxForm({ form: 'bookForm', validate: bookFormValidate })(BookForm);
export default connect(null, { addToast })(bookForm);
