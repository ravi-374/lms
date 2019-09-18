import React, {useState} from "react";
import ReactCrop from "react-image-crop";
import Modal from './Modal';
import ConfirmAction from '../action-buttons/ConfirmAction';
import './Component.scss';

const ImageCropper = (props) => {
    const { image, emitFileChange, emitImageChange, toggleModal, onSave } = props;
    const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    const onImageLoaded = image => {
        setImageRef(image);
    };
    const onCropComplete = crop => {
        makeClientCrop(crop).then(croppedImageUrl => {
            setCroppedImageUrl(croppedImageUrl);
            emitImageChange(croppedImageUrl);
        });
    };
    const onCropChange = (crop, percentCrop) => {
        setCrop(crop);
    };
    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            return await getCroppedImg(
                imageRef,
                crop,
                "newFile.jpeg"
            );
        }
    };
    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    // reject(new Error('Canvas is empty'));
                    return;
                }
                blob.name = fileName;
                blob.lastModifiedDate = new Date();
                emitFileChange(blob, croppedImageUrl);
                resolve(window.URL.createObjectURL(blob));
            }, "image/jpeg");
        });
    };

    const prepareModalOption = {
        className: 'membership-plan-modal',
        title: 'Crop Image',
        content: <>
            <ReactCrop src={image} crop={crop} onImageLoaded={onImageLoaded} onComplete={onCropComplete}
                       onChange={onCropChange}/>
            {croppedImageUrl && (<img alt="Crop" className="react-img-cropper__img" src={croppedImageUrl}/>
            )}
        </>,
        actions: <ConfirmAction onConfirm={onSave} onCancel={toggleModal}/>,
        toggleModal,
    };

    return (
        image && (<Modal {...prepareModalOption}/>)
    );
};

export default ImageCropper;
