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
    const { currencies, selectedCurrency, selectedIssueDueDay, selectedReturnDueDay, isLoading } = props;
    useEffect(() => {
        props.fetchSettings(true);
        props.fetchCurrencies();
    }, []);
    const onSaveSettings = (formValues) => {
        props.postCurrencies(formValues);
    };
    const prepareFormOption = {
        currencies,
        initialValues: {
            currency: selectedCurrency,
            issue_due_days: selectedIssueDueDay ? selectedIssueDueDay.id : null,
            return_due_days: selectedReturnDueDay ? selectedReturnDueDay.id : null,
        },
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

const prepareSelectedSetting = (settings, filterKey) => {
    const setting = settings.filter(setting => setting.key === filterKey)
        .map(({ value, display_name }) => ({
            id: settingsKey.CURRENCY === filterKey ? value : +value,
            name: settingsKey.CURRENCY === filterKey ? display_name : value
        }));
    if (setting.length > 0) {
        return { id: setting[0].id, name: setting[0].name };
    }
};

const mapStateToProps = (state) => {
    const { currencies, settings, isLoading } = state;
    const settingsArray = Object.values(settings);
    return {
        currencies: prepareCurrencies(currencies),
        selectedCurrency: prepareSelectedSetting(settingsArray, settingsKey.CURRENCY),
        selectedIssueDueDay: prepareSelectedSetting(settingsArray, settingsKey.ISSUE_DUE_DAYS),
        selectedReturnDueDay: prepareSelectedSetting(settingsArray, settingsKey.RETURN_DUE_DAYS),
        isLoading
    }
};

export default connect(mapStateToProps, { fetchSettings, fetchCurrencies, postCurrencies })(Settings);
