import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import './Genres.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchGenres} from '../../store/actions/genreAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import GenreModal from "./GenerModal";
import ReactDataTable from "../../../shared/table/ReactDataTable";

const Genres = (props) => {
    const { genres, toggleModal, isLoading, totalRecord } = props;
    const [genre, setGenre] = useState(null);
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const cardModalProps = { genre, isDeleteMode, isEditMode, toggleModal };
    const onOpenModal = (isEdit, genre = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setGenre(genre);
        toggleModal();
    };

    const onChange = (filter) => {
        props.fetchGenres(filter);
    };

    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Action',
            selector: 'id',
            right: true,
            cell: row => <ModalAction onOpenModal={onOpenModal} item={row}/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title={'Genres | LMS System'}/>
                <h5 className="page-heading">Genres</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Genre
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={genres} columns={columns} loading={isLoading} totalRows={totalRecord}
                                            onOpenModal={onOpenModal} onChange={onChange}/>
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
    const { genres, isLoading, totalRecord } = state;
    let genresArray = Object.values(genres);
    return { genres: genresArray, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchGenres, toggleModal })(Genres);
