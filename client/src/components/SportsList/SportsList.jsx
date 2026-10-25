import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSportsAsync } from '../../store/sportsSlice';
import SportItem from './SportItem';
import Spinner from "../Spinner/Spinner";

const SportsList = () => {
    const dispatch = useDispatch();
    const { sports, error, isLoading } = useSelector((state) => state.sports);
    useEffect(() => {
        dispatch(fetchAllSportsAsync());
    }, [dispatch]);
    const showSport = (sport) => <SportItem key={sport._id} sport={sport} />
    if (isLoading) {
        return <Spinner />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <section>
            <h2>Sports List</h2>
            {sports.length > 0 ? <ul>{sports.map(showSport)}</ul> : <p>No sports available.</p>}
        </section>
    );
}

export default SportsList;