export default formValues => {
    const errors = {};
    if (!formValues.book_id) {
        errors.book_id = 'Book must be required.';
    }
    if (!formValues.books) {
        errors.books = 'Book name must be required.';
    }
    if (formValues.books && formValues.books.length === 0) {
        errors.books = 'Please select at least one book.';
    }
    if (!formValues.book_item_id) {
        errors.book_item_id = 'Book item must be required.';
    }
    if (!formValues.member_id) {
        errors.member_id = 'Member must be required.';
    }
    if (!formValues.status) {
        errors.status = 'Status must be required.';
    }
    if (!formValues.issue_date) {
        errors.issue_date = 'Issue dare must be required.';
    }
    if (!formValues.due_date) {
        errors.due_date = 'Due date must be required.';
    }
    if (!formValues.return_date) {
        errors.return_date = 'Return date must be required.';
    }
    return errors;
};
