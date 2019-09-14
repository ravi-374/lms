import React from 'react';
import {Helmet} from "react-helmet";

export default ({ title, appLogo }) => {
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
                link.href = appLogo;
                document.getElementsByTagName('head')[0].appendChild(link);
            } catch (e) {
            }
        }}>
            <title>{title}</title>
        </Helmet>
    );
};
