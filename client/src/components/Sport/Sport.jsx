import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSportByIdAsync } from '../../store/sportsSlice';
import CONSTANTS from '../../constants';
import FormUpdateSport from '../forms/FormUpdateSport';
import AthletesList from '../AthletesList/AthletesList';

const Sport = () => {
    const { sportId } = useParams();
    const dispatch = useDispatch();
    const { selectedSport, isLoading, error } = useSelector((state) => state.sports);
    const [isShowForm, setIsShowForm] = useState(false);
    const [isShowList, setIsShowList] = useState(true);
    useEffect(() => {
        dispatch(fetchSportByIdAsync(sportId));
    }, [dispatch, sportId]);
    const handleForm = () => {
        setIsShowForm(!isShowForm);
    };
    const handleList = () => {
        setIsShowList(!isShowList);
    };
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    if (!selectedSport) {
        return <p>Sport isn't available</p>
    }
    return (
        <section>
            <h2>{selectedSport?.name}</h2>
            <p>{selectedSport?.isOlimpic ? 'Olimpic' : 'Not olimpic'}</p>
            <img src={`${CONSTANTS.API_BASE_URL}${selectedSport?.image}`} alt={selectedSport?.name} />
            <div>
                <button onClick={handleForm}>{isShowForm ? 'Hide' : 'Show'} form update sport</button>
                {isShowForm && <FormUpdateSport sport={selectedSport} handleForm={handleForm} />}
                <button onClick={handleList}>{isShowList ? 'Hide' : 'Show'} list of athletes</button>
                {isShowList && <AthletesList athletes={selectedSport.athletes} />}
            </div>
        </section>
    );
}

export default Sport;