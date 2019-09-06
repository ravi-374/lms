import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {getUserProfile} from "../../../store/action/localStorageAction";
import {LocalStorageKey, Routes, appSettingsKey} from "../../../constants";
import {fetchAppSetting} from "../../../store/action/appSettingAction";
import {getAvatarName} from "../../../shared/sharedMethod";

const Header = (props) => {
    const { member, getUserProfile, history, fetchAppSetting, appSetting } = props;
    let imageUrl = null;
    let appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    let appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;

    useEffect(() => {
        fetchAppSetting();
        getUserProfile(LocalStorageKey.MEMBER);
    }, []);

    if (member) {
        member.name = member.first_name;
        if (member.last_name) {
            member.name += ' ' + member.last_name;
        }
        if (member.image) {
            imageUrl = publicImagePathURL.MEMBER_AVATAR_URL + member.image;
        }
    }
    const goToMemberProfile = () => {
        history.push(Routes.MEMBER_PROFILE);
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
                                <span className="header__avatar-text">{getAvatarName(member.name)}</span>
                            </div>
                        }
                        <span className="mr-3" style={{ verticalAlign: 'sub' }}>{member ? member.name : 'User'}</span>
                    </DropdownToggle>
                    <DropdownMenu right style={{ right: 'auto' }}>
                        <DropdownItem onClick={goToMemberProfile}><i className="fa fa-cog"/>Profile</DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
                    </DropdownMenu>
                </AppHeaderDropdown>
            </Nav>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    const { profile, appSetting } = state;
    return { member: profile, appSetting: appSetting }
};
export default connect(mapStateToProps, { getUserProfile, fetchAppSetting })(Header);
