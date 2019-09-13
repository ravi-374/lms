export default formValues => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = 'Author first name must be required.';
    }
    return errors;
};
