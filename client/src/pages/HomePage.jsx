import React from 'react';
import SportsList from '../components/SportsList/SportsList';
import styles from './pages.module.scss';

const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <h1>Home</h1>
            <SportsList />
        </div>
    );
}

export default HomePage;