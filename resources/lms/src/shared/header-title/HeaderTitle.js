import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import {appSettingsKey} from "../../constants";
import {publicImagePath, publicImagePathURL} from "../../appConstant";

const ReactHelmet = (props) => {
    const { title, appSetting } = props;
    const appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    const appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;

    return (
        <Helmet onChangeClientState={() => {
            try {
                const existingIcons = document.querySelectorAll(
                    `link[rel="icon"],link[rel="apple-touch-icon"], link[rel="shortcut icon"]`
                );
                if (!existingIcons.length) {
                    return
                }
                existingIcons.forEach(e => e.parentNode.removeChild(e));
                const link = document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.sizes = '16*16';
                link.href = appLogo;
                document.getElementsByTagName('head')[0].appendChild(link);
            } catch (e) {
            }
        }}>
            <title>{`${title} | ${appName}`}</title>
        </Helmet>
    );
};

ReactHelmet.propTypes = {
    appSetting: PropTypes.object,
    title: PropTypes.string,
};

const mapStateToProps = (state) => {
    return { appSetting: state.appSetting };
};

export default connect(mapStateToProps)(ReactHelmet);
