import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import _ from "lodash";
import HomeSettingsForm from "./HomeSettingsForm";
import {homeSettingsKey, languageOptions} from '../../constants';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {fetchHomeSettings, postHomeSettings} from '../../store/actions/settingAction';

const HomeSettings = (props) => {
    const {fetchHomeSettings, postHomeSettings, homeSettings} = props;
    const bookLanguagesOptions = getFormattedOptions(languageOptions);

    useEffect(() => {
        fetchHomeSettings(true);
    }, []);

    const onSaveHomeSettings = (formValues) => {
        postHomeSettings([...formValues]);
    };

    const prepareFormOption = {
        initialValues: {
            facebook: homeSettings[homeSettingsKey.FACEBOOK] ? homeSettings[homeSettingsKey.FACEBOOK].value : null,
            github: homeSettings[homeSettingsKey.GITHUB] ? homeSettings[homeSettingsKey.GITHUB].value : null,
            linkedin: homeSettings[homeSettingsKey.LINKEDIN] ? homeSettings[homeSettingsKey.LINKEDIN].value : null,
            twitter: homeSettings[homeSettingsKey.TWITTER] ? homeSettings[homeSettingsKey.TWITTER].value : null,
            contact_email: homeSettings[homeSettingsKey.CONTACT_EMAIl] ? homeSettings[homeSettingsKey.CONTACT_EMAIl].value : null,
            contact_phone: homeSettings[homeSettingsKey.CONTACT_PHONE] ? homeSettings[homeSettingsKey.CONTACT_PHONE].value : null,
            company_description: homeSettings[homeSettingsKey.COMPANY_DESCRIPTION] ? homeSettings[homeSettingsKey.COMPANY_DESCRIPTION].value : null,
        },
        onSaveHomeSettings
    };

    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle title="Home Settings"/>
            <Row>
                <Col xs={12} className="mb-2">
                    <h5 className="page-heading">{getFormattedMessage('home-settings.title')}</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <HomeSettingsForm {...prepareFormOption}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

HomeSettings.propTypes = {
    settings: PropTypes.object,
    fetchHomeSettings: PropTypes.func,
    postHomeSettings: PropTypes.func,
};

const mapStateToProps = (state) => {
    const {settings} = state;
    const settingsArray = Object.values(settings);
    const settingsArr = _.mapKeys(settingsArray, 'key');
    return {
        homeSettings: settingsArr
    }
};

export default connect(mapStateToProps, {
    fetchHomeSettings,
    postHomeSettings
})(HomeSettings);
