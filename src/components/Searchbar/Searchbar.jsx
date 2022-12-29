import React from "react";
import { Formik, Form, Field } from 'formik';

export const Searchbar = ({onSubmit}) => {

const handleSubmit = (values, actions) => {
onSubmit(values);
actions.resetForm();
}

    return (
        <Formik initialValues={{ search: '' }}
            onSubmit={handleSubmit}>
            <Form>
                <button type="submit">
                    <span >Search</span>
                </button>
                <Field
                    name='search'
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </Form>
        </Formik>

    )
}