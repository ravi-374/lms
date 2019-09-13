import React from 'react';
import {bookAllotmentStatusConstant} from "../../admin/constants";

const BookStatus = ({ status, item } = props) => {
    switch (status) {
        case bookAllotmentStatusConstant.BOOK_ISSUED:
            item.status_name = 'Issued';
            return <span className="text-success"><strong>Issued</strong></span>;
        case bookAllotmentStatusConstant.BOOK_AVAILABLE:
            item.status_name = 'Available';
            return <span className="text-success"><strong>Available</strong></span>;
        case bookAllotmentStatusConstant.BOOK_RETURNED:
            item.status_name = 'Returned';
            return <span className="text-dark"><strong>Returned</strong></span>;
        case bookAllotmentStatusConstant.BOOK_LOST:
            item.status_name = 'Lost';
            return <span className="text-danger"><strong>Lost</strong></span>;
        case bookAllotmentStatusConstant.BOOK_DAMAGED:
            item.status_name = 'Damaged';
            return <span className="text-danger"><strong>Damaged</strong></span>;
        case bookAllotmentStatusConstant.BOOK_UN_RESERVED:
            item.status_name = 'Unreserved';
            return <span className="text-warning"><strong>Unreserved</strong></span>;
        default:
            item.status_name = 'Reserved';
            return <span className="text-info"><strong>Reserved</strong></span>
    }
};
export default (BookStatus);
