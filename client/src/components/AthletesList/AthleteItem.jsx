import React from 'react';

const AthleteItem = ({athlete}) => {
    return (
        <li>
            {athlete.name}
        </li>
    );
}

export default AthleteItem;