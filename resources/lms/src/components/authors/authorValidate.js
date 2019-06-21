export default formValues => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = 'Author first name must be required !';
    }
    if (!formValues.last_name) {
        errors.last_name = 'Author last name must be required !';
    }
    return errors;
};
