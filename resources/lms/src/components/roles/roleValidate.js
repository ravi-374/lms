export default formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'Role name must be required.';
    }
    if (!formValues.display_name) {
        errors.display_name = 'Role display name must be required.';
    }
    if (!formValues.permissions || !formValues.permissions.length) {
        errors.permissions = {_error: 'At least one permission must be required.'}
    }
    const permissionsArrayErrors = [];
    if (formValues.permissions && formValues.permissions.length) {
        const selectedArray = formValues.permissions.map(({isChecked}) => isChecked);
        const array = selectedArray.filter(selected => selected === true);
        const permissionErrors = {};
        if (array.length === 0) {
            permissionErrors.isChecked = 'Required';
            permissionsArrayErrors.push(permissionErrors)
        }
        if (permissionsArrayErrors.length) {
            errors.permissions = permissionsArrayErrors
        }
    }
    return errors;
};
