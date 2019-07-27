export default formValues => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = 'First name must be required.';
    }
    if (!formValues.last_name) {
        errors.last_name = 'Last name must be required.'
    }
    if (!formValues.email) {
        errors.email = 'Email must be required.'
    }
    const emailExpression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!emailExpression.test(formValues.email)) {
        errors.email = 'Invalid email address.'
    }
    if (formValues.password && formValues.password.length < 6) {
        errors.password = 'Password must be greater than 5 characters.'
    }
    const phoneExpression = /^\d{10}$/;
    if (formValues.phone && !phoneExpression.test(formValues.phone)) {
        errors.phone = 'Phone no. must be of 10 digit.'
    }
    if (!formValues.role_id) {
        errors.role_id = 'Role must be required.';
    }
    return errors;
};
