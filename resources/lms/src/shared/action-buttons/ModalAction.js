import React, {Fragment} from 'react';
import {Button} from 'reactstrap';

export default ({onOpenModal, item, isEditMode = false, goToEditItem, isHideDeleteIcon = false}) => {
    return (
        isEditMode ?
            <Fragment>
                <Button color="primary" size="sm" onClick={() => goToEditItem(item.id)}>
                    <i className="cui-pencil icons font-md"/>
                </Button>
                <Button className="ml-2" color="danger" size="sm" onClick={() => onOpenModal(item)}>
                    <i className="cui-trash icon font-md"/>
                </Button>
            </Fragment> :
            <Fragment>
                <Button color="primary" size="sm" onClick={() => onOpenModal(true, item)}>
                    <i className="cui-pencil icons font-md"/>
                </Button>
                {!isHideDeleteIcon ?
                    <Button className="ml-2" color="danger" size="sm" onClick={() => onOpenModal(false, item, true)}>
                        <i className="cui-trash icon font-md"/>
                    </Button> : null}
            </Fragment>
    );
};
