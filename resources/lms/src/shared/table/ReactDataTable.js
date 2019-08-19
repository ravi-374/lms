import React, {Fragment, useEffect, useMemo, useState} from 'react';
import DataTable from "react-data-table-component";
import {Filters} from "../../constants";
import SearchField from "../components/SearchField";
import './ReactDataTable.scss';
import EmptyComponent from "../empty-component/EmptyComponent";

export default (props) => {
    const { items, onChange, columns, loading, totalRows } = props;
    const [perPage, setPerPages] = useState(Filters.OBJ.limit);
    const [orderBy, setOrderBy] = useState(Filters.OBJ.order_By);
    const [direction, setDirection] = useState(Filters.OBJ.direction);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const tableColumns = useMemo(
        () => columns, []
    );

    useEffect(() => {
        onChangeDidMount(currentPage);
    }, [currentPage, perPage, orderBy, direction, searchText]);

    const handlePageChange = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page);
        }
    };

    const handleSearch = (searchText) => {
        setSearchText(searchText);
    };

    const customSort = (field, directionBy) => {
        if (field.selector && (orderBy !== field.selector || direction !== directionBy)) {
            setOrderBy(field.selector);
            setDirection(directionBy);
        }
    };

    const handlePerRowsChange = async (recordPerPage, page) => {
        if (perPage !== recordPerPage) {
            setPerPages(recordPerPage);
        }
    };

    const onChangeDidMount = (page) => {
        const filters = {
            order_By: orderBy,
            limit: perPage,
            skip: searchText !== '' ? 0 : (page - 1) * perPage,
            direction: direction,
            search: searchText
        };
        onChange(filters);
    };

    const darkTheme = {
        header: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontColor: 'rgb(35, 40, 44)',
        },
        pagination: {
            fontColor: 'rgb(0, 158, 204)',
            buttonFontColor: 'rgb(0, 158, 204)',
            buttonHoverBackground: '#f5981c',
        },
    };

    return (
        <Fragment>
            <div className="d-flex justify-content-end">
                <SearchField handleSearch={handleSearch}/>
            </div>
            <DataTable noDataComponent={<EmptyComponent isMedium isLoading={loading}
                                                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                                        title={loading ? 'Loading......' : 'No records yet'}/>}
                       pagination={true} paginationServer={true} sortServer={true} onSort={customSort}
                       striped={true} highlightOnHover={true} className={'table-bordered table-striped mt-2'}
                       customTheme={darkTheme} paginationTotalRows={totalRows} onChangeRowsPerPage={handlePerRowsChange}
                       defaultSortAsc={false} onChangePage={handlePageChange} noHeader={true} columns={tableColumns}
                       data={items}/>
        </Fragment>
    )
}
