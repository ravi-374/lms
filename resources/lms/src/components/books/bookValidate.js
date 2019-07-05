export default formValues => {
    const errors = {};
    if (!formValues.isbn) {
        errors.isbn = 'ISBN No. must be required.';
    }
    if (!formValues.author_id) {
        errors.author_id = 'Author must be required.'
    }
    if (!formValues.publisher_id) {
        errors.publisher_id = 'Publisher must be required.'
    }
    if (!formValues.name) {
        errors.name = 'Name must be required.';
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
    if (!formValues.tags || !formValues.tags.length) {
        errors.tags = 'Tag must be required.';
    }
    if (formValues.tags) {
        if (formValues.tags.length === 0) {
            errors.tags = 'At least one tag must be required.';
        }
    }
    if (!formValues.items || !formValues.items.length) {
        errors.items = {_error: 'At least one item must be required.'}
    } else {
        // const itemsArrayErrors = [];
        // formValues.items.forEach((item, Index) => {
        //     const itemErrors = {};
        //     if (!item || !item.format) {
        //         itemErrors.format = 'Item format must be required.';
        //         itemsArrayErrors[Index] = itemErrors
        //     }
        // });
        // if (itemsArrayErrors.length) {
        //     errors.items = itemsArrayErrors
        // }
    }
    return errors;
};
