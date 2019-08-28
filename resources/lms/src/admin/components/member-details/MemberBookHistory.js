import React from 'react';
import {connect} from 'react-redux';
import './MemberDetails.scss';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import BookStatus from "../../../shared/book-status/book-status";
import {Routes} from "../../../constants";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {fetchMemberBooksHistory} from "../../store/actions/memberBookHistoryAction";

const MemberBookHistory = (props) => {
    const {
        memberId, memberBookHistory, onOpenModal,
        history, isLoading, totalRecord, fetchMemberBooksHistory
    } = props;
    const columns = [
        {
            name: 'Book',
            selector: 'name',
            sortable: true,
            wrap: true,
            cell: row => row.name = row.book_item.book.name
        },
        {
            name: 'Book Item',
            selector: 'book_code',
            width: '120px',
            sortable: true,
            cell: row => row.book_code = row.book_item.edition + ` (${row.book_item.book_code})`
        },
        {
            name: 'Status',
            width: '100px',
            center: true,
            selector: 'status',
            sortable: true,
            cell: row => <BookStatus status={row.status} item={row}/>
        },
        {
            name: 'Action',
            selector: 'id',
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '120px',
            cell: row => <ModalAction onOpenModal={onOpenModal} isHideDeleteIcon={true} isHideDetailIcon={false}
                                      goToDetailScreen={gotToBookHistoryDetail} item={row}/>,
        }];

    const gotToBookHistoryDetail = (bookAllotmentId) => {
        history.push(`${Routes.BOOK_ALLOTMENTS + bookAllotmentId}/details`);
    };

    const onChange = (filter) => {
        fetchMemberBooksHistory(memberId, filter);
    };

    return (
        <ReactDataTable items={memberBookHistory} defaultLimit={5} isShortEmptyState
                        paginationRowsPerPageOptions={[5, 10, 15, 25, 50, 100]} isShowSearchField={false}
                        columns={columns} loading={isLoading} totalRows={totalRecord} onOpenModal={onOpenModal}
                        onChange={onChange}/>
    );
};

const mapStateToProps = (state) => {
    const { memberBookHistory, totalRecord, isLoading } = state;
    return {
        memberBookHistory,
        totalRecord,
        isLoading
    }
};

export default connect(mapStateToProps, { fetchMemberBooksHistory })(MemberBookHistory);
