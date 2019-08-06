import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchSettings, fetchCurrencies, postCurrencies} from '../../store/actions/settingAction';
import {Card, CardBody, Col, Row} from 'reactstrap';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from "../../../shared/toast/Toasts";
import SettingsForm from "./SettingsForm";
import {settingsKey} from '../../constants';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

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
        initialValues: {currencySetting: selectedCurrency},
        onSaveSettings
    };
    if (isLoading) {
        return <ProgressBar/>
    }
    return (
        <div className="animated fadeIn">
            <HeaderTitle title={'Settings | LMS System'}/>
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

const prepareCurrencies = (currencies) => {
    let currenciesArray = [];
    currencies.forEach(cur => currenciesArray.push({
        id: cur.iso_code,
        name: cur.country
    }));
    return currenciesArray;
};

const prepareSelectedCurrency = (currencies) => {
    const currency = currencies.filter(setting => setting.key === settingsKey.CURRENCY)
        .map(({value, display_name}) => ({
            id: value,
            name: display_name,
        }));
    if (currency.length > 0) {
        return {id: currency[0].id, name: currency[0].name};
    }
};

const mapStateToProps = (state) => {
    const {currencies, settings, isLoading} = state;
    return {
        currencies: prepareCurrencies(currencies),
        selectedCurrency: prepareSelectedCurrency(Object.values(settings)),
        isLoading
    }
};

export default connect(mapStateToProps, {fetchSettings, fetchCurrencies, postCurrencies})(Settings);
