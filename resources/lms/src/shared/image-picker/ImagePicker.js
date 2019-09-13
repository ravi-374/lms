import React, {Fragment, useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import './ImagePicker.scss';
import {getAvatarName} from "../sharedMethod";

export default (props) => {
    const {
        image, isDefaultImage, onFileChange, onRemovePhoto,
        inputField = 'userInput', buttonName = 'Profile', isRemoveOption = true, user
    } = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const openFileSelect = () => {
        document.getElementById(inputField).click();
    };

    const renderRemoveOption = () => {
        if (!isDefaultImage && isRemoveOption) {
            return (<DropdownItem className="text-center" onClick={() => onRemovePhoto()}>
                Remove {buttonName}
            </DropdownItem>);
        }
    };

    const renderPopOver = () => {
        return (
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle className="image__dropdown-btn">
                    {isDefaultImage ? ` Add ${buttonName}` : `Change ${buttonName}`}
                </DropdownToggle>
                <DropdownMenu className="image__dropdown-menu">
                    <DropdownItem className="text-center" onClick={() => openFileSelect()}>
                        {isDefaultImage ? ` Add ${buttonName}` : `Change ${buttonName}`}
                    </DropdownItem>
                    {renderRemoveOption()}
                    <DropdownItem className="text-center">Cancel</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    };

    return (
        <Fragment>
            <input id={inputField} type="file" onClick={(e) => e.target.value = null} className="d-none"
                   onChange={(e) => onFileChange(e)}/>
            <div className="image__holder">
                {image ?
                    <img src={image ? image : null} className="image__preview mx-auto d-block" height={200} width={200}
                         alt={image}/> :
                    <div className="image__avatar">
                        <span className="image__avatar-text">{getAvatarName(user.name)}</span>
                    </div>
                }
                {renderPopOver()}
            </div>
        </Fragment>
    )
}
