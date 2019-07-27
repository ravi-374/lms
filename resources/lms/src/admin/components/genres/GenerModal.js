import React from 'react';
import DeleteGenre from './DeleteGenre';
import CreateGenre from './CreateGenre';
import EditGenre from './EditGenre';

const GenreModal = (props) => {
    const {isEditMode, toggleModal, isDeleteMode, genre} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'genre-modal',
            title: isEditMode ? 'Edit Genre' : 'New Genre',
            toggleModal,
        };
        if (isEditMode) {
            return <EditGenre {...prepareModalOption} genre={genre}/>
        }
        return <CreateGenre {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            genreId: genre.id,
            title: 'Delete Genre',
            toggleModal,
            content: `Are you sure you want to delete "${genre.name}" ?`,
        };
        return <DeleteGenre {...prepareModalOption}/>
    }
};

export default GenreModal;
