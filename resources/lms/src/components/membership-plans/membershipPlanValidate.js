export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'Membership plan name must be required.';
    }
    if (!formValues.price) {
        errors.price = 'Membership plan price must be required.';
    }
    if (!formValues.frequency) {
        errors.frequency = 'Membership plan frequency must be required.';
    }
    if (!formValues.stripe_plan_id) {
        errors.stripe_plan_id = 'Stripe plan must be required.';
    }
    return errors;
};
