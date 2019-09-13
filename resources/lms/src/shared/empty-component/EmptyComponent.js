import React from 'react';
import './EmptyComponent.scss';

const EmptyComponent = ({ title, isShort, isMediumEmptyState, isLoading, isShortEmptyState }) => {
    const prepareClassName = () => {
        if (isMediumEmptyState) {
            return 'empty-component empty-component--mid';
        }
        if (isShortEmptyState) {
            return 'empty-component empty-component--too-short';
        }
        if (isShort) {
            return 'empty-component empty-component--mini';
        }
        return 'empty-component empty-component--maxi';
    };

    return (
        <div className={prepareClassName()}>
            {!isLoading ? <i className="fa fa-2x fa-ban"/> : <i className="fa fa-2x fa-spinner"/>}
            <h5 className="empty-component__title">{title}</h5>
        </div>
    );
};

export default EmptyComponent;
