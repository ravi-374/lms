import React from 'react';
import {Button} from 'reactstrap';

export default ({ onSave, onCancel, invalid, isHideCancel, pristine }) => {
    return (
        <div className="mt-3">
            {!isHideCancel ?
                <Button onClick={onCancel} color="secondary" className="ml-2 pull-right" size="md">Cancel
                </Button> : null
            }
            <Button onClick={onSave} disabled={invalid || pristine} color="primary" size="md"
                    className="pull-right">Save</Button>
        </div>
    );
};
