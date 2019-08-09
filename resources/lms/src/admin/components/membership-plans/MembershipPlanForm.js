import React from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import membershipPlanValidate from './membershipPlanValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import TextArea from '../../../shared/components/TextArea';
import Select from "../../../shared/components/Select";
import PriceInput from '../../../shared/components/PriceInput';
import {membershipPlanFrequencyOptions} from '../../constants';

const MembershipPlanForm = props => {
    const onSaveMembershipPlan = formValues => {
        const { description, frequency, name, price, stripe_plan_id } = formValues;
        props.onSaveMembershipPlan({ description, frequency: frequency.id, name, price, stripe_plan_id });
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="Name" required autoFocus={!!props.initialValues} groupText="tasks"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="price" label="Price" placeholder="Price" type="number" min="0" required
                       component={PriceInput}/>
            </Col>
            <Col xs={12}>
                <Field name="frequency" label="Frequency" required options={membershipPlanFrequencyOptions}
                       placeholder="Select Frequency" groupText="clock-o" component={Select}/>
            </Col>
            <Col xs={12}>
                <Field name="stripe_plan_id" label="Stripe Plan Id" required groupText="stripe" component={InputGroup}/>
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

export default reduxForm({ form: 'MembershipPlanForm', validate: membershipPlanValidate })(MembershipPlanForm);
