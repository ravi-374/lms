import React from 'react';
import {bookItemStatusConstants} from "../../admin/constants";

const BookStatus = ({ status, item } = props) => {
    switch (status) {
        case bookItemStatusConstants.AVAILABLE:
            item.status_name = 'Issued';
            return <span className="text-success"><strong>Available</strong></span>;
        case bookItemStatusConstants.UNAVAILABLE:
            item.status_name = 'Available';
            return <span className="text-info"><strong>Unavailable</strong></span>;
        case bookItemStatusConstants.LOST:
            item.status_name = 'Lost';
            return <span className="text-danger"><strong>Lost</strong></span>;
        default:
            item.status_name = 'Damaged';
            return <span className="text-warning"><strong>Damaged</strong></span>;
    }
};
export default (BookStatus);
