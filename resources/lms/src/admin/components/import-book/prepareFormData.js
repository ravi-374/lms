export default (formValues) => {
    const { is_featured, isbn, genres, authors, name, tags, url, image_url, description, file, items, file_name } = formValues;
    const formData = new FormData();
    formData.append('is_featured', is_featured ? '1' : '0');
    formData.append('isbn', isbn);
    genres.forEach(genre => formData.append('genres[]', genre.value.toString()));
    authors.forEach(author => formData.append('authors[]', author.value.toString()));
    formData.append('name', name);
    if (tags) {
        tags.forEach(tag => formData.append('tags[]', tag.value.toString()));
    }
    formData.append('url', url ? url : '');
    formData.append('description', description ? description : '');
    if (file) {
        formData.append('photo', file, file.name);
    }
    if (!file_name) {
        formData.append('remove_image', '1');
    }
    if(image_url) {
        formData.append('image_url', image_url ? image_url : '');
    }
    if (items && items.length > 0 && items) {
        items.forEach((item, index) => {
            formData.append(`items[${index}][edition]`, item.edition ? item.edition : '');
            formData.append(`items[${index}][format]`, item.format ? item.format.value.toString() : '');
            formData.append(`items[${index}][language_id]`, item.language ? item.language.value.toString() : '');
            formData.append(`items[${index}][publisher_id]`, item.publisher ? item.publisher.value.toString() : '');
            formData.append(`items[${index}][price]`, item.price ? item.price.toString() : '');
        });
    }
    return formData;
}
