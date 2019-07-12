import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import GenreModal from './GenerModal';
import Genre from './Genre';
import './Genres.scss';
import Toasts from '../../shared/toast/Toasts';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchGenres} from '../../store/actions/genreAction';

const Genres = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [genre, setGenre] = useState(null);
    const {genres, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchGenres();
    }, []);
    const cardModalProps = {genre, isDeleteMode, isEditMode, toggleModal};
    const onOpenModal = (isEdit, genre = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setGenre(genre);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, genres, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="pull-left text-dark">Genres</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Genre
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {genres.length > 0 ? <Genre {...cardBodyProps}/> :
                                <EmptyComponent title="No genres yet..."/>}
                            <GenreModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {genres, searchText, sortObject, isLoading} = state;
    let genresArray = Object.values(genres);
    if (searchText) {
        genresArray = searchFilter(genresArray, searchText);
    }
    if (sortObject) {
        genresArray = sortFilter(genresArray, sortObject);
    }
    return {genres: genresArray, sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchGenres, sortAction, toggleModal})(Genres);
