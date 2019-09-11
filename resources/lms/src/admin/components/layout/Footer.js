import React, {Fragment} from 'react';

const Footer = ({ appName }) => {
    return (
        <Fragment>
            <span><a href="https://infyom.com">{appName}</a> &copy; 2019 InfyOmLabs.</span>
            <span className="ml-auto">Powered by <a href="https://coreui.io/">CoreUI</a></span>
        </Fragment>
    );
};

export default Footer;
