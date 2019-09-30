import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ appName }) => {

    return (
        <>
            <span><a href="https://infyom.com">{appName}</a> &copy; 2019 InfyOmLabs.</span>
            <span className="app-footer__power-by">Powered by <a href="https://coreui.io/">CoreUI</a></span>
        </>
    );
};

Footer.propTypes = {
    appName: PropTypes.string,
};

export default Footer;
