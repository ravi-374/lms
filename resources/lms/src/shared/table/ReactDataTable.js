import React, {Fragment, useEffect, useMemo, useState} from 'react';
import DataTable from "react-data-table-component";
import {Row, Col} from 'reactstrap';
import {Filters, FilterOption} from "../../constants";
import SearchField from "../components/SearchField";
import FilterField from "../components/FilterField";
import './ReactDataTable.scss';
import EmptyComponent from "../empty-component/EmptyComponent";
import {renderSortIcons} from "../../config/sortConfig";

export default (props) => {
    const {
        items, onChange, columns, loading,
        totalRows, isShowFilterField, filterOptions, searchKey = '', filterKey = null
    } = props;
    const [perPage, setPerPages] = useState(Filters.OBJ.limit);
    const [orderBy, setOrderBy] = useState(Filters.OBJ.order_By);
    const [direction, setDirection] = useState(Filters.OBJ.direction);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState(searchKey);

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
            search: isShowFilterField && searchText.toLowerCase() !== FilterOption.ALL ? searchText.toLowerCase() : ''
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
    return (
        <Fragment>
            <Row className="justify-content-end">
                <Col xs={2}>
                    {isShowFilterField ?
                        <FilterField options={filterOptions} filterKey={filterKey}
                                     handleFilter={handleSearch}/> : null}
                </Col>
                <Col xs={2}>
                    <SearchField handleSearch={handleSearch}/>
                </Col>
            </Row>
            <DataTable noDataComponent={<EmptyComponent isMedium isLoading={loading}
                                                        title={loading ? 'Loading......' : 'No records yet'}/>}
                       paginationRowsPerPageOptions={[10, 15, 25, 50, 100]} sortIcon={renderSortIcons(direction)}
                       pagination={true} paginationServer={true} sortFunction={customSort} striped={true}
                       highlightOnHover={true} className={'table-bordered table-striped mt-2'} customTheme={darkTheme}
                       paginationTotalRows={totalRows} onChangeRowsPerPage={handlePerRowsChange}
                       onChangePage={handlePageChange} noHeader={true} columns={tableColumns} data={items}/>
        </Fragment>
    )
}
