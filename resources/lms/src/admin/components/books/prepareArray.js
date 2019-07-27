export const prepareAuthor = (authors) => {
    let authorArray = [];
    authors.forEach(author => {
        let name = author.first_name;
        if (author.last_name) {
            name += ' ' + author.last_name;
        }
        authorArray.push({id: author.id, name: name})
    });
    return authorArray;
};

export const preparePublisher = (publishers) => {
    let publisherArray = [];
    publishers.forEach(publisher => publisherArray.push({
        id: publisher.id,
        name: publisher.name
    }));
    return publisherArray;
};

export const prepareBookLanguage = (bookLanguages) => {
    let bookLanguageArray = [];
    bookLanguages.forEach(author => bookLanguageArray.push({
        id: author.id,
        name: author.language_name
    }));
    return bookLanguageArray;
};

export const getSelectedObjects = (id, arrayOfObjects) => {
    return arrayOfObjects.filter(objectItem => +objectItem.id === +id);
};
