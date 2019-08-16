import React, {Fragment} from 'react';
import {Button} from 'reactstrap';

export default ({ onOpenModal, item, isEditMode = false, goToEditItem, goToDetailScreen = null, isHideDeleteIcon = false, isHideEditIcon = false, isHideDetailIcon = true }) => {
    return (
        isEditMode ?
            <Fragment>
                {!isHideEditIcon ?
                    <Button color="primary" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        goToEditItem(item.id)
                    }}>
                        <i className="cui-pencil icons font-md"/>
                    </Button> : null
                }
                {!isHideDetailIcon ?
                    <Button className="ml-2" color="success" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        goToDetailScreen(item.id)
                    }}>
                        <i className="fa fa-eye fa-sm text-white"/>
                    </Button> : null
                }
                <Button className="ml-2" color="danger" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal(item)
                }}>
                    <i className="cui-trash icon font-md"/>
                </Button>
            </Fragment> :
            <Fragment>
                {!isHideEditIcon ?
                    <Button color="primary" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(true, item)
                    }}>
                        <i className="cui-pencil icons font-md"/>
                    </Button> : null
                }
                {!isHideDetailIcon ?
                    <Button className="ml-2" color="success" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        goToDetailScreen(item.id)
                    }}>
                        <i className="fa fa-eye fa-sm text-white"/>
                    </Button> : null
                }
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
