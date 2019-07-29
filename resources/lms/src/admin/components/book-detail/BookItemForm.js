import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Col, Row, Button, Table} from 'reactstrap';
import bookItemValidate from './bookItemValidate';
import './BookDetail.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import CustomInput from '../../../shared/components/CustomInput';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {bookFormatOptions, bookStatusOptions} from '../../constants';
import TypeAhead from '../../../shared/components/TypeAhead';

const BookItemForm = (props) => {
    const {bookLanguages, bookId, publishers, change, addToast, bookItems, goBack} = props;
    const [items, setItems] = useState(bookItems);
    useEffect(() => {
        props.initialize({items: [...bookItems]});
    }, []);

    const onSaveBookItems = (formValues) => {
        apiConfig.post(`books/${+bookId}/items`, {items: formValues.items})
            .then((response) => {
                change('items', [...response.data.items]);
                addToast({text: 'Item saved successfully.'})
            })
            .catch(({response}) => addToast({text: response.data.message, type: 'error'}));
    };
    return (
        <Row className="animated fadeIn book-form">
            <Col xs={12} className="mt-5">
                <h5>Book Items</h5>
                <FieldArray name="items" component={renderBookItems}
                            bookLanguages={bookLanguages}
                            publishers={publishers}
                            change={change} setItems={setItems}
                            items={items}/>
            </Col>
            <Col xs={12}>
                <SaveAction onCancel={goBack} onSave={props.handleSubmit(onSaveBookItems)} {...props}/>
            </Col>
        </Row>
    );
};

const renderBookItems = ({fields, meta: {error, submitFailed}, change, items, setItems, bookLanguages, publishers}) => {
    const validateArray = [];
    fields.forEach(field => validateArray.push(false));
    const [isValidLanguage] = useState(validateArray);
    const onAddSubFields = () => {
        setItems([...items, {id: 1, book_status: 1}]);
        return fields.push({book_status: 1});
    };
    const onRemoveSubFields = (index) => {
        return fields.remove(index);
    };
    const prepareSelectedItem = (index, itemArray, field) => {
        switch (field) {
            case'format':
                return itemArray.filter(item => item.id === items[index].format);
            case'language':
                return itemArray.filter(item => item.id === items[index].language_id);
            case'publisher':
                return itemArray.filter(item => item.id === items[index].publisher_id);
            case'status':
                return itemArray.filter(item => item.id === items[index].book_item_status);
            default:
                return [];
        }
    };
    return (
        <div className="table-wide">
            <Table responsive size="md" className="table-multi-item-responsive table-multi-item-responsive--wide">
                <thead>
                <tr>
                    <th className="book-detail-form__item-header text-nowrap">Book Code</th>
                    <th className="book-detail-form__item-header">Edition</th>
                    <th>Format</th>
                    <th>Location</th>
                    <th className="book-detail-form__item-header">Price</th>
                    <th className="book-detail-form__item-header">Language</th>
                    <th>Publisher</th>
                    <th>Status</th>
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
                                <td>
                                    <Field name={`${item}.book_code`} type="text"
                                           placeholder="Book Code"
                                           groupText="file-text" component={CustomInput}/>
                                </td>
                                <td>
                                    <Field name={`${item}.edition`} type="text" placeholder="Edition"
                                           groupText="file-text" component={CustomInput}/>
                                </td>
                                <td>
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
                                <td>
                                    <Field name={`${item}.location`} placeholder="Location" groupText="map-pin"
                                           component={CustomInput}/>
                                </td>
                                <td>
                                    <Field name={`${item}.price`} min="1" type="number" placeholder="Price"
                                           groupText="money" component={CustomInput}/>
                                </td>
                                <td>
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
                                <td>
                                    <TypeAhead
                                        id="status"
                                        options={bookStatusOptions}
                                        placeholder="Select Status"
                                        groupText="info"
                                        defaultSelected={prepareSelectedItem(index, bookStatusOptions, 'status')}
                                        disabled={true}
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
            <button type="button" className="btn btn-outline-primary book-detail-form__add-item" onClick={() => onAddSubFields()}>Add Item
            </button>
            {submitFailed && error && <div className="text-danger mt-3">{error}</div>}
        </div>
    )
};

const bookItemForm = reduxForm({form: 'bookItemForm', validate: bookItemValidate})(BookItemForm);
export default connect(null, {addToast})(bookItemForm);
