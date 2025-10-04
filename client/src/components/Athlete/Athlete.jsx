import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchAthleteByIdAsync } from '../../store/athletesSlice';
import FormUpdateAthlete from '../forms/FormUpdateAthlete';
import CONSTANTS from '../../constants';
import styles from './Athlete.module.scss';

const Athlete = () => {
    const { athleteId } = useParams();
    const dispatch = useDispatch();
    const { selectedAthlete, error, isLoading } = useSelector((state) => state.athletes);
    const [isShowForm, setIsShowForm] = useState(false);
    useEffect(() => {
        dispatch(fetchAthleteByIdAsync(athleteId));
    }, [dispatch, athleteId]);
    const handleForm = () => {
        setIsShowForm(!isShowForm);
    };
    if (isLoading) {
        return <p>Loading...</p>
    };
    if (error) {
        return <p>{error}</p>
    };
    if (!selectedAthlete) {
        return <p>Athlete is'nt available</p>
    };
    return (
        <article>
            <h2>{selectedAthlete?.name}</h2>
            <img src={`${CONSTANTS.API_BASE_URL}${selectedAthlete?.avatar}`} alt={`${selectedAthlete?.name}`} className={styles.img} />
            <p>Country: {selectedAthlete?.country}</p>
            <p>Birth year: {selectedAthlete?.birthYear}</p>
            <p>Sport: <Link to={`/sports/${selectedAthlete?.sportId._id}`}>{selectedAthlete?.sportId.name}</Link></p>
            <div>
                <button onClick={handleForm} className={styles.btn}>{isShowForm ? 'Hide' : 'Show'} form update athlete</button>
                {isShowForm && <FormUpdateAthlete athlete={selectedAthlete} handleForm={handleForm} />}
            </div>
        </article>
    );
};

export default Athlete;