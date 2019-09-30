import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.book) {
        errors.book = getFormattedMessage('books-allotment.select.book.validate.label');
    }
    if (!formValues.book_item) {
        errors.book_item = getFormattedMessage('books-allotment.select.book-item.validate.label');
    }
    if (!formValues.member) {
        errors.member = getFormattedMessage('books-allotment.select.member.validate.label');
    }
    if (!formValues.status) {
        errors.status = getFormattedMessage('books-allotment.select.status.validate.label');
    }
    return errors;
};
