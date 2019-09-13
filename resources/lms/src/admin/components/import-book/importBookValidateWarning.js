export default formValues => {
    const warning = {};
    if (formValues.new_authors && formValues.new_authors.length > 0) {
        warning.authors = `New author(s) ${formValues.new_authors.map(({ value }) => value).join(', ')} will be created.`;
    }
    const booksArrayWarnings = [];
    if (formValues.items && formValues.items.length) {
        formValues.items.forEach((item, index) => {
            const bookWarnings = {};
            // if (item && item.publisher) {
            //     bookWarnings.publisher = `New publisher
            //     ${item.publisher.label} will be created.`;
            //     booksArrayWarnings[index] = bookWarnings;
            // }
        });
        if (booksArrayWarnings.length) {
            warning.items = booksArrayWarnings;
        }
    }
    return warning;
};
