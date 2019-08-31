import React, {useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import Select from './Select';

const FilterField = ({ options, handleFilter, initialize, filterKey }) => {
    useEffect(() => {
        initialize({ filter_key: filterKey });
    }, []);
    const onChangeFilter = (option) => {
        localStorage.setItem('filterItem', JSON.stringify(option));
        handleFilter(option.name);
    };
    return (
        <Field name="filter_key" options={options} groupText="filter" component={Select} isCustom
               onChange={onChangeFilter}/>
    )
};

export default reduxForm({ form: 'filterForm' })(FilterField);
