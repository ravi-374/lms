import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import PropTypes from 'prop-types';
import {publicImagePathURL} from '../../../appConstant';
import {Routes} from "../../../constants";
import {getAvatarName, getFormattedMessage} from "../../../shared/sharedMethod";

const MemberHeader = (props) => {
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
        <>
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
                                <span className="header__avatar-text">
                                {getAvatarName(member ? member.name : null)}
                                </span>
                            </div>
                        }
                        <span className="mr-3 header__user-name">{member ? member.name : null}</span>
                    </DropdownToggle>
                    <DropdownMenu right className="header__user-name">
                        <DropdownItem onClick={goToMemberProfile}><i className="fa fa-cog"/>
                            {getFormattedMessage('profile.title')}
                        </DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"/>
                            {getFormattedMessage('header.logout.title')}
                        </DropdownItem>
                    </DropdownMenu>
                </AppHeaderDropdown>
            </Nav>
        </>
    );
};

MemberHeader.propTypes = {
    member: PropTypes.object,
    history: PropTypes.object,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
};

export default MemberHeader;
