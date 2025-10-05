import React from 'react';
import Sport from '../components/Sport/Sport';
import styles from './pages.module.scss';

const SportPage = () => {
    return (
        <div className={styles.wrapper}>
            <Sport />
        </div>
    );
}

export default SportPage;