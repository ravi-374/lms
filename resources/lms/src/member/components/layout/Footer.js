import React from 'react';
import PropTypes from 'prop-types';

const MemberFooter = ({ appName }) => {

    return (
        <>
            <span><a href="https://infyom.com">{appName}</a> &copy; 2019 InfyOmLabs.</span>
            <span className="app-footer__power-by">Powered by <a href="https://coreui.io/">CoreUI</a></span>
        </>
    );
};

MemberFooter.propTypes = {
    appName: PropTypes.string,
};

export default MemberFooter;
