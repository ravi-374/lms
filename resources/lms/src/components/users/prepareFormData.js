export default (formValues) => {
    const formData = new FormData();
    const {is_active, first_name, last_name, email, password, phone, role_id, address_1, address_2, country, city, state, zip, file} = formValues;
    formData.append('is_active', is_active ? '1' : '0');
    formData.append('first_name', first_name);
    formData.append('last_name', last_name ? last_name : '');
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone ? phone : '');
    formData.append('role_id', role_id.toString());
    formData.append('address_1', address_1?address_1:'');
    formData.append('address_2', address_2 ? address_2 : '');
    formData.append('country', country ? country : '');
    formData.append('city', city ? city : '');
    formData.append('state', state ? state : '');
    formData.append('zip', zip ? zip.toString() : '');
    if (file) {
        formData.append('image', file, file.name);
    }
    return formData;
}
