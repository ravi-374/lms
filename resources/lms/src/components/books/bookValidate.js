export default formValues => {
    const errors = {};
    if (!formValues.isbn) {
        errors.isbn = 'ISBN No. must be required.';
    }
    if (!formValues.authors || !formValues.authors.length) {
        errors.authors = 'Author must be required.';
    }
    if (formValues.authors) {
        if (formValues.authors.length === 0) {
            errors.authors = 'At least one author must be required.';
        }
    }
    if (!formValues.publisher_id) {
        errors.publisher_id = 'Publisher must be required.'
    }
    if (!formValues.name) {
        errors.name = 'Book name must be required.';
    }
    if (!formValues.language_id) {
        errors.language_id = 'Language must be required.';
    }
    if (!formValues.price) {
        errors.price = 'Price must be required.';
    }
    if (!formValues.description) {
        errors.description = 'Description must be required.';
    }
    if (!formValues.genres || !formValues.genres.length) {
        errors.genres = 'Genre must be required.';
    }
    if (formValues.genres) {
        if (formValues.genres.length === 0) {
            errors.genres = 'At least one genre must be required.';
        }
    }
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
