import React from 'react';
import './EmptyComponent.scss';

const EmptyComponent = ({title, isShort}) => {
    const className = isShort ? 'empty-component empty-component--mini' : 'empty-component empty-component--maxi';
    return (
        <div className={className}>
            <i className="fa fa-2x fa-ban"/>
            <h5 className="empty-component__title">{title}</h5>
        </div>
    );
};

export default EmptyComponent;
