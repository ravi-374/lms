export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'Role name must be required.';
    }
    return errors;
};
