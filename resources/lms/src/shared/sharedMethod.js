import moment from 'moment';
import {countryCode} from '../constants';

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

export const getAvatarName = (name) => {
    if (name) {
        return name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase())
            .join('');
    }
};
