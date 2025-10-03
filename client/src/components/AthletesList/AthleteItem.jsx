import React from 'react';
import { useNavigate } from 'react-router-dom';

const AthleteItem = ({ athlete }) => {
    const navigate = useNavigate();
    const navigateToAthlete = () => {
        navigate(`/athletes/${athlete._id}`);
    }
    return (
        <li onClick={navigateToAthlete}>
            {athlete.name}
        </li>
    );
}

export default AthleteItem;