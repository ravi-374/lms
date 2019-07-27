export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'Genre name must be required.';
    }
    return errors;
};
