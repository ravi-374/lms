import moment from 'moment';

export const priceFormatter = price => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
};

export const dateFormatter = (date) => {
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format(' Do MMMM, YYYY');
};

export const prepareFullNames = (members) => {
    let memberArray = [];
    members.forEach(member => {
        memberArray.push({id: member.id, name: member.first_name + ' ' + member.last_name});
    });
    return memberArray;
};
