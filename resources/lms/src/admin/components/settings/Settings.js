import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchSettings, fetchCurrencies, postCurrencies} from '../../store/actions/settingAction';
import {Card, CardBody, Col, Row} from 'reactstrap';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from "../../../shared/toast/Toasts";
import SettingsForm from "./SettingsForm";
import {settingsKey} from '../../constants';

const Settings = (props) => {
    const {currencies, selectedCurrency, isLoading} = props;
    useEffect(() => {
        props.fetchSettings();
        props.fetchCurrencies();
    }, []);
    const onSaveSettings = (formValues) => {
        props.postCurrencies(formValues);
    };
    const prepareFormOption = {
        currencies,
        selectedCurrency,
        initialValues: {currencySetting: selectedCurrency},
        onSaveSettings
    };
    if (isLoading || selectedCurrency.length === 0) {
        return <ProgressBar/>
    }
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <div className="">
                        <h5 className="pull-left text-dark">Settings</h5>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <SettingsForm {...prepareFormOption}/>
                                <Toasts/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export const prepareCurrencies = (currencies) => {
    let currenciesArray = [];
    currencies.forEach(cur => currenciesArray.push({
        id: cur.iso_code,
        name: cur.country
    }));
    return currenciesArray;
};

const mapStateToProps = (state) => {
    const {currencies, settings, isLoading} = state;
    return {
        currencies: prepareCurrencies(currencies),
        selectedCurrency: Object.values(settings).filter(setting => setting.key === settingsKey.CURRENCY)
            .map(({value, display_name}) => ({
                id: value,
                name: display_name,
            })),
        isLoading
    }
};

export default connect(mapStateToProps, {fetchSettings, fetchCurrencies, postCurrencies})(Settings);
