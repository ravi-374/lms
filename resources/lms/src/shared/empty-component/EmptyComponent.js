import React from 'react';
import './EmptyComponent.scss';

const EmptyComponent = ({ title, isShort, isMedium, isLoading }) => {
    let className = isShort ? 'empty-component empty-component--mini' : 'empty-component empty-component--maxi';
    className += isMedium ? 'empty-component empty-component--mid' : '';
    return (
        <div className={className}>
            {!isLoading ? <i className="fa fa-2x fa-ban"/> : <i className="fa fa-2x fa-spinner"/>}
            <h5 className="empty-component__title">{title}</h5>
        </div>
    );
};

export default EmptyComponent;
