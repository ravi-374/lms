import React, {Fragment} from 'react';
import './ImagePicker.scss';

export default ({image, onFileChange, inputField = 'memberInput'}) => {
    const openFileSelect = () => {
        document.getElementById(inputField).click();
    };
    return (
        <Fragment>
            <input id="memberInput" type="file" className="d-none" onChange={(e) => onFileChange(e)}/>
            <div className="image-holder" onClick={openFileSelect}>
                <div className="image-cover">
                    <span className="image-text">{image ? 'Change Image' : 'Add Image'}</span>
                </div>
                <img src={image ? image : null} className="image-preview rounded mx-auto d-block" height={200}
                     width={200} alt={image}/>
            </div>
        </Fragment>
    )
}
