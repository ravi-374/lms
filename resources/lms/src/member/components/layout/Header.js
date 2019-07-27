import React, {Fragment} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';

const Header = (props) => {
    const member = JSON.parse(localStorage.getItem('member'));
    let imageUrl = 'images/user-avatar.png';
    if (member) {
        member.name = member.first_name;
        if (member.last_name) {
            member.name += ' ' + member.last_name;
        }
        if (member.image) {
            imageUrl = 'uploads/members/' + member.image;
        }
    }
    const goToMemberProfile = () => {
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
                        <span className="mr-3" style={{verticalAlign: 'sub'}}>{member ? member.name : 'User'}</span>
                    </DropdownToggle>
                    <DropdownMenu right style={{right: 'auto'}}>
                        <DropdownItem onClick={goToMemberProfile}><i className="fa fa-cog"/>Profile</DropdownItem>
                        <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
                    </DropdownMenu>
                </AppHeaderDropdown>
            </Nav>
        </Fragment>
    );
};

export default Header;
