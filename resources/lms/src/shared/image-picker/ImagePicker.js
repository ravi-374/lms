import React, {Fragment} from 'react';
import './ImagePicker.scss';

export default ({image, onFileChange, inputField = 'userInput'}) => {
    const openFileSelect = () => {
        document.getElementById(inputField).click();
    };
    return (
        <Fragment>
            <input id={inputField} type="file" className="d-none" onChange={(e) => onFileChange(e)}/>
            <div className="image__holder" onClick={openFileSelect}>
                <div className="image__cover">
                    <span className="image__text">{image ? 'Change Image' : 'Add Image'}</span>
                </div>
                <img src={image ? image : null} className="image__preview rounded mx-auto d-block" height={200}
                     width={200} alt={image}/>
            </div>
        </Fragment>
    )
}
