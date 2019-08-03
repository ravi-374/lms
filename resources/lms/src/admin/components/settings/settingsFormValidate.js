export default formValues => {
    const errors = {};
    if (!formValues.currencySetting) {
        errors.currencySetting = 'Currency id must be required.';
    }
    return errors;
};
