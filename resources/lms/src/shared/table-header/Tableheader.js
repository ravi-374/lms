import React from 'react';
import './Tableheader.scss';

const TableHeader = (props, isAction = true) => {
    const sort = (header) => {
        props.sortAction({orderBy: header, order: props.sortObject.order === 'asc' ? 'desc' : 'asc'})
    };
    const sortIcon = (header) => {
        return props.sortConfig(header, props.sortObject)
    };
    const renderActionColumn = () => {
        if (isAction) {
            return <th style={{width: '100px', textAlign: 'center'}}>Action</th>;
        }
    };
    return (
        <tr className="table__row">
            {props.headers.map(header =>
                (
                    <th key={header.id} onClick={() => sort(header.id)} className="table-header">
                        <div className="d-flex justify-content-between"><span>{header.name}</span> {sortIcon(header.id)}
                        </div>
                    </th>
                ))}
            {renderActionColumn()}
        </tr>
    );
};

export default TableHeader;
