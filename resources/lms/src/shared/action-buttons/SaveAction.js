import React from 'react';
import {Button} from 'reactstrap';

export default ({onSave, onCancel, invalid}) => {
    return (
        <div className="mt-3">
            <Button onClick={onCancel} color="secondary" className="ml-2 pull-right" size="md">Cancel</Button>
            <Button onClick={onSave} disabled={invalid} color="primary" size="md"
                    className="pull-right">Save</Button>
        </div>
    );
};
