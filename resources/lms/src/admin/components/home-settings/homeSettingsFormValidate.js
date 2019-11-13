import {getFormattedMessage} from "../../../shared/sharedMethod";

export default formValues => {
    const errors = {};
    if (!formValues.facebook) {
        errors.facebook = getFormattedMessage('home-settings.input.facebook.validate.label');
    }
    if (!formValues.github) {
        errors.github = getFormattedMessage('home-settings.input.github.validate.label');
    }
    if (!formValues.linkedin) {
        errors.linkedin = getFormattedMessage('home-settings.input.linkedin.validate.label');
    }
    if (!formValues.twitter) {
        errors.twitter = getFormattedMessage('home-settings.input.twitter.validate.label');
    }
    if (!formValues.contact_email) {
        errors.contact_email = getFormattedMessage('home-settings.input.contact_email.validate.label');
    }
    if (!formValues.contact_phone) {
        errors.contact_phone = getFormattedMessage('home-settings.input.contact_phone.validate.label');
    }
    if (!formValues.company_description) {
        errors.company_description = getFormattedMessage('home-settings.input.company_description.validate.label');
    }
    return errors;
};
