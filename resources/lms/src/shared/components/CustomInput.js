import React from 'react';
import {
    FormFeedback, FormGroup, Input, Row, Col, Label, InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';

export default ({input, label, type, min,max, required, groupText, isCustom, customGroupText = '', addOnType = 'prepend', placeholder, readOnly, meta: {touched, error}}) => {
    const className = `${touched && error ? 'is-invalid' : ''}`;
    const labelClass = required ? 'control-label' : '';
    return (
        <FormGroup className={isCustom ? 'mb-0' : ''}>
            <div className="controls">
                <Row>
                    <Col xs={6}>
                        {label ? <Label className={labelClass} style={{marginTop: '16px'}}>{label}</Label> : null}
                    </Col>
                    <Col xs={label ? 6 : 12}>
                        <InputGroup>
                            <InputGroupAddon addonType={addOnType}>
                                <InputGroupText>{customGroupText === '' ?
                                    <i className={`fa fa-${groupText}`}/> : customGroupText}
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type={type} {...input} min={min} max={max} className={className} placeholder={placeholder}
                                   readOnly={readOnly}/>
                            {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        </FormGroup>
    );
};
