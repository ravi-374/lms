import React,{useState} from 'react';
import PropTypes from 'prop-types';
import "./BookItems.scss";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {Label} from 'reactstrap';

const InputFile = (props) => {
    const { type, input } = props;
    const [file, setFile] = useState(null);

    const onInputChange = (e) => {
        e.preventDefault();
        setFile(event.target.files[0]);
        input.onChange(e.target.files);
    };

    return (
        <div>
        <label className="input-file">
            <span className="text-primary">{getFormattedMessage('books.items.choose-file-btn.label')}</span>
            <input className="input-file__input-type" type={type} onChange={onInputChange} accept=".pdf" />
        </label>
        <div className="text-primary">
            {file ? file.name : getFormattedMessage('books.items.no-file-chosen-text')}
        </div>
        </div>
    )
}

export default InputFile;
