import React, {Fragment} from 'react';
import {Button} from 'reactstrap';

export default ({onOpenModal, item, isEditMode = false, goToEditItem, isHideDeleteIcon = false}) => {
    return (
        isEditMode ?
            <Fragment>
                <Button color="primary" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    goToEditItem(item.id)
                }}>
                    <i className="cui-pencil icons font-md"/>
                </Button>
                <Button className="ml-2" color="danger" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(item)
                }}>
                    <i className="cui-trash icon font-md"/>
                </Button>
            </Fragment> :
            <Fragment>
                <Button color="primary" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(true, item)
                }}>
                    <i className="cui-pencil icons font-md"/>
                </Button>
                {!isHideDeleteIcon ?
                    <Button className="ml-2" color="danger" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(false, item, true)
                    }}>
                        <i className="cui-trash icon font-md"/>
                    </Button> : null}
            </Fragment>
    );
};
