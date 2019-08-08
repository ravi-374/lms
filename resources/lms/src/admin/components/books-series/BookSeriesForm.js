import React, {useState, useEffect} from 'react';
import {Col, Row, Button, Table} from 'reactstrap';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import bookSeriesValidate from './bookSeriesValidate';
import DeleteBookSeriesItem from './DeleteBookSeriesItem';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import CustomInput from '../../../shared/components/CustomInput';
import Select from "../../../shared/components/Select";
import {toggleModal} from "../../../store/action/modalAction";
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';

const getItems = seriesItems =>
    seriesItems.map((item, key) => ({
        id: `item-${key}`,
        sequence: item.sequence,
        book_id: item.book_id.id
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

const filteredBooks = (books, seriesItems) => {
    if (!seriesItems) {
        return books;
    }
    return books.filter(o => !seriesItems.find(o2 => {
        if (o2.book_id && o2.book_id.id) {
            return o.id === +o2.book_id.id
        }
    }));
};
const BookSeriesForm = props => {
    const { initialValues, books, change, seriesItems, toggleModal } = props;
    const [items, setItems] = useState(getItems(initialValues ? initialValues.series_items : [{
        id: 1,
        sequence: 1,
        book_id: { id: null }
    }]));
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const item = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        const seriesItem = reorder(
            seriesItems,
            result.source.index,
            result.destination.index
        );
        let array = [];
        seriesItem.forEach((item, index) => {
            seriesItems.forEach((i) => {
                if (item.sequence === +i.sequence) {
                    array.push({ sequence: index + 1, book_id: i.book_id })
                }
            });
        });
        setItems(item);
        props.change('series_items', array);
    };
    useEffect(() => {
        if (!initialValues) {
            props.initialize({ series_items: [{ sequence: 1 }] });
        }
    }, []);
    const prepareFormData = (formValues) => {
        formValues.series_items.forEach((seriesItem, index) => {
            seriesItem.sequence = index + 1, seriesItem.book_id = seriesItem.book_id.id
        });
        return formValues;
    };
    const onSaveBookSeries = formValues => {
        props.onSaveBookSeries(prepareFormData(formValues));
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="title" label="Title" required autoFocus={!!initialValues} groupText="television"
                       component={InputGroup}/>
            </Col>
            <Col xs={12} className="mt-3">
                <h5>Book Series Item Details</h5>
                <FieldArray name="series_items" component={renderBookSeriesItems}
                            books={filteredBooks(books, seriesItems, initialValues)} change={change}
                            onDragEnd={onDragEnd} setItems={setItems} items={items} toggleModal={toggleModal}
                            seriesItems={seriesItems}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookSeries)} {...props}/>
            </Col>
        </Row>
    );
};
const renderBookSeriesItems = ({ fields, meta: { error, submitFailed }, onDragEnd, change, items, setItems, books, toggleModal, seriesItems }) => {
    const [index, setIndex] = useState(null);
    const onAddSubFields = () => {
        setItems([...items, { id: `item-${items.length + 1}`, sequence: items.length + 1, book_id: null }]);
        return fields.push({ sequence: items.length + 1, book_id: null });
    };
    const onRemoveSubFields = (index) => {
        setIndex(index);
        toggleModal();
    };
    const cardModalProps = { fields, seriesItems, items, setItems, index, setIndex, toggleModal };
    if (fields.length === 0) {
        return <EmptyComponent isShort={true} title="No books series items yet..."/>
    }
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
                            <tbody ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}
                                   {...provided.droppableProps}
                            >
                            {fields.map((item, index) => {
                                return (
                                    <Draggable key={items[index].id} draggableId={items[index].id} index={index}>
                                        {(provided, snapshot) => (
                                            <tr ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps} style={getItemStyle(
                                                provided.draggableProps.style,
                                                snapshot.isDragging
                                            )}>
                                                <td style={{ width: '720px' }}>
                                                    <Field name={`${item}.sequence`} readOnly={true}
                                                           placeholder="Sequence" groupText="file-text"
                                                           component={CustomInput}/>
                                                </td>
                                                <td style={{ width: '720px' }}>
                                                    <Field name={`${item}.book_id`} required options={books}
                                                           placeholder="Select Book" groupText="book" component={Select}
                                                           isSearchable={true}/>
                                                </td>
                                                <td className="text-center">
                                                    <Button size="sm" color="danger" style={{ marginTop: '10px' }}
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
                            {index !== null ? <DeleteBookSeriesItem {...cardModalProps}/> : null}
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

let bookSeriesForm = reduxForm({ form: 'bookSeriesForm', validate: bookSeriesValidate })(BookSeriesForm);
const selector = formValueSelector('bookSeriesForm');
bookSeriesForm = connect(
    state => {
        const seriesItems = selector(state, 'series_items');
        return {
            seriesItems
        }
    },
    { toggleModal })(bookSeriesForm);

export default bookSeriesForm;
