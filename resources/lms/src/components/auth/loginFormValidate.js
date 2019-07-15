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
    if (formValues.password) {
        if (formValues.password.length < 6) {
            errors.password = 'Password length must be greater than 6 !';
        }
    }
    return errors;
};
