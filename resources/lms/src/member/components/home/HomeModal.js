import React from 'react';
import Modal from '../../../shared/components/Modal';

const HomeModal = (props) => {
    const { toggleModal, isToggle } = props;

    const content = (
        <>
            <div className="d-flex flex-column flex-lg-row">
                <div className="book-detail-modal__media">
                    <img src="img/book-detail-placeholder.png" className="card-img" alt="book name"/>
                </div>
                <div className="pl-0 pl-lg-5">
                    <div className="d-flex mb-2">
                        <div className="book-detail-modal__detail-title">Description</div>
                        <div className="text-description">Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Aperiam beatae consectetur culpa enim ex id inventore
                            libero minima molestias mollitia necessitatibus, obcaecati odit omnis quo,
                            repellat sit totam vel veniam.
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="book-detail-modal__detail-title">Author</div>
                        <div className="text-description">John Doe</div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="book-detail-modal__detail-title">Genres</div>
                        <div className="text-description">John Doe</div>
                    </div>
                </div>
            </div>
        </>
    );
    const modalOptions = {
        title: 'The Art Of The Surf',
        content,
        className: 'book-detail-modal',
        toggleModal
    };

    return isToggle ? <Modal {...modalOptions}/> : null;
};

export default HomeModal;
