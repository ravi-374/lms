export default formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'Book series title must be required.';
    }
    if (!formValues.series_items || !formValues.series_items.length) {
        errors.series_items = {_error: 'At least one item must be required.'}
    }
    const booksArrayErrors = [];
    if (formValues.series_items && formValues.series_items.length) {
        formValues.series_items.forEach((item, index) => {
            const bookErrors = {};
            if (!item || !item.book_id) {
                bookErrors.book_id = 'Book name must be required.';
                booksArrayErrors[index] = bookErrors
            }
        });
        if (booksArrayErrors.length) {
            errors.series_items = booksArrayErrors
        }
    }
    return errors;
};
