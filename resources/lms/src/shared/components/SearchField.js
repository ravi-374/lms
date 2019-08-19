import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import CustomInput from './CustomInput';

const SearchField = (props) => {
    const [typingTimeout, setTypingTimeout] = useState(0);
    const sendToParent = (searchText) => {
        props.handleSearch(searchText);
    };
    const onChangeName = (event) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(() => sendToParent(event.target.value), 2000));
    };
    return (
        <Field name="search-text" type="search" placeholder="Search" groupText="search" isCustom={true}
               onChange={(e) => onChangeName(e)} component={CustomInput}/>
    );
};

export default reduxForm({ form: 'searchForm' })(SearchField);
