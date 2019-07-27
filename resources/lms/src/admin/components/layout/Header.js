import React, {Fragment} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';

const Header = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    let imageUrl = 'images/user-avatar.png';
    if (user) {
        user.name = user.first_name;
        if (user.last_name) {
            user.name += ' ' + user.last_name;
        }
        if (user.image) {
            imageUrl = 'uploads/users/' + user.image;
        }
    }
    const goToUserProfile = () => {
        props.history.push('/');
    };
    return (
        <Fragment>
            <AppSidebarToggler className="d-lg-none" display="md" mobile/>
            <AppNavbarBrand>
                <img className="infy-logo" src={'images/logo-blue-black.png'} height="19" width="40" alt="InfyOm Logo"/>
                <span className="ml-2 infy-name" style={{color: '#20a8d8'}}>InfyOm</span>
            </AppNavbarBrand>
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