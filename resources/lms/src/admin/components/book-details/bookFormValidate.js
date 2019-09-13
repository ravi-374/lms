export default formValues => {
    const errors = {};
    if (!formValues.isbn) {
        errors.isbn = 'ISBN No. must be required.';
    }
    if (!formValues.authors || !formValues.authors.length) {
        errors.authors = 'Author must be required.';
    }
    if (!formValues.name) {
        errors.name = 'Book name must be required.';
    }

    if (!formValues.genres || !formValues.genres.length) {
        errors.genres = 'Genre must be required.';
    }
    return errors;
};
