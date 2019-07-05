export const prepareAuthor = (authors) => {
    let authorArray = [{id: 0, name: 'Select Author'}];
    authors.forEach(author => authorArray.push({
        id: author.id,
        name: author.first_name + ' ' + author.last_name
    }));
    return authorArray;
};

export const preparePublisher = (publishers) => {
    let publisherArray = [{id: 0, name: 'Select Publisher'}];
    publishers.forEach(publisher => publisherArray.push({
        id: publisher.id,
        name: publisher.name
    }));
    return publisherArray;
};

export const prepareBookLanguage = (bookLanguages) => {
    let bookLanguageArray = [{id: 0, name: 'Select Language'}];
    bookLanguages.forEach(author => bookLanguageArray.push({
        id: author.id,
        name: author.language_name
    }));
    return bookLanguageArray;
};

export const getSelectedObjects = (id ,arrayOfObjects) => {
    return arrayOfObjects.filter(objectItem =>+objectItem.id === +id);
};
