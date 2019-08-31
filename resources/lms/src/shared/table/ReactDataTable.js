import React, {Fragment, useEffect, useMemo, useState} from 'react';
import DataTable from "react-data-table-component";
import {FilterOption, Filters} from "../../constants";
import SearchField from "../components/SearchField";
import FilterField from "../components/FilterField";
import './ReactDataTable.scss';
import EmptyComponent from "../empty-component/EmptyComponent";
import {renderSortIcons} from "../../config/sortConfig";

export default (props) => {
    const {
        defaultLimit = Filters.OBJ.limit, isShortEmptyState,
        items, onChange, columns, loading, paginationRowsPerPageOptions = [10, 15, 25, 50, 100], totalRows,
        isShowFilterField, isShowSearchField = true, filterOptions, searchKey = '', filterKey = null, filterKeyName = 'filterItem'
    } = props;
    const [perPage, setPerPages] = useState(defaultLimit);
    const [orderBy, setOrderBy] = useState(Filters.OBJ.order_By);
    const [direction, setDirection] = useState(Filters.OBJ.direction);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState(searchKey);
    const [filterText, setFilterText] = useState(filterKey ? filterKey.name.toLowerCase() : '');
    const tableColumns = useMemo(
        () => columns, []
    );

    useEffect(() => {
        onChangeDidMount(currentPage);
    }, [currentPage, perPage, orderBy, direction, searchText, filterText]);

    const handlePageChange = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page);
        }
    };

    const handleSearch = (searchText) => {
        setSearchText(searchText);
    };
    const handleFilter = (filterText) => {
        setFilterText(filterText);
    };

    const customSort = (rows, field, direction) => {
        if (field) {
            setOrderBy(field);
            setDirection(direction);
        }
        return rows;
    };

    const handlePerRowsChange = async (recordPerPage) => {
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
            search: isShowFilterField && filterText.toLowerCase() !== FilterOption.ALL &&
            searchText === '' ? filterText.toLowerCase() : '' ||
            isShowFilterField && searchText !== '' ? searchText.toLowerCase() : ''
            || !isShowFilterField ? searchText.toLowerCase() : ''
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
    const emptyStateProps = {
        isLoading: loading,
        isMediumEmptyState: !isShortEmptyState ? true : undefined,
        isShortEmptyState: isShortEmptyState ? true : undefined,
        title: loading ? 'Loading......' : 'No records yet'
    };

    return (
        <Fragment>
            <div className={isShowFilterField ? 'search-filter-container' : 'search-container'}>
                {isShowFilterField ? <div className="search-filter-container__filter-input">
                    <FilterField options={filterOptions} filterKeyName={filterKeyName} filterKey={filterKey} handleFilter={handleFilter}/>
                </div> : null}
                <div className={isShowFilterField ? 'search-filter-container__search-input' : ''}>
                    {isShowSearchField ? <SearchField handleSearch={handleSearch}/> : null}
                </div>
            </div>
            <DataTable noDataComponent={<EmptyComponent {...emptyStateProps}/>}
                       paginationRowsPerPageOptions={paginationRowsPerPageOptions} sortIcon={renderSortIcons(direction)}
                       pagination={true} paginationPerPage={defaultLimit} paginationServer={true}
                       sortFunction={customSort} striped={true} highlightOnHover={true}
                       className={'table-bordered table-striped mt-2'} customTheme={darkTheme}
                       paginationTotalRows={totalRows} onChangeRowsPerPage={handlePerRowsChange}
                       onChangePage={handlePageChange} noHeader={true} columns={tableColumns} data={items}/>
        </Fragment>
    )
}
