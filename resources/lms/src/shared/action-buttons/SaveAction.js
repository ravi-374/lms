import React from 'react';
import {Button} from 'reactstrap';

export default ({onSave, onCancel, pristine, submitting}) => {
    return (
        <div className="mt-3">
            <Button onClick={onCancel} color="secondary" className="ml-2 pull-right" size="md">Cancel</Button>
            <Button onClick={onSave} disabled={pristine || submitting} color="primary" size="md"
                    className="pull-right">Save</Button>
        </div>
    );
};
