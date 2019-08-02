export default formValues => {
    const errors = {};
    const bookCodeExpression = /^\d{8}$/;
    if (formValues.book_code && !bookCodeExpression.test(formValues.book_code)) {
        errors.book_code = 'Book code must be 8 digit long.';
    }
    if (!formValues.edition) {
        errors.edition = 'Edition must be required.';
    }
    if (!formValues.format) {
        errors.format = 'Format must be required.';
    }
    if (!formValues.language_id) {
        errors.language_id = 'Language must be required.';
    }
    if (!formValues.price) {
        errors.price = 'Price must be required.';
    }
    return errors;
};
