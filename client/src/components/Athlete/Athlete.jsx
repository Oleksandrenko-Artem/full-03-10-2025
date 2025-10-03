import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAthleteByIdAsync } from '../../store/athletesSlice';
import CONSTANTS from '../../constants';

const Athlete = () => {
    const { athleteId } = useParams();
    const dispatch = useDispatch();
    const { selectedAthlete, error, isLoading } = useSelector((state) => state.athletes);
    useEffect(() => {
        dispatch(fetchAthleteByIdAsync(athleteId));
    }, [dispatch, athleteId]);
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
            <img src={`${CONSTANTS.API_BASE_URL}${selectedAthlete.avatar}`} alt={`${selectedAthlete?.name}`} />
            <p>{selectedAthlete.country}</p>
            <p>{selectedAthlete.birthYear}</p>
        </article>
    );
};

export default Athlete;