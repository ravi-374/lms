export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'Tag name must be required.';
    }
    return errors;
};
