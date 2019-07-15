import React, {useEffect, useState} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm, FieldArray} from 'redux-form';
import roleValidate from './roleValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import TextArea from "../../shared/components/TextArea";
import CheckBox from "../../shared/components/CheckBox";

const RoleForm = props => {
    const [permissions] = useState(props.permissions);
    const onSaveRole = formValues => {
        formValues.permissionArray = formValues.permissions.filter(perm => perm.selected === true).map((({id}) => id));
        props.onSaveRole(formValues);
    };
    useEffect(() => {
        if (props.initialValues) {
            const {name, display_name, description} = props.initialValues;
            props.initialize({name, display_name, description, permissions: [...permissions]})
        } else {
            props.initialize({permissions: [...permissions]})
        }
    }, []);
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="Name" required groupText="list" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="display_name" label="Display Name" required groupText="list-alt" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="description" label="Description" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <h5>Permissions</h5>
                <hr/>
                <FieldArray name="permissions" component={renderPermissionsItems} permissions={permissions}/>
            </Col>
            <Col xs={12}>
                <hr/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveRole)} {...props}/>
            </Col>
        </Row>
    );
};
const renderPermissionsItems = ({fields, meta: {error, submitFailed}, permissions}) => {
    const handleChanged = (index) => {
        permissions[index].selected = !permissions[index].selected;
    };
    return (
        <Row>
            {fields.map((item, index) => {
                    return (
                        <Col xs={6} key={index}>
                            <Field name={`${item}.selected`} checked={permissions[index].selected}
                                   label={permissions[index].name}
                                   onChange={() => handleChanged(index)}
                                   component={CheckBox}/>
                        </Col>
                    )
                }
            )}
            {submitFailed && error && <div className="text-danger mt-3">{error}</div>}
        </Row>
    );
};

export default reduxForm({form: 'roleForm', validate: roleValidate})(RoleForm);
