import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import DataTable from "react-data-table-component";
import {FilterOption, Filters} from "../../constants";
import SearchField from "../components/SearchField";
import FilterField from "../components/FilterField";
import './ReactDataTable.scss';
import EmptyComponent from "../empty-component/EmptyComponent";
import {renderSortIcons} from "../../config/sortConfig";
import {getFormattedMessage} from "../sharedMethod";
import {useIntl} from 'react-intl';

const ReactTable = (props) => {
    const {
        defaultLimit = Filters.OBJ.limit, isShortEmptyState,
        items, onChange, columns, loading, paginationRowsPerPageOptions = [10, 15, 25, 50, 100], totalRows,
        isShowFilterField, isShowSearchField = true, filterOptions = [], searchKey = '', filterKey = null,
        emptyStateMessageId = '', filterKeyName = 'filterItem', icon
    } = props;
    const intl = new useIntl();
    const [perPage, setPerPages] = useState(defaultLimit);
    const [orderBy, setOrderBy] = useState(Filters.OBJ.order_By);
    const [direction, setDirection] = useState(Filters.OBJ.direction);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState(searchKey);
    const [filterText, setFilterText] = useState(filterKey ? filterKey.defaultValue ? filterKey.defaultValue : filterKey.name : '');

    const tableColumns = useMemo(
        () => columns, []
    );

    const renderRowPerPage = () => {
        setTimeout(() => {
            const spans = document.getElementsByClassName("sc-hSdWYo");
            if (spans.length > 0)
                spans[0].innerHTML = intl.formatMessage({ id: 'react-data-table.row-per-page' });
        }, 300);
    };

    useEffect(() => {
        onChangeDidMount(currentPage);
        renderRowPerPage();
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
            search: isShowFilterField && filterText !== intl.formatMessage({ id: FilterOption.ALL }) &&
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
        icon: icon,
        isLoading: loading,
        isMediumEmptyState: !isShortEmptyState ? true : undefined,
        isShortEmptyState: isShortEmptyState ? true : undefined,
        title: loading ? getFormattedMessage('react-data-table.loader.title') : getFormattedMessage(emptyStateMessageId)
    };

    return (
        <>
            <div className={isShowFilterField ? 'search-filter-container' : 'search-container'}>
                {isShowFilterField ? <div className="search-filter-container__filter-input">
                    <FilterField options={filterOptions} filterKeyName={filterKeyName} filterKey={filterKey}
                                 handleFilter={handleFilter}/>
                </div> : null}
                <div className={isShowFilterField ? 'search-filter-container__search-input' : ''}>
                    {isShowSearchField && items.length !== 0 || searchText || loading ? <SearchField handleSearch={handleSearch}/> : null}
                </div>
            </div>
            <DataTable noDataComponent={<EmptyComponent {...emptyStateProps}/>}
                       paginationRowsPerPageOptions={paginationRowsPerPageOptions} sortIcon={renderSortIcons(direction)}
                       pagination={true} paginationPerPage={defaultLimit} paginationServer={true}
                       sortFunction={customSort} striped={true} highlightOnHover={true}
                       className={'table-bordered table-striped mt-2'} customTheme={darkTheme}
                       paginationTotalRows={totalRows} onChangeRowsPerPage={handlePerRowsChange}
                       onChangePage={handlePageChange} noHeader={true} columns={tableColumns} data={items}/>
        </>
    )
};

ReactTable.propTypes = {
    filterKey: PropTypes.object,
    items: PropTypes.array,
    columns: PropTypes.array,
    paginationRowsPerPageOptions: PropTypes.array,
    filterOptions: PropTypes.array,
    defaultLimit: PropTypes.number,
    totalRows: PropTypes.number,
    searchKey: PropTypes.string,
    filterKeyName: PropTypes.string,
    emptyStateMessageId: PropTypes.string,
    loading: PropTypes.bool,
    isShortEmptyState: PropTypes.bool,
    isShowSearchField: PropTypes.bool,
    isShowFilterField: PropTypes.bool,
    onChange: PropTypes.func,
    sortAction: PropTypes.func,
};

export default ReactTable;
