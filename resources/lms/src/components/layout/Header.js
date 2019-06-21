import React, {Fragment} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';

const Header = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    let imageUrl = 'images/user-avatar.png';
    if (user) {
        // if (user.organization.logo_path) {
        //     imageUrl = user.organization.logo_path;
        // }
    }
    const goToUserProfile = () => {
        props.history.push('/');
    };
    return (
        <Fragment>
            <AppSidebarToggler className="d-lg-none" display="md" mobile/>
            <AppNavbarBrand>
                <img src={'images/logo-blue-black.png'} width="50" alt="InfyOm Logo"/>
                <span className="ml-2" style={{color: '#20a8d8'}}>InfyOm</span>
            </AppNavbarBrand>
            <AppSidebarToggler className="d-md-down-none" display="lg"/>
            <Nav className="ml-auto" navbar>
                <AppHeaderDropdown direction="down">
                    <DropdownToggle nav>
                        <img src={imageUrl} className="img-avatar" alt="user-avatar"/>
                        <span className="mr-3" style={{verticalAlign: 'sub'}}>{user ? user.name : 'User'}</span>
                    </DropdownToggle>
                    <DropdownMenu right style={{right: 'auto'}}>
                        <DropdownItem onClick={goToUserProfile}><i className="fa fa-cog"/>Profile</DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
                    </DropdownMenu>
                </AppHeaderDropdown>
            </Nav>
        </Fragment>
    );
};

export default Header;
