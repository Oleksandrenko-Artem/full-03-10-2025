import React from 'react';
import FormCreateSport from '../components/forms/FormCreateSport';
import styles from './pages.module.scss';

const CreateSportPage = () => {
    return (
        <div className={styles['wrapper']}>
            <FormCreateSport />
        </div>
    );
}

export default CreateSportPage;