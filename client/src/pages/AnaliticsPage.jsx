import React from 'react';
import AthletesBySport from '../components/analitics/AthletesBySport';
import AthletesByCountry from '../components/analitics/AthletesByCountry';
import SportsByCountry from '../components/analitics/SportsByCountry';
import AvgAgeAthletesBySport from '../components/analitics/AvgAgeAthletesBySport';
import styles from './pages.module.scss';

const AnaliticsPage = () => {
    return (
        <div className={styles.wrapper}>
            <h1>Analitics</h1>
            <SportsByCountry />
            <hr />
            <AthletesByCountry />
            <hr />
            <AvgAgeAthletesBySport />
            <hr />
            <AthletesBySport />
        </div>
    );
}

export default AnaliticsPage;