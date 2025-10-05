import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js';
import { fetchDeleteSportByIdAsync } from '../../store/sportsSlice';
import styles from './sports.module.scss';

const SportItem = ({ sport }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateToSport = () => {
        navigate(`/sports/${sport._id}`);
    };
    const handleDelete = (event) => {
        event.stopPropagation();
        dispatch(fetchDeleteSportByIdAsync(sport._id));
    };
    return (
        <li className={styles['sport-item']} onClick={navigateToSport}>
            {sport.name}
            <Icon onClick={handleDelete} path={mdiDeleteOutline} size={0.7} />
        </li>
    );
};

export default SportItem;