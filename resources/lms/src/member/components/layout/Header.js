import React, {Fragment} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import {publicImagePathURL} from '../../../appConstant';
import {Routes} from "../../../constants";
import {getAvatarName} from "../../../shared/sharedMethod";

const Header = (props) => {
    const { member, history, appName, appLogo } = props;
    let imageUrl = null;

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
                <img className="header__app-logo" src={appLogo} alt={appLogo}/>
                <span className="ml-2 header__app-name">{appName}</span>
            </AppNavbarBrand>
            <Nav className="ml-auto" navbar>
                <AppHeaderDropdown direction="down">
                    <DropdownToggle nav>
                        {imageUrl ? <img src={imageUrl} className="img-avatar" alt="user-avatar"/> :
                            <div className="header__avatar img-avatar">
                                <span className="header__avatar-text">{getAvatarName(member.name)}</span>
                            </div>
                        }
                        <span className="mr-3 header__user-name">{member ? member.name : null}</span>
                    </DropdownToggle>
                    <DropdownMenu right className="header__user-name">
                        <DropdownItem onClick={goToMemberProfile}><i className="fa fa-cog"/>Profile</DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
                    </DropdownMenu>
                </AppHeaderDropdown>
            </Nav>
        </Fragment>
    );
};

export default Header;
