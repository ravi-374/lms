import React from 'react';
import MultiSelect from '../../shared/multi-select/MultiSelect';

const Dashboard = (props) => {
    const scaryAnimals = [
        {label: "Alligators", value: 1},
        {label: "Crocodiles", value: 2},
        {label: "Sharks", value: 3},
        {label: "Small crocodiles", value: 4},
        {label: "Smallest crocodiles", value: 5},
        {label: "Snakes", value: 6},
    ];

    const onSelect = (data) => {
        console.log(data);
    }
    return (
        <div className="animated fadeIn">
            <MultiSelect
                label="React Multiple Select"
                placeholder="Pick some"
                options={[
                    {id: 1, name: 'Rock'},
                    {id: 2, name: 'Paper'},
                    {id: 3, name: 'Scissors'}
                ]}
                multiple
                onSelect={onSelect}
                selctedItmes={[
                    {id: 1, name: 'Rock'},
                ]}
            />
        </div>
    );
};

export default Dashboard;
