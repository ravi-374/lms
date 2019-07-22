export default formValues => {
    const errors = {};
    if (!formValues.items || !formValues.items.length) {
        errors.items = {_error: 'At least one item must be required.'}
    }
    const booksArrayErrors = [];
    if (formValues.items && formValues.items.length) {
        formValues.items.forEach((item, index) => {
            const bookErrors = {};
            if (!item || !item.edition) {
                bookErrors.edition = 'Edition must be required.';
                booksArrayErrors[index] = bookErrors
            }
            if (!item || !item.language_id) {
                bookErrors.language_id = 'Language must be required.';
                booksArrayErrors[index] = bookErrors
            }
            if (!item || !item.price) {
                bookErrors.price = 'Price must be required.';
                booksArrayErrors[index] = bookErrors
            }
        });
        if (booksArrayErrors.length) {
            errors.items = booksArrayErrors
        }
    }
    return errors;
};
