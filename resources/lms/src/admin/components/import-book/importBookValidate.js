export default formValues => {
    const errors = {};
    if (!formValues.isbn) {
        errors.isbn = 'ISBN No. must be required.';
    }
    if (!formValues.authors || !formValues.authors.length) {
        errors.authors = 'Authors must be required.';
    }
    if (!formValues.name) {
        errors.name = 'Book name must be required.';
    }
    if (!formValues.genres || !formValues.genres.length) {
        errors.genres = 'Genre must be required.';
    }
    if (!formValues.items || !formValues.items.length) {
        errors.items = { _error: 'At least one item must be required.' }
    }
    const booksArrayErrors = [];
    if (formValues.items && formValues.items.length) {
        formValues.items.forEach((item, index) => {
            const bookErrors = {};
            if (!item || !item.edition) {
                bookErrors.edition = 'Edition must be required.';
                booksArrayErrors[index] = bookErrors
            }
            if (!item || !item.format) {
                bookErrors.format = 'Format must be required.';
                booksArrayErrors[index] = bookErrors
            }
            if (!item || !item.language) {
                bookErrors.language = 'Language must be required.';
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
