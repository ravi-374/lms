export default formValues => {
    const errors = {};
    if (!formValues.currency_id) {
        errors.currency_id = 'Currency id must be required.';
    }
    return errors;
};
