import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js';
import { fetchDeleteAthleteByIdAsync } from '../../store/athletesSlice';
import styles from './athletes.module.scss';

const AthleteItem = ({ athlete }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateToAthlete = () => {
        navigate(`/athletes/${athlete._id}`);
    };
    const handleDelete = (event) => {
        event.stopPropagation();
        dispatch(fetchDeleteAthleteByIdAsync(athlete._id));
    };
    return (
        <li className={styles['athlete-item']} onClick={navigateToAthlete}>
            {athlete.name}
            <Icon onClick={handleDelete} path={mdiDeleteOutline} size={0.7} />
        </li>
    );
};

export default AthleteItem;