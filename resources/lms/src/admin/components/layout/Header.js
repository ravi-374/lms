import React, {Fragment} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import {publicImagePathURL} from '../../../appConstant';
import {Routes} from "../../../constants";
import {getAvatarName} from "../../../shared/sharedMethod";

const Header = (props) => {
    const { user, history, appName, appLogo } = props;
    let imageUrl = null;
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
                <img className="header__app-logo" src={appLogo} alt={appLogo}/>
                <span className="ml-2 header__app-name">{appName}</span>
            </AppNavbarBrand>
            <Nav className="ml-auto" navbar>
                <AppHeaderDropdown direction="down">
                    <DropdownToggle nav>
                        {imageUrl ? <img src={imageUrl} className="img-avatar" alt="user-avatar"/> :
                            <div className="header__avatar img-avatar">
                                <span className="header__avatar-text">{getAvatarName(user.name)}</span>
                            </div>
                        }
                        <span className="mr-3 header__user-name">{user ? user.name : null}</span>
                    </DropdownToggle>
                    <DropdownMenu right className="header__user-name">
                        <DropdownItem onClick={goToUserProfile}><i className="fa fa-cog"/>Profile</DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
                    </DropdownMenu>
                </AppHeaderDropdown>
            </Nav>
        </Fragment>
    );
};

export default Header;
