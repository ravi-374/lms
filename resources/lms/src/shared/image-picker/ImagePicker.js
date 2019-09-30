import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import './ImagePicker.scss';
import {getAvatarName, getFormattedMessage} from "../sharedMethod";

const ImagePicker = (props) => {
    const {
        image, isDefaultImage, onFileChange, onRemovePhoto, inputField = 'userInput',
        buttonName = "image-picker.dropdown.profile.label", isRemoveOption = true, user
    } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const openFileSelect = () => {
        document.getElementById(inputField).click();
    };

    const getConcatedMessage = (messageId) => {
        return (
            <>
                {getFormattedMessage(messageId)}&nbsp;
                {getFormattedMessage(buttonName)}
            </>
        )
    };

    const renderRemoveOption = () => {
        if (!isDefaultImage && isRemoveOption) {
            return (<DropdownItem className="text-center" onClick={() => onRemovePhoto()}>
                {getConcatedMessage("image-picker.dropdown.remove.label")}
            </DropdownItem>);
        }
    };

    const renderPopOver = () => {
        return (
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle className="image__dropdown-btn">
                    {isDefaultImage ? getConcatedMessage('image-picker.dropdown.add.label') :
                        getConcatedMessage('image-picker.dropdown.change.label')}
                </DropdownToggle>
                <DropdownMenu className="image__dropdown-menu">
                    <DropdownItem className="text-center" onClick={() => openFileSelect()}>
                        {isDefaultImage ? getConcatedMessage('image-picker.dropdown.add.label') :
                            getConcatedMessage('image-picker.dropdown.change.label')}
                    </DropdownItem>
                    {renderRemoveOption()}
                    <DropdownItem className="text-center">{getFormattedMessage("global.input.cancel-btn.label")}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    };

    return (
        <>
            <input id={inputField} type="file" onClick={(e) => e.target.value = null} className="d-none"
                   onChange={(e) => onFileChange(e)} accept="image/*"/>
            <div className="image__holder">
                {image ?
                    <img src={image ? image : null} className="image__preview mx-auto d-block" height={200} width={200}
                         alt={image}/> :
                    <div className="image__avatar">
                        <span className="image__avatar-text">{getAvatarName(user ? user.name : null)}</span>
                    </div>
                }
                {renderPopOver()}
            </div>
        </>
    )
};

ImagePicker.propTypes = {
    user: PropTypes.object,
    image: PropTypes.string,
    inputField: PropTypes.string,
    buttonName: PropTypes.string,
    isDefaultImage: PropTypes.bool,
    isRemoveOption: PropTypes.bool,
    onFileChange: PropTypes.func,
    onRemovePhoto: PropTypes.func,
};

export default ImagePicker;
