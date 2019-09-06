import React from 'react';
import './Tableheader.scss';

const TableHeader = (props) => {
    let isAction = true;
    const sort = (header) => {
        props.sortAction({ orderBy: header, order: props.sortObject.order === 'asc' ? 'desc' : 'asc' })
    };
    if (props.hasOwnProperty('isAction')) {
        isAction = props.isAction;
    }
    const sortIcon = (header) => {
        return props.sortConfig(header, props.sortObject)
    };
    const renderActionColumn = () => {
        if (isAction) {
            return <th className="table-header__action">Action</th>;
        }
    };
    const renderStaticColumn = () => {
        if (props.staticField) {
            return <th>{props.staticField}</th>;
        }
    };
    const renderStatusColumn = () => {
        if (props.isStatusField) {
            return <th className="table-header__status">Status</th>;
        }
    };
    return (
        <tr className="table-header">
            {renderStaticColumn()}
            {props.headers.map(header =>
                (
                    <th key={header.id} onClick={() => sort(header.id)} className="table-header">
                        <div className="d-flex justify-content-between"><span>{header.name}</span> {sortIcon(header.id)}
                        </div>
                    </th>
                ))}
            {renderStatusColumn()}
            {renderActionColumn()}
        </tr>
    );
};

export default TableHeader;
