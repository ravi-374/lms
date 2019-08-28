export default formValues => {
    const errors = {};
    if (!formValues.currency) {
        errors.currency = 'Currency must be required.';
    }
    if (!formValues.issue_due_days) {
        errors.issue_due_days = 'Issue due days must be required.';
    }
    if (!formValues.reserve_due_days) {
        errors.reserve_due_days = 'Reserve due days must be required.';
    }
    if (!formValues.return_due_days) {
        errors.return_due_days = 'Return due days must be required.';
    }
    return errors;
};
