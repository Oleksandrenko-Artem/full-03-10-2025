import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from "@mdi/react";
import { mdiBasketball } from "@mdi/js";
import { fetchSportByIdAsync } from '../../store/sportsSlice';
import CONSTANTS from '../../constants';
import FormUpdateSport from '../forms/FormUpdateSport';
import AthletesList from '../AthletesList/AthletesList';
import Spinner from '../Spinner/Spinner';
import styles from './Sport.module.scss';

const Sport = () => {
    const { sportId } = useParams();
    const dispatch = useDispatch();
    const { selectedSport, isLoading, error } = useSelector((state) => state.sports);
    const { athletes } = useSelector((state) => state.athletes);
    const [isShowForm, setIsShowForm] = useState(false);
    const [isShowList, setIsShowList] = useState(true);
    useEffect(() => {
        dispatch(fetchSportByIdAsync(sportId));
    }, [dispatch, sportId, athletes]);
    const handleForm = () => {
        setIsShowForm(!isShowForm);
    };
    const handleList = () => {
        setIsShowList(!isShowList);
    };
    const classBtnFormUpdate = isShowForm ? 'btn-hide' : 'btn-show'
    const classBtnAthleteList = isShowList ? 'btn-show' : 'btn-hide'
    if (isLoading) {
      return <Spinner />;
    };
    if (error) {
      return <p>{error}</p>;
    };
    if (!selectedSport) {
      return <p>Sport isn't available</p>;
    };
    return (
      <section className={styles.wrapper}>
        <div className={styles["sport-info"]}>
          <h2>{selectedSport?.name}</h2>
          {selectedSport?.image ? (
            <img
              src={`${CONSTANTS.API_BASE_URL}${selectedSport.image}`}
              alt={selectedSport.name}
              className={styles.img}
            />
          ) : (
            <div className={styles["icon-placeholder"]}>
              <Icon
                path={mdiBasketball}
                size={5}
                color="rgba(255, 255, 255, 0.8)"
              />
            </div>
          )}
          <p>
            <b>Olimpic:</b>{" "}
            {selectedSport?.isOlimpic ? "Olimpic" : "Not olimpic"}
          </p>
          <div className={styles["btn-wrapper"]}>
            <button
              onClick={handleList}
              className={styles[classBtnAthleteList]}
            >
              {isShowList ? "Hide" : "Show"} list of athletes
            </button>
            <button onClick={handleForm} className={styles[classBtnFormUpdate]}>
              {isShowForm ? "Hide" : "Show"} form update sport
            </button>
          </div>
          {isShowList && <AthletesList athletes={selectedSport.athletes} />}
        </div>
        <div className={styles["form-style"]}>
          {isShowForm && (
            <FormUpdateSport sport={selectedSport} handleForm={handleForm} />
          )}
        </div>
      </section>
    );
};

export default Sport;