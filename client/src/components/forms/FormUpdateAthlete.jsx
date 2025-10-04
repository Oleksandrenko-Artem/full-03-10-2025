import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateValidationSchema } from '../../validation/athlete.validate';
import { fetchAllSportsAsync } from '../../store/sportsSlice';
import { fetchUpdateAthleteByIdAsync } from '../../store/athletesSlice';
import CONSTANTS from '../../constants';
import styles from './form.module.scss'

const FormUpdateAthlete = ({ athlete, handleForm }) => {
    const dispatch = useDispatch();
    const { sports } = useSelector((state) => state.sports);
    useEffect(() => {
        dispatch(fetchAllSportsAsync());
    }, [dispatch]);
    const initialValues = {
        name: athlete?.name || '',
        country: athlete?.country || '',
        birthYear: athlete?.birthYear || '',
        sportId: athlete?.sportId._id || '',
        avatar: '',
    };
    const onSubmit = (values) => {
        dispatch(fetchUpdateAthleteByIdAsync({ id: athlete._id, formData: values }));
        handleForm();
    };
    const showCountry = (country) => (<option key={country} value={country}>{country}</option>);
    const showSport = (sport) => (<option key={sport._id} value={sport._id}>{sport.name}</option>);
    return (
        <Formik initialValues={initialValues} validationSchema={updateValidationSchema} onSubmit={onSubmit}>
            {({setFieldValue, values}) => {
                return <Form className={styles.form}>
                    <h2>Update athlete</h2>
                    <label>
                        <span>Name of athlete</span>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" component='div' className={styles.error} />
                    </label>
                    <label>
                        <span>Choose country</span>
                        <select name="country" value={values.country} onChange={(event) => {
                            setFieldValue('country', event.currentTarget.selectedOptions[0].value);
                        }}>
                            <option value=""></option>
                            {CONSTANTS.ALLOWED_COUNTRIES.map(showCountry)}
                        </select>
                        <ErrorMessage name="country" component='div' className={styles.error} />
                    </label>
                    <label>
                        <span>Birth year of athlete</span>
                        <Field name="birthYear" type="number" min="1900" max={new Date().getFullYear() - 15} />
                        <ErrorMessage name="birthYear" component='div' className={styles.error} />
                    </label>
                    <label>
                        <span>Choose sport</span>
                        <select name="sportId" value={values.sportId} onChange={(event) => {
                            setFieldValue('sportId', event.currentTarget.selectedOptions[0].value);
                        }}>
                            <option value=""></option>
                            {sports?.map(showSport)}
                        </select>
                        <ErrorMessage name="sportId" component='div' className={styles.error}/>
                    </label>
                    <label>
                        <span>Add picture to athlete</span>
                        <input name="avatar" type="file" onChange={(event) => {
                            setFieldValue('avatar', event.currentTarget.files[0]);
                        }} />
                        <ErrorMessage name="avatar" component='div' className={styles.error} />
                    </label>
                    <button type='submit'>Update athlete</button>
                </Form>
            }}
        </Formik>
    );
}

export default FormUpdateAthlete;