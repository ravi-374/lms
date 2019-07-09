import React, {useState, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import membershipPlanValidate from './membershipPlanValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import TextArea from '../../shared/components/TextArea';
import {membershipPlanFrequencyOptions} from '../../constants';
import MultiSelect from '../../shared/multi-select/MultiSelect';

const MembershipPlanForm = props => {
    const [selectedFrequency] = useState(props.initialValues ? props.initialValues.selectedFrequency : []);
    useEffect(() => {
        if (props.initialValues) {
            props.change('frequency', selectedFrequency[0].id);
        }
    }, []);
    const onSaveMembershipPlan = formValues => {
        props.onSaveMembershipPlan(formValues);
    };
    const onSelectFrequency = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            props.change('frequency', option[0].id);
        } else {
            props.change('frequency', null);
        }
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="Name" required groupText="tasks" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="price" label="Price" type="number" min="0" required groupText="money"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <MultiSelect
                    label="Frequency"
                    placeholder="Select Frequency"
                    groupText="clock-o"
                    options={membershipPlanFrequencyOptions}
                    required
                    onSelect={onSelectFrequency}
                    selctedItems={selectedFrequency}
                />
                <Field name="frequency" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="stripe_plan_id" label="Stripe Plan Id" required groupText="stripe"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="description" label="Description" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveMembershipPlan)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'MembershipPlanForm', validate: membershipPlanValidate})(MembershipPlanForm);
