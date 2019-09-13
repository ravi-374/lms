import React from 'react';
import {Helmet} from "react-helmet";

export default ({ title } = props) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}
