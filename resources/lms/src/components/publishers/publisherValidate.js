export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'Publisher name must be required.';
    }
    return errors;
};
