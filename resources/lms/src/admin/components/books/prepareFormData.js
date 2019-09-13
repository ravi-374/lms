export default (formValues) => {
    const {is_featured, isbn, genres, authors, name, tags, url, description, file, items, file_name} = formValues;
    const formData = new FormData();
    formData.append('is_featured', is_featured ? '1' : '0');
    formData.append('isbn', isbn);
    genres.forEach(genre => formData.append('genres[]', genre.id.toString()));
    authors.forEach(author => formData.append('authors[]', author.id.toString()));
    formData.append('name', name);
    if (tags) {
        tags.forEach(tag => formData.append('tags[]', tag.id.toString()));
    }
    formData.append('url', url ? url : '');
    formData.append('description', description ? description : '');
    if (file) {
        formData.append('photo', file, file.name);
    }
    if (!file_name) {
        formData.append('remove_image', '1');
    }
    if (items && items.length > 0 && items) {
        items.forEach((item, index) => {
            formData.append(`items[${index}][edition]`, item.edition ? item.edition : '');
            formData.append(`items[${index}][format]`, item.format ? item.format.id.toString() : '');
            formData.append(`items[${index}][language_id]`, item.language ? item.language.id.toString() : '');
            formData.append(`items[${index}][publisher_id]`, item.publisher ? item.publisher.id.toString() : '');
            formData.append(`items[${index}][price]`, item.price ? item.price.toString() : '');
        });
    }
    return formData;
}
