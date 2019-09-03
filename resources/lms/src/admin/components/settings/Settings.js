import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchCurrencies, fetchSettings, postAppLogo, postSettings} from '../../store/actions/settingAction';
import {Card, CardBody, Col, Row} from 'reactstrap';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from "../../../shared/toast/Toasts";
import SettingsForm from "./SettingsForm";
import {settingsKey} from '../../constants';
import {publicImagePathURL} from "../../../appConstant";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import _ from "lodash";

const Settings = (props) => {
    const { currencies, selectedCurrency, settings, isLoading } = props;
    useEffect(() => {
        props.fetchSettings(true);
        props.fetchCurrencies();
    }, []);

    if (isLoading) {
        return <ProgressBar/>
    }

    const onSaveSettings = (formValues) => {
        props.postSettings(formValues);
    };

    const changeFile = (file) => {
        const formData = new FormData();
        formData.append('logo', file, file.name);
        props.postAppLogo(formData)
    };
    const getLogo = (settings) => {
        return settings && settings[settingsKey.LIBRARY_LOGO] ?
            publicImagePathURL.IMAGE_URL + settings[settingsKey.LIBRARY_LOGO].value : null
    };

    const prepareFormOption = {
        currencies,
        initialValues: {
            currency: selectedCurrency,
            issue_due_days: settings[settingsKey.ISSUE_DUE_DAYS] ? settings[settingsKey.ISSUE_DUE_DAYS].value : null,
            return_due_days: settings[settingsKey.RETURN_DUE_DAYS] ? settings[settingsKey.RETURN_DUE_DAYS].value : null,
            library_name: settings[settingsKey.LIBRARY_NAME] ? settings[settingsKey.LIBRARY_NAME].value : null,
            library_logo: getLogo(settings),
        },
        onSaveSettings,
        changeFile
    };

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
            id: value,
            name: display_name
        }));
    if (setting.length > 0) {
        return { id: setting[0].id, name: setting[0].name };
    }
};

const mapStateToProps = (state) => {
    const { currencies, settings, isLoading } = state;
    const settingsArray = Object.values(settings);
    const settingsArr = _.mapKeys(settingsArray, 'key');
    return {
        currencies: prepareCurrencies(currencies),
        selectedCurrency: prepareSelectedSetting(settingsArray, settingsKey.CURRENCY),
        settings: settingsArr,
        isLoading
    }
};

export default connect(mapStateToProps, {
    fetchSettings,
    fetchCurrencies,
    postSettings: postSettings,
    postAppLogo: postAppLogo
})(Settings);
