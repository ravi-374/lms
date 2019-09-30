import React from 'react';
import {getFormattedMessage} from "../../shared/sharedMethod";

export default {
    items: [
        {
            name: getFormattedMessage("books.title"),
            url: '/app/books',
            icon: 'fas fa-book',
        },
        {
            name: getFormattedMessage("book-history.title"),
            url: '/app/book-history',
            icon: 'fas fa-book-reader',
        }
    ]
};
