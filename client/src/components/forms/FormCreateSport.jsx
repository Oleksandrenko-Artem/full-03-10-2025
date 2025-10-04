import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchCreateSportAsync } from '../../store/sportsSlice';
import { createValidationSchema } from '../../validation/sport.validate';
import styles from './form.module.scss'

const FormCreateSport = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.sports);
    const onSubmit = (values, formikBag) => {
        dispatch(fetchCreateSportAsync(values));
        formikBag.resetForm();
    }
    return (
        <Formik initialValues={{ name: '', isOlimpic: false, image: '' }} onSubmit={onSubmit} validationSchema={createValidationSchema}>
            {({ setFieldValue }) => (
                <Form className={styles.form}>
                    <h2>Create new sport</h2>
                    <p className={styles.error}>{error && 'Sport with this name already exists'}</p>
                    <label>
                        <span>Name of sport</span>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" component='div' className={styles.error} />
                    </label>
                    <label>
                        <span>Choose olimpic</span>
                        <Field name="isOlimpic" type="checkbox" />
                        <ErrorMessage name="isOlimpic" component='div' className={styles.error} />
                    </label>
                    <label>
                        <span>Add picture to sport</span>
                        <input name="image" type="file" onChange={(event) => {
                            setFieldValue('image', event.currentTarget.files[0]);
                        }} />
                        <ErrorMessage name="image" component='div' className={styles.error} />
                    </label>
                    <button type='submit'>Create new sport</button>
                </Form>
            )}
        </Formik>
    );
};

export default FormCreateSport;