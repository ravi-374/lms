export default formValues => {
    const errors = {};
    if (!formValues.book) {
        errors.book = 'Book name must be required.';
    }
    if (!formValues.book_item) {
        errors.book_item = 'Book item must be required.';
    }
    if (!formValues.member) {
        errors.member = 'Member must be required.';
    }
    if (!formValues.status) {
        errors.status = 'Status must be required.';
    }
    return errors;
};
