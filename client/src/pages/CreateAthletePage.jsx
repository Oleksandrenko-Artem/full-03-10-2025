import React from 'react';
import FormCreateAthlete from '../components/forms/FormCreateAthlete';
import styles from './pages.module.scss';

const CreateAthletePage = () => {
    return (
        <div className={styles.wrapper}>
            <FormCreateAthlete />
        </div>
    );
}

export default CreateAthletePage;