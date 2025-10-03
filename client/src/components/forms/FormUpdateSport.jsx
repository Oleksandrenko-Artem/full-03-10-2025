import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchUpdateSportByIdAsync } from '../../store/sportsSlice';
import { updateValidationSchema } from '../../validation/sport.validate';
import styles from './form.module.scss'

const FormUpdateSport = ({sport, handleForm}) => {
    const dispatch = useDispatch();
    const onSubmit = (values) => {
        const formData = new FormData();
        if (values.name) {
            formData.append('name', values.name);
        }
        if (values.isOlimpic !== '') {
            formData.append('isOlimpic', values.isOlimpic);
        }
        if (values.image) {
            formData.append('image', values.image);
        }
        dispatch(fetchUpdateSportByIdAsync({ id: sport._id, formData }));
        handleForm();
    };
    const initialValues = {
        name: sport.name || '',
        isOlimpic: sport.isOlimpic || false,
        image: ''
    };
    return (
        <Formik initialValues={initialValues} validationSchema={updateValidationSchema} onSubmit={onSubmit}>
            {
                ({ setFieldValue }) => {
                    const handleImage = (event) => {
                        setFieldValue('image', event.currentTarget.files[0]);
                    };
                    return <Form className={styles.form}>
                        <label>
                            <span>Name of sport</span>
                            <Field name="name" type="text"/>
                            <ErrorMessage name="name" component='div' className={styles.error}/>
                        </label>
                        <label>
                            <span>Choose olimpic</span>
                            <Field name="isOlimpic" type="checkbox"/>
                            <ErrorMessage name="isOlimpic" component='div' className={styles.error}/>
                        </label>
                        <label>
                            <span>Add picture to sport</span>
                            <input name="image" type="file" onChange={handleImage}/>
                            <ErrorMessage name="image" component='div' className={styles.error}/>
                        </label>
                        <button type="submit">Update sport</button>
                    </Form>
                }
            }
        </Formik>
    );
}

export default FormUpdateSport;