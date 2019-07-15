export default formValues => {
    const errors = {};
    if (!formValues.language_name) {
        errors.language_name = 'Language name must be required.';
    }
    if (!formValues.language_code) {
        errors.language_code = 'Language code must be required.';
    }
    return errors;
};
