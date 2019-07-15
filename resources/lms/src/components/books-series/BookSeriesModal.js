import React from 'react';
import DeleteBookSeries from './DeleteBookSeries';
import CreateBookSeries from './CreateBookSeries';
import EditBookSeries from './EditBookSeries';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, bookSeries} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'book-series-modal',
            title: isEditMode ? 'Edit Book Series' : 'New Book Series',
            toggleModal,
        };
        if (isEditMode) {
            return <EditBookSeries {...prepareModalOption} bookSeries={bookSeries}/>
        }
        return <CreateBookSeries {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            bookSeriesId: bookSeries.id,
            title: 'Delete bookSeries',
            toggleModal,
            content: `Are you sure you want to delete "${bookSeries.title}" ?`,
        };
        return <DeleteBookSeries {...prepareModalOption}/>
    }
};
