import React, {Fragment, useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import './ImagePicker.scss';

export default ({image, isDefaultImage, onFileChange, onRemovePhoto, inputField = 'userInput', buttonName = 'Profile'}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const openFileSelect = () => {
        document.getElementById(inputField).click();
    };

    const renderRemoveOption = () => {
        if (!isDefaultImage) {
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
                        Add {buttonName}
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
                <img src={image ? image : null} className="image__preview mx-auto d-block" height={200}
                     width={200} alt={image}/>
                {renderPopOver()}
            </div>
        </Fragment>
    )
}
