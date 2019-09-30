import React from 'react';
import {getFormattedMessage} from "../../shared/sharedMethod";

export default formValues => {
    const warning = {};
    if (formValues.new_authors && formValues.new_authors.length > 0) {
        warning.authors = <>{getFormattedMessage('books.input.authors.warning-start.label')} "
                            {formValues.new_authors.map(({ value }) => value).join(', ')}"
                            {getFormattedMessage('books.input.authors.warning-end.label')}
        </>;
    }
    if (formValues.new_genres && formValues.new_genres.length > 0) {
        warning.genres = <>{getFormattedMessage('books.input.genres.warning-start.label')} "
                           {formValues.new_genres.map(({ value }) => value).join(', ')}"
                           {getFormattedMessage('books.input.authors.warning-end.label')}
        </>;
    }
    if (formValues.new_tags && formValues.new_tags.length > 0) {
        warning.tags = <>{getFormattedMessage('books.input.tags.warning-start.label')} "
                         {formValues.new_tags.map(({ value }) => value).join(', ')}"
                         {getFormattedMessage('books.input.authors.warning-end.label')}
        </>;
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
