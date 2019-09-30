import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import './ActionButtons.scss';
import {getFormattedMessage} from "../sharedMethod";

const SaveAction = ({ onSave, onCancel, invalid, isHideCancel, pristine }) => {
    return (
        <div className="save-action">
            {!isHideCancel ?
                <Button onClick={onCancel} color="secondary" className="save-action__cancel-btn" size="md">
                    {getFormattedMessage('global.input.cancel-btn.label')}
                </Button> : null
            }
            <Button onClick={onSave} disabled={invalid || pristine} color="primary" size="md"
                    className="save-action__save-btn">
                {getFormattedMessage('global.input.save-btn.label')}
            </Button>
        </div>
    );
};

SaveAction.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default SaveAction ;
