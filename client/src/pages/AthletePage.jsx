import React from 'react';
import Athlete from '../components/Athlete/Athlete';
import styles from './pages.module.scss';

const AthletePage = () => {
    return (
        <div className={styles.wrapper}>
            <Athlete/>
        </div>
    );
}

export default AthletePage;