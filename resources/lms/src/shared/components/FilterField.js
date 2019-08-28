import React, {useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import Select from './Select';

const FilterField = ({ options, handleFilter, initialize, filterKey }) => {
    useEffect(() => {
        initialize({ filter_key: filterKey });
    }, []);
    const onChangeFilter = (option) => {
        handleFilter(option.name);
    };
    return (
        <div className="ml-2">
            <Field name="filter_key" options={options} groupText="filter" component={Select} isCustom
                   onChange={onChangeFilter}/>
        </div>
    )
};

export default reduxForm({ form: 'filterForm' })(FilterField);
