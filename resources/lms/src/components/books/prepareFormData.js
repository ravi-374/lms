export default (formValues) => {
    const {is_featured, isbn, genres, author_id, publisher_id, name, language_id, price, tags, url, description, file, items} = formValues;
    const formData = new FormData();
    formData.append('is_featured', is_featured);
    formData.append('isbn', isbn);
    genres.forEach(genre => formData.append('genres[]', genre.id.toString()));
    formData.append('author_id', author_id);
    formData.append('publisher_id', publisher_id);
    formData.append('name', name);
    formData.append('language_id', language_id);
    formData.append('price', price.toString());
    tags.forEach(tag => formData.append('tags[]', tag.id.toString()));
    formData.append('url', url ? url : '');
    formData.append('description', description ? description : '');
    if (file) {
        formData.append('photo', file, file.name);
    }
    if (items && items.length > 0 && items) {
        if (!items[0].format) {
            return formData;
        }
        items.forEach((item, index) => {
            formData.append(`items[${index}][edition]`, item.edition ? item.edition : '');
            formData.append(`items[${index}][format]`, item.format ? item.format.toString() : '');
            formData.append(`items[${index}][location]`, item.location ? item.location : '');
            formData.append(`items[${index}][is_available]`, item.is_available ? item.is_available.toString() : '');
        });
    }
    return formData;
}
