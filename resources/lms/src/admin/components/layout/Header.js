import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react'
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {getUserProfile} from "../../../store/action/localStorageAction";
import {Routes, LocalStorageKey, appSettingsKey} from "../../../constants";
import {fetchAppSetting} from "../../../store/action/appSettingAction";
import {getAvatarName} from "../../../shared/sharedMethod";

const Header = (props) => {
    const { user, getUserProfile, history, fetchAppSetting, appSetting } = props;
    let imageUrl = null;
    let appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    let appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;

    useEffect(() => {
        fetchAppSetting();
        getUserProfile(LocalStorageKey.USER);
    }, []);

    if (user) {
        user.name = user.first_name;
        if (user.last_name) {
            user.name += ' ' + user.last_name;
        }
        if (user.image) {
            imageUrl = publicImagePathURL.USER_AVATAR_URL + user.image;
        }
    }
    const goToUserProfile = () => {
        history.push(Routes.USER_PROFILE);
    };
    return (
        <Fragment>
            <AppSidebarToggler className="d-lg-none" display="md" mobile/>
            <AppNavbarBrand>
                <img className="infy-logo" src={appLogo} height="19" width="40" alt="InfyOm Logo"/>
                <span className="ml-2 infy-name" style={{ color: '#20a8d8' }}>{appName}</span>
            </AppNavbarBrand>
            <Nav className="ml-auto" navbar>
                <AppHeaderDropdown direction="down">
                    <DropdownToggle nav>
                        {imageUrl ? <img src={imageUrl} className="img-avatar" alt="user-avatar"/> :
                            <div className="header__avatar img-avatar">
                                <span className="header__avatar-text">{getAvatarName(user.name)}</span>
                            </div>
                        }
                        <span className="mr-3" style={{ verticalAlign: 'sub' }}>{user ? user.name : 'User'}</span>
                    </DropdownToggle>
                    <DropdownMenu right style={{ right: 'auto' }}>
                        <DropdownItem onClick={goToUserProfile}><i className="fa fa-cog"/>Profile</DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
                    </DropdownMenu>
                </AppHeaderDropdown>
            </Nav>
        </Fragment>
    );
};
const mapStateToProps = (state) => {
    const { profile, appSetting } = state;
    return { user: profile, appSetting: appSetting }
};
export default connect(mapStateToProps, { getUserProfile, fetchAppSetting })(Header);
