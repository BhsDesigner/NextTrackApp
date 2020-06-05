// JavaScript Document
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import * as yup from "yup";
import {useStyles} from './Styles'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import {Tracking} from "../dataProvider/client/Tracking";
import Router from 'next/router'

const Form = ({mutate}) => {
    const classes = useStyles();
    const router = useRouter()
    const { id } = router.query

    const {values,  errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting} = useFormik({
        initialValues: {
            number: id,
        },
        validationSchema: yup.object().shape({
            number: yup.string().required("enter a valid tracking number")
        }),
        onSubmit: (values, { setSubmitting }) => {
            Router.push("/track/[id]", "/track/" + values.number, {shallow: true});
            mutate(Tracking.getInstance().trackOrderQuery({filter: values}),
                {
                    onSuccess: () => setSubmitting(false),
                    onFailure: () => setSubmitting(false)
                });
        }
    });

    return (
        <Container component="main" maxWidth="md">
            <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9} className={classes.GridItem}>
                            <TextField
                                autoComplete="number"
                                name="number"
                                id="trackingNumber"
                                label="Tracking Number"
                                fullwidth
                                className={classes.TrackingInput}
                                value={values.number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.number ? errors.number : ""}
                                error={touched.number && Boolean(errors.number)}
                                variant="outlined"
                               
                            />
                        </Grid>
                        <Grid item xs={12} md={3} align="center">
                            <Button type="submit" fullWidth variant="outlined"
                                    color="secondary"
                                    className={classes.submit}
                                    disabled={isSubmitting}
                            >
                                <LocationOnIcon className={classes.Icons} /> Track
                            </Button>
                        </Grid>
                        
                    </Grid>


                </form>
        </Container>

    );
}

export default Form;
