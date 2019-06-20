import React from 'react';
import './EmptyComponent.scss';

const EmptyComponent = props => {
  return (
      <div className="empty-component">
          <i className="fa fa-2x fa-ban"/>
          <h5 className="empty-component__title">{props.title}</h5>
      </div>
  ) ;
};

export default EmptyComponent;
