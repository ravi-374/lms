import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {getUserProfile} from "../../../store/action/localStorageAction";
import {LocalStorageKey, Routes} from "../../../constants";

const Header = (props) => {
    const { member, getUserProfile, history } = props;
    let imageUrl = publicImagePath.USER_AVATAR;

    useEffect(() => {
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
                <img className="infy-logo" src={publicImagePath.APP_LOGO} height="19" width="40" alt="InfyOm Logo"/>
                <span className="ml-2 infy-name" style={{ color: '#20a8d8' }}>InfyOm</span>
            </AppNavbarBrand>
            <Nav className="ml-auto" navbar>
                <AppHeaderDropdown direction="down">
                    <DropdownToggle nav>
                        <img src={imageUrl} className="img-avatar" alt="user-avatar"/>
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
    return { member: state.profile }
};
export default connect(mapStateToProps, { getUserProfile })(Header);
