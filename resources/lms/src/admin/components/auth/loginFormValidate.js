export default (formValues) => {
    const errors = {};
    if (!formValues.email) {
        errors.email = 'Email must be required !'
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(formValues.email)) {
        // errors.email = 'Invalid email address !'
    }
    if (!formValues.password) {
        errors.password = 'Password must be required !'
    }
    if (formValues.password && formValues.password.length < 6) {
        errors.password = 'Password must be greater than 5 characters.';
    }
    if (!formValues.confirm_password) {
        errors.confirm_password = 'Confirm password must be required !'
    }
    if (formValues.confirm_password !== formValues.password) {
        errors.confirm_password = 'Confirm password must be matched.';
    }
    return errors;
};
