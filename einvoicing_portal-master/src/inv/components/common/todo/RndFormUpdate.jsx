import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik'
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from "react-router-dom";
//import { KeyboardDatePicker } from "@material-ui/pickers";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import Error from '@material-ui/icons/Error';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import FormHelperText from '@material-ui/core/FormHelperText';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { TODO_POST } from '../../../constants/Constants'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { TODO_PUT } from '../../../constants/Constants'
import { useFormik } from 'formik';
import { Button, FormControl, Grid, InputLabel, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function RndFormUpdate() {
    const formik=useFormik({})
    const { t } = useTranslation()
    return (
        <div>
           
            <Formik
                initialValues={{
                    firstName: 'farooq',
                    lastName: "mohammed",
                    email: 'msfarooq2@gmail.com',
                }}
                onSubmit={async (values) => {
                    await sleep(500);
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ isSubmitting ,errors,touched,handleBlur,handleChange,handleSubmit,values}) => (

                                
<Form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <InputLabel >{t("todoTitle")}</InputLabel>
                            <FormControl variant="outlined" >
                                <TextField
                                    onBlur={handleBlur}
                                    onChange={formik.handleChange}
                                    name="firstName"
                                    value={formik.values.firstName}
                                    color="primary"
                                    variant="outlined"
                                    fullWidth
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </FormControl>
                        </Grid>

                    </Grid>


                   
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}

                            >{t('update_task')}</Button>

                                   &nbsp;&nbsp;
                                   {/* <Link to='/RFQTemplatesList'> <div className="my-btn color-red discard-btn reg4">Discard</div></Link> */}

                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={isSubmitting}

                            >{t('discard')}</Button>
                        </Grid>
                    </Grid>

                </Form>

                ) }
    </Formik>
  </div >
    )
}
