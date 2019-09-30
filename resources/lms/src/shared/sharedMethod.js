import React from 'react';
import {useIntl, FormattedMessage} from "react-intl";
import moment from 'moment';
import _ from 'lodash';
import {countryCode} from '../constants';
import {settingsKey} from "../appConstant";
import {bookStatusOptions} from "../admin/constants";

export const priceFormatter = (price, format) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: format
    }).format(price);
};

export const dateFormatter = (date) => {
    if (!date) {
        return '';
    }
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, YYYY');
};

export const timeFormatter = (date) => {
    if (!date) {
        return '';
    }
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('hh:mma');
};

export const dateTimeFormatter = (date) => {
    if (!date) {
        return '';
    }
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mma');
};


export const prepareFullNames = (members) => {
    let memberArray = [];
    members.forEach(member => {
        memberArray.push({ id: member.id, name: member.first_name + ' ' + member.last_name });
    });
    return memberArray;
};

export const mapCurrencyCode = (isoCode) => {
    switch (isoCode) {
        case countryCode.AED:
            return 'shekel';
        case countryCode.CAD:
            return 'try';
        case  countryCode.CNY:
            return 'cny';
        case  countryCode.GBP:
            return 'gbp';
        case countryCode.INR:
            return 'inr';
        case countryCode.USD:
            return 'usd';
        case countryCode.RUB:
            return 'rub';
        default:
            return 'inr';
    }
};

export const enableDisableUserInput = (event, digit) => {
    if (event.target.value.length > digit) {
        event.preventDefault();
    }
};

export const checkExistingRoute = (lastLocation, history) => {
    history.listen(location => {
        lastLocation = location;
    });
    const prevHistoryPush = history.push;
    history.push = (pathname) => {
        if (!lastLocation || pathname !== lastLocation.pathname + lastLocation.search + lastLocation.hash
        ) {
            prevHistoryPush(pathname)
        }
    };
};

export const prepareFullAddress = (address) => {
    let fullAddress = '';
    if (address) {
        if (address.address_1) {
            fullAddress += address.address_1;
        }
        if (address.address_2) {
            fullAddress += ',  ' + address.address_2;
        }
        if (address.city) {
            fullAddress += ',  ' + address.city;
        }
        if (address.state) {
            fullAddress += ',  ' + address.state;
        }
        if (address.country) {
            fullAddress += ',  ' + address.country.name;
        }
        if (address.zip) {
            fullAddress += '-' + address.zip;
        }
    }
    return fullAddress;
};

export const prepareProfileData = (userProfile) => {
    const { id, is_active, first_name, last_name, email, password, phone, address, image, roles, membership_plan } = userProfile;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        password,
        image,
        phone,
        file_name: !!image
    };
    if (roles) {
        changeAbleFields.role = { id: roles[0].id, name: roles[0].display_name };
    }
    if (membership_plan) {
        changeAbleFields.membership_plan = membership_plan;
    }
    if (address) {
        const { address_1, address_2, country, city, state, zip } = address;
        changeAbleFields.address_1 = address_1 ? address_1 : '';
        changeAbleFields.address_2 = address_2 ? address_2 : '';
        changeAbleFields.country = country ? country : null;
        changeAbleFields.city = city ? city : '';
        changeAbleFields.state = state ? state : '';
        changeAbleFields.zip = zip ? zip : '';
    }
    return changeAbleFields;
};

export const getAvatarName = (name) => {
    if (name) {
        return name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase())
            .join('');
    }
};

export const getFormattedMessage = (id) => {
    return <FormattedMessage id={id}/>
};

export const addRTLSupport = (rtlLang) => {
    const html = document.getElementsByTagName("html")[0];
    const att = document.createAttribute("dir");
    att.value = "rtl";
    if (rtlLang === settingsKey.LOCALE_ARABIC || rtlLang === settingsKey.LOCALE_PERSIAN) {
        html.setAttributeNode(att);
    } else {
        html.removeAttribute("dir");
    }
};
export const getModalTitle = (isCreate, isEdit, isDelete, createTitle, editTitle, deleteTitle) => {
    if (!isDelete) {
        return isCreate ? createTitle : editTitle;
    }
    return deleteTitle;
};

export const getFormattedMessageWithIntl = (id) => {
    const intl = useIntl();
    return intl.formatMessage({ id ,defaultMessage:id});
};

export const getConcatedFormattedMessage = (msgId1, msgId2) => {
    return <><FormattedMessage id={msgId1}/>&nbsp;<FormattedMessage id={msgId2}/></>
};

export const getFormattedOptions = (options) => {
    const intl = useIntl();
    const copyOptions = _.cloneDeep(options);
    copyOptions.map(option => option.name = intl.formatMessage({
        id: option.name,
        defaultMessage: option.name
    }));
    return copyOptions;
};
