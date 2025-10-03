import React from 'react';
import AthleteItem from './AthleteItem';

const AthletesList = ({ athletes }) => {
    const showAthleteItem = (athlete) => <AthleteItem key={athlete._id} athlete={athlete}/>
    return (
        <div>
            <h2>Athletes</h2>
            {athletes.length === 0 ? (
                <p>Empty list</p>
            ) : (
                <ul>{athletes.map(showAthleteItem)}</ul>
            )}
        </div>
    );
}

export default AthletesList;