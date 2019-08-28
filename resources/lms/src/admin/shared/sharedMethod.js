import {bookAllotmentStatusConstant} from "../../member/constants";

export const prepareRoles = (roles) => {
    let rolesArray = [];
    roles.forEach(role => rolesArray.push({ id: role.id, name: role.display_name }));
    return rolesArray;
};

export const getCurrentUser = () => {
    return JSON.parse(atob(localStorage.getItem('user')));
};

export const getApiRouteForBookAllotment = (status) => {
    switch (status) {
        case bookAllotmentStatusConstant.BOOK_RESERVED:
            return 'reserve-book';
        case bookAllotmentStatusConstant.BOOK_ISSUED:
            return 'issue-book';
        case bookAllotmentStatusConstant.BOOK_RETURNED:
            return 'return-book';
        default:
            return 'un-reserve-book';
    }
};
