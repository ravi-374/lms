import moment from 'moment';
import {countryCode} from '../constants';

export const priceFormatter = (price, format) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: format
    }).format(price);
};

export const dateFormatter = (date) => {
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('Do MMMM, YYYY');
};

export const timeFormatter = (date) => {
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('hh:mma');
};

export const prepareFullNames = (members) => {
    let memberArray = [];
    members.forEach(member => {
        memberArray.push({id: member.id, name: member.first_name + ' ' + member.last_name});
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
