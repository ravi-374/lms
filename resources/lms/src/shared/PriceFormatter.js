import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {settingsKey} from '../admin/constants';
import {fetchSettings, fetchCurrencies} from "../admin/store/actions/settingAction";
import {priceFormatter} from './sharedMethod';

const PriceFormatter = (props) => {
    const {selectedCurrency, fetchSettings, price} = props;
    useEffect(() => {
        fetchSettings(false);
    }, []);
    if (selectedCurrency.length === 0) {
        return null;
    }
    return (
        priceFormatter(price, selectedCurrency[0].id)
    )
};

const mapStateToProps = (state) => {
    const {settings} = state;
    return {
        selectedCurrency: Object.values(settings).filter(setting => setting.key === settingsKey.CURRENCY)
            .map(({value, display_name}) => ({
                id: value,
                name: display_name,
            })),
    }
};

export default connect(mapStateToProps, {fetchSettings, fetchCurrencies})(PriceFormatter);
