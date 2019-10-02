import {bookAllotmentStatusConstant} from "../../member/constants";

export const getCurrentUser = () => {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
};

export const getCurrentMember = () => {
    return localStorage.getItem('member') ? JSON.parse(atob(localStorage.getItem('member'))) : null;
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

export const getBookAllotmentSuccessMessage = (status) => {
    switch (status) {
        case bookAllotmentStatusConstant.BOOK_RESERVED:
            return 'books-allotment.success.reserve.message';
        case bookAllotmentStatusConstant.BOOK_ISSUED:
            return 'books-allotment.success.issue.message';
        case bookAllotmentStatusConstant.BOOK_RETURNED:
            return 'books-allotment.success.return.message';
        case bookAllotmentStatusConstant.BOOK_LOST:
            return 'books-allotment.success.lost.message';
        case bookAllotmentStatusConstant.BOOK_DAMAGED:
            return 'books-allotment.success.damage.message';
        case bookAllotmentStatusConstant.BOOK_UN_RESERVED:
            return 'books-allotment.success.unreserve.message';
        default:
            return 'books-allotment.success.reserve.message';
    }
};
