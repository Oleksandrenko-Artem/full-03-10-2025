import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchAllSportsAsync } from '../../store/sportsSlice';
import { fetchCreateAthleteAsync } from '../../store/athletesSlice';
import { createValidationSchema } from '../../validation/athlete.validate';
import CONSTANTS from '../../constants';
import styles from './form.module.scss'

const FormCreateAthlete = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sports } = useSelector((state) => state.sports);
    useEffect(() => {
        dispatch(fetchAllSportsAsync());
    }, [dispatch]);
    const onSubmit = (values, formikBag) => {
        dispatch(fetchCreateAthleteAsync(values));
        formikBag.resetForm();
        navigate(`/sports/${values.sportId}`);
    };
    const showCountry = (country) => (<option key={country} value={country}>{country}</option>);
    const showSport = (sport) => (<option key={sport._id} value={sport._id}>{sport.name}</option>);
    return (
        <Formik initialValues={{name: '', country: '', birthYear: 2000, sportId: '', avatar: ''}} validationSchema={createValidationSchema} onSubmit={onSubmit}>
            {({setFieldValue}) => {
                return <Form className={styles.form}>
                    <h2>Create new athlete</h2>
                    <label>
                        <span>Name of athlete</span>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" component='div' className={styles.error} />
                    </label>
                    <label>
                        <span>Choose country</span>
                        <select name="country" onChange={(event) => {
                            setFieldValue('country', event.currentTarget.selectedOptions[0].value);
                        }}>
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
                        <select name="sportId" onChange={(event) => {
                            setFieldValue('sportId', event.currentTarget.selectedOptions[0].value);
                        }}>
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
                    <button type='submit'>Create new athlete</button>
                </Form>
            }}
        </Formik>
    );
}

export default FormCreateAthlete;