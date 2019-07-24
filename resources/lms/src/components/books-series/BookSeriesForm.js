import React, {useState, useEffect} from 'react';
import {Col, Row, Button, Table} from 'reactstrap';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import bookSeriesValidate from './bookSeriesValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import CustomInput from '../../shared/components/CustomInput';
import TypeAhead from '../../shared/components/TypeAhead';

const getItems = seriesItems =>
    seriesItems.map((item, key) => ({
        id: `item-${key}`,
        sequence: item.sequence,
        book_id: item.book_id
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const getItemStyle = (draggableStyle) => ({
    userSelect: 'none',
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({});

const BookSeriesForm = props => {
    const {initialValues, books, change} = props;
    const [items, setItems] = useState(getItems(initialValues ? initialValues.series_items : [{
        id: 1,
        sequence: 1,
        book_id: null
    }]));
    const [selectedBookIds] = useState(initialValues ? initialValues.series_items.map(({book_id}) => book_id) : []);
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const item = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(item);
    };

    useEffect(() => {
        if (!initialValues) {
            props.initialize({series_items: [{sequence: 1}]});
        }
    }, []);
    const prepareFormData = (formValues) => {
        items.forEach((item, index) => {
                formValues.series_items[index].sequence = (index + 1),
                    formValues.series_items[index].book_id = item.book_id
            }
        );
        return formValues;
    };
    const onSaveBookSeries = formValues => {
        props.onSaveBookSeries(prepareFormData(formValues));
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="title" label="Title" required groupText="television" component={InputGroup}/>
            </Col>
            <Col xs={12} className="mt-3">
                <h5>Book Item Details</h5>
                <FieldArray name="series_items" component={renderBookSeriesItems}
                            books={books}
                            change={change}
                            onDragEnd={onDragEnd}
                            setItems={setItems}
                            selectedBookIds={selectedBookIds}
                            items={items}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookSeries)} {...props}/>
            </Col>
        </Row>
    );
};
const renderBookSeriesItems = ({fields, meta: {error, submitFailed}, onDragEnd, change, items, setItems, books, selectedBookIds}) => {
    const validateArray = [];
    fields.forEach(field => validateArray.push(false));
    const [isValidBook] = useState([...validateArray]);
    const onAddSubFields = () => {
        setItems([...items, {id: `item-${items.length + 1}`, sequence: items.length + 1, book_id: null}]);
        return fields.push({sequence: items.length + 1});
    };
    const onRemoveSubFields = (index) => {
        const valueArray = [...items];
        valueArray.splice(index, 1);
        setItems(valueArray);
        return fields.remove(index);
    };
    const prepareSelectedItem = (index, itemArray, field) => {
        switch (field) {
            case'book':
                return itemArray.filter(item => item.id === selectedBookIds[index]);
            default:
                return [];
        }
    };
    return (
        <div>
            <Table responsive size="md">
                <thead>
                <tr>
                    <th>Sequence</th>
                    <th className="book-form__item-header">Book</th>
                    <th className="text-center">Action</th>
                </tr>
                </thead>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <tbody
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                            {fields.map((item, index) => {
                                const onSelectBook = (option) => {
                                    if (option.length > 0) {
                                        isValidBook[index] = false;
                                        change(`${item}.book_id`, option[0].id);
                                        items[index].book_id = option[0].id;
                                    } else {
                                        isValidBook[index] = true;
                                        items[index].book_id = null;
                                        change(`${item}.book_id`, null);
                                    }
                                };
                                return (
                                    <Draggable
                                        key={items[index].id}
                                        draggableId={items[index].id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <tr
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                style={getItemStyle(
                                                    provided.draggableProps.style,
                                                    snapshot.isDragging
                                                )}
                                            >
                                                <td style={{width: '720px'}}>
                                                    <Field name={`${item}.sequence`} readOnly={true}
                                                           placeholder="Sequence"
                                                           groupText="file-text" component={CustomInput}/>
                                                </td>
                                                <td style={{width: '720px'}}>
                                                    <TypeAhead
                                                        id="book"
                                                        labelText="Book"
                                                        required
                                                        options={books}
                                                        placeholder="Select Book"
                                                        onChange={onSelectBook}
                                                        groupText="book"
                                                        defaultSelected={prepareSelectedItem(index, books, 'book')}
                                                        isInvalid={isValidBook[index]}
                                                        dropUp={true}
                                                    />
                                                    <Field name={`${item}.book_id`} type="hidden"
                                                           component={InputGroup}/>
                                                </td>
                                                <td className="text-center">
                                                    <Button size="sm" color="danger" style={{marginTop: '10px'}}
                                                            onClick={() => onRemoveSubFields(index, item)}>
                                                        <i className="cui-trash icon font-md"/>
                                                    </Button>
                                                </td>
                                                {provided.placeholder}
                                            </tr>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                            </tbody>
                        )}
                    </Droppable>
                </DragDropContext>
            </Table>
            <button type="button" className="btn btn-outline-primary" onClick={() => onAddSubFields()}>Add Item
            </button>
            {submitFailed && error && <div className="text-danger mt-3">{error}</div>}
        </div>
    )
};

export default reduxForm({form: 'bookSeriesForm', validate: bookSeriesValidate})(BookSeriesForm);
