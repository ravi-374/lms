import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {settingsKey} from '../admin/constants';
import {fetchSettings, fetchCurrencies} from "../admin/store/actions/settingAction";
import {getOrSetCurrency} from "../store/action/currencyAction";

const PriceFormatter = (props) => {
    const { selectedCurrency, fetchSettings, getOrSetCurrency } = props;
    useEffect(() => {
        fetchSettings(false);
    }, []);
    if (selectedCurrency.length === 0) {
        return null;
    }
    return (
      null
    )
};

const mapStateToProps = (state) => {
    const { settings } = state;
    return {
        selectedCurrency: Object.values(settings).filter(setting => setting.key === settingsKey.CURRENCY)
            .map(({ value, display_name }) => ({
                id: value,
                name: display_name,
            })),
    }
};

export default connect(mapStateToProps, { fetchSettings, fetchCurrencies, getOrSetCurrency })(PriceFormatter);
