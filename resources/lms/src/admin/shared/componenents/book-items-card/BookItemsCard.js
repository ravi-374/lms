import React, {useState} from 'react';
import {Field} from 'redux-form';
import {Button, Table} from 'reactstrap';
import PropTypes from 'prop-types';
import './BookItemsCard.scss';
import CustomInput from '../../../../shared/components/CustomInput';
import InputFile from '../../../../admin/components/book-items/inputFile';
import {bookFormatOptions} from '../../../constants'
import {prepareCreatableObject} from "../../prepareArray";
import SelectCreatable from "../../../../shared/components/SelectCreatable";
import {getFormattedMessage, getFormattedOptions, mapCurrencyCode} from "../../../../shared/sharedMethod";
import {bookITemCreationWarning, bookCreationWarning} from "../../../../shared/custom-hooks";

const BookItemsCard = (props) => {
    const { fields, meta: { error, submitFailed }, bookLanguages, publishers, currency, change } = props;
    const [items, setItems] = useState([{}]);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);
    const [onChangeLanguage] = bookITemCreationWarning(change);
    const [onChangePublisher] = bookITemCreationWarning(change);
    const [itemIndex, setItemIndex] = useState([]);

    const onAddSubFields = () => {
        setItems([...items, { id: 1 }]);
        return fields.push({});
    };

    const onRemoveSubFields = (index) => {
        return fields.remove(index);
    };

    const onChangeBookFormate = (index, option) => {
        if (option.value === 3) {
            setItemIndex([...itemIndex, index]);
        } else if (itemIndex.includes(index)) {
            setItemIndex(itemIndex.filter(item => item !== index));
        }
    }

    const renderFields = () => {
        return fields.map((item, index) => (
            <tr key={index}>
                <td>
                    <Field name={`${item}.edition`} type="text" placeholder="books.items.input.edition.label"
                           groupText="file-text" component={CustomInput}/>
                </td>
                <td className="book-items-card__format">
                    <Field name={`${item}.format`} required options={prepareCreatableObject(booksFormatOptions)}
                        placeholder="books.items.select.format.placeholder" groupText="wpforms"
                        onChange={(option) => onChangeBookFormate(index, option)}component={SelectCreatable}
                        isMini={true}/>
                </td>
                <td className="p-3">
                    {
                        itemIndex.includes(index) ?
                            <Field name={`${item}.file`} type="file" component={InputFile} /> : null
                    }
                </td>
                <td>
                    {
                        !itemIndex.includes(index) ?
                                <Field name={`${item}.price`} min="1" type="number" placeholder="books.items.input.price.label"
                                    groupText={mapCurrencyCode(currency)} component={CustomInput}/> : null
                    }
                </td>
                <td className="book-items-card__language">
                    <Field name={`${item}.language`} required options={bookLanguages}
                           placeholder="books.items.select.language.placeholder" groupText="language"
                           component={SelectCreatable}
                           onChange={(option) => onChangeLanguage(option, bookLanguages, 'new_language', item)}/>
                </td>
                <td className="book-items-card__publisher">
                    <Field name={`${item}.publisher`} options={publishers}
                           placeholder="books.items.select.publisher.placeholder" groupText="user-circle-o"
                           component={SelectCreatable}
                           onChange={(option) => onChangePublisher(option, publishers, 'new_publisher', item)}/>
                </td>
                <td className="text-center">
                    <Button size="sm" color="danger" className="book-items-card__action-btn"
                            onClick={() => onRemoveSubFields(index, item)}>
                        <i className="cui-trash icon font-md"/>
                    </Button>
                </td>
            </tr>
        ))
    };

    return (
        <div className="book-items-card">
            <Table responsive size="md" className="table-multi-item-responsive">
                <thead>
                <tr>
                    <th className="book-items-card__item-header book-items-card__header-responsive">{getFormattedMessage('books.items.input.edition.label')}</th>
                    <th className="book-items-card__item-header book-items-card__header-responsive">{getFormattedMessage('books.items.select.format.label')}</th>
                    <th className="book-items-card__item-header book-items-card__header-responsive">{getFormattedMessage('books.items.select.file.label')}</th>
                    <th className="book-items-card__header-responsive">{getFormattedMessage('books.items.input.price.label')}</th>
                    <th className="book-items-card__item-header book-items-card__header-responsive">{getFormattedMessage('books.items.select.language.label')}</th>
                    <th className="book-items-card__header-responsive">{getFormattedMessage('books.items.select.publisher.label')}</th>
                    <th className="text-center book-items-card__header-responsive">{getFormattedMessage('react-data-table.action.column')}</th>
                </tr>
                </thead>
                <tbody>
                {renderFields()}
                </tbody>
            </Table>
            <button type="button" className="btn btn-outline-primary" onClick={() => onAddSubFields()}>
                {getFormattedMessage('books.items.input.add-item-btn.label')}
            </button>
            {submitFailed && error && <div className="text-danger mt-3">{error}</div>}
        </div>
    );
};

BookItemsCard.propTypes = {
    fields: PropTypes.object,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    currency: PropTypes.string
};

export default BookItemsCard;
