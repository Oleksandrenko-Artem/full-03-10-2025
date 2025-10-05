import React from 'react';
import styles from './pages.module.scss';

const NotFoundPage = () => {
    return (
        <div className={styles.wrapper}>
            <h1>Error 404: Page not found</h1>
        </div>
    );
}

export default NotFoundPage;