export default formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'Book series title must be required.';
    }
    return errors;
};
