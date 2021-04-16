import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';
import './invitation.css'

const PartnerInvite = () => {

    const invitations = {
        companyName: '',
        contactPersonName: '',
        contactMobileNumber: '',
        contactEmail: '',
        firmType: '',
        description: ''
    }

    const { t } = useTranslation()

    // set up form validation schema with YUP API
    const _validationSchema = Yup.object().shape({
        companyName: Yup.string().max(75).required(t('param_require')),
        contactPersonName: Yup.string().max(50).required(t('param_require')),
        contactMobileNumber: Yup.string().max(15).required(t('param_require')),
        contactEmail: Yup.string().email(t('param_email_invalid')).required(t('param_require')),
        firmType: Yup.string().required(t('param_require')),
        description: Yup.string().required(t('param_require'))
    })

    return (
       <div className="partnerInvite">
            <h5>{t('invitation_message')}</h5>
            <div className="invite_form">
                <Formik
                    initialValues={invitations}
                    validationSchema={_validationSchema}
                    onSubmit={(values) => {
                        alert('invitation is received ');
                    }}
                >
                    {({ handleBlur, handleChange, values, isSubmitting, errors, touched }) => (
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="companyName"
                                        label={t('company_name')}
                                        value={values.companyName}
                                        color="primary"
                                        variant="outlined"
                                        fullWidth
                                        error={Boolean(touched.companyName && errors.companyName)}
                                        helperText={touched.companyName && errors.companyName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="contactPersonName"
                                        label={t('contact_person_name')}
                                        value={values.contactPersonName}
                                        color="primary"
                                        variant="outlined"
                                        fullWidth
                                        error={Boolean(touched.contactPersonName && errors.contactPersonName)}
                                        helperText={touched.contactPersonName && errors.contactPersonName}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="contactMobileNumber"
                                        label={t('contact_mobile_number')}
                                        value={values.contactMobileNumber}
                                        color="primary"
                                        variant="outlined"
                                        fullWidth
                                        error={Boolean(touched.contactMobileNumber && errors.contactMobileNumber)}
                                        helperText={touched.contactMobileNumber && errors.contactMobileNumber}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="contactEmail"
                                        label={t('contact_email')}
                                        value={values.contactEmail}
                                        color="primary"
                                        variant="outlined"
                                        fullWidth
                                        error={Boolean(touched.contactEmail && errors.contactEmail)}
                                        helperText={touched.contactEmail && errors.contactEmail}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <FormControl
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>{t('firm_type')}</InputLabel>
                                        <Select
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="firmType"
                                            label={t('firm_type')}
                                            value={values.firmType}
                                            color="primary"
                                            variant="outlined"
                                            error={Boolean(touched.firmType && errors.firmType)}
                                            helperText={touched.firmType && errors.firmType}
                                        >
                                            <MenuItem value="supplier">Supplier</MenuItem>
                                            <MenuItem value="customer">Customer</MenuItem>
                                            <MenuItem value="supplier_customer">Supplier & Customer</MenuItem>
                                        </Select>

                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="description"
                                        label={t('description')}
                                        value={values.description}
                                        color="primary"
                                        variant="outlined"
                                        multiline
                                        rows={10}
                                        fullWidth
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </Grid>
                            </Grid>
                            <div className="invite_buttons">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                >{t('invite_partner_button')}</Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        //setInvitations({}) //rest all form data
                                    }}
                                    disabled={isSubmitting}
                                >{t('reset')}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default PartnerInvite
