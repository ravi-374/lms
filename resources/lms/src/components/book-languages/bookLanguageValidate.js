export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'Language name must be required !';
    }
    if (!formValues.code) {
        errors.code = 'Language code must be required !';
    }
    return errors;
};
