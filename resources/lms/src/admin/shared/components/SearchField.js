import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {searchFilter} from '../../../store/action/searchAction';
import CustomInput from '../../../shared/components/CustomInput';

const SearchField = ({searchFilter}) => {
    useEffect(() => {
        searchFilter('');
    }, []);
    const searchRecords = (event) => {
        searchFilter(event.target.value);
    };
    return (
        <Field name="search-text" type="search" placeholder="Search" groupText="search" isCustom={true}
               onChange={searchRecords} component={CustomInput}/>
    );
};

const form = reduxForm({form: 'searchForm'})(SearchField);
export default connect(null, {searchFilter})(form);
