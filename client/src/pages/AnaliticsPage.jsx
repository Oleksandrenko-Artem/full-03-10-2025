import React from 'react';
import AthletesBySport from '../components/analitics/AthletesBySport';
import AthletesByCountry from '../components/analitics/AthletesByCountry';
import SportsByCountry from '../components/analitics/SportsByCountry';
import AvgAgeAthletesBySport from '../components/analitics/AvgAgeAthletesBySport';
import styles from './pages.module.scss';

const AnaliticsPage = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles['analitics-label']}>Analitics</h1>
            <div className={styles['analitics-container']}>
                <SportsByCountry />
                <AthletesByCountry />
            </div>
            <div className={styles['analitics-container']}>
                <AthletesBySport />
                <AvgAgeAthletesBySport />
            </div>
        </div>
    );
}

export default AnaliticsPage;