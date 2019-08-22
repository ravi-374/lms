export default formValues => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = 'First name must be required.';
    }
    if (!formValues.last_name) {
        errors.last_name = 'Last name must be required.';
    }
    if (formValues.password && formValues.password.length < 6) {
        errors.password = 'Password must be greater than 5 characters.';
    }
    if (formValues.confirm_password !== formValues.password) {
        errors.confirm_password = 'Confirm password must be matched.';
    }
    const phoneExpression = /^\d{10}$/;
    if (formValues.phone && !phoneExpression.test(formValues.phone)) {
        errors.phone = 'Phone no. must be of 10 digit.';
    }
    return errors;
};
