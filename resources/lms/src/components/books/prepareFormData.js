export default (formValues) => {
    const {is_featured, isbn, genres, authors, publisher_id, name, language_id,tags, url, description, file, items} = formValues;
    const formData = new FormData();
    formData.append('is_featured', is_featured ? '1' : '0');
    formData.append('isbn', isbn);
    genres.forEach(genre => formData.append('genres[]', genre.id.toString()));
    authors.forEach(author => formData.append('authors[]', author.id.toString()));
    formData.append('publisher_id', publisher_id);
    formData.append('name', name);
    formData.append('language_id', language_id);
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
            formData.append(`items[${index}][price]`, item.price ? item.price.toString() : '');
            formData.append(`items[${index}][is_available]`, item.is_available ? item.is_available.toString() : '');
        });
    }
    return formData;
}
