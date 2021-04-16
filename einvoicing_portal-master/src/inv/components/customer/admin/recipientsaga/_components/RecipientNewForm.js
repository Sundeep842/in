import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid, makeStyles, InputLabel, Select, FormControl, MenuItem } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux"
import { useRecipientSlice } from '../slice'
import { selectError, selectLoading, selectIsFormSubmitted, selectRecipientId, selectRecipientGstinMappings, selectAllGstins } from '../slice/selectors'
import RecipientEmail from '../_components/RecipientEmail'
import RecipientFTP from '../_components/RecipientFTP'
import RecipientWeb from '../_components/RecipientWeb'
import { Multiselect } from 'multiselect-react-dropdown'
import { useNavigate, Navigate } from 'react-router-dom';
import $ from 'jquery'
import "../../recipientsaga/Recipient.css"
const useStyles = makeStyles((theme) => ({
  legend: {
    color: theme.palette.primary.main
  },
  searchBox: {
    border: "none",
    borderBottom: "1px solid blue",
    borderRadius: "0px"
  }
}));
function RecipientNewform() {
  const options = useSelector(selectAllGstins)
  console.log(options)
  const dispatch = useDispatch()
  const { actions } = useRecipientSlice()
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const isSubmitted = useSelector(selectIsFormSubmitted)
  const { t } = useTranslation()
  const _recipientId = useSelector(selectRecipientId)
  const [getValue, setGetValue] = useState("");
  const [getDel, setGetDel] = useState("");
  const [data, setData] = useState(null)
  const gstinList = useSelector(selectAllGstins)
  const classes = useStyles()


  const params = {
    recipientId: _recipientId
  }


  const recipients = {
    recipientId: "",
    recipientTag: "",
    deliveryMode: "",
    description: "",
    isActive: 'true',
    deliveryMechanism: "",
    recipientGstinMappings: []
  }

  const _validationSchema = Yup.object().shape({
    //   recipientId: Yup.string().max(7).required(t('recipient_id_required')),
    //   recipientTag: Yup.string().max(15).required(t('recipient_tag_required')),
    //   // deliveryMode: Yup.string().max(255).required(t('delivery_mode_required')),
    //   recipientGstinMappings: Yup.string().required(t('GSTN_mapping_require')),
    //   description: Yup.string().required(t('description_require')),
    //   isActive: Yup.string().max(255).required(t('is_active_required')),
    //   deliveryMechanism: Yup.string().required(t('description_require')),
  })


  const onSelect = (data) => {
    setData(data)
  }
  const onRemove = (data) => {
    console.log(data)
    setData(data)
  }
  const submitForm = (values) => {

    let dmode = $("input[name=deliveryMode]").val();
    console.log(dmode)
    values.deliveryMode = dmode;
    let delmech = $("input[name=deliveryMechanism]").val();
    console.log(delmech)
    values.deliveryMechanism = delmech
    console.log(values);
    dispatch(actions.recipient(values))
  }
  const useEffectOnMount = (effect) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    console.log("useeffect mount called")
    dispatch(actions.loadFormDetails());
  });

  console.dir(params)
  return (

    <div>

      {isSubmitted && <Navigate to="/app/customer_admin/recipients" />}
      {/* <h1>Recipient Saga form</h1> */}
      <Formik
        initialValues={recipients, params}
        //  validationSchema={_validationSchema}
        onSubmit={(values) => {
          alert('called')
          submitForm(values)
          console.log(values)
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, handleReset, touched, errors, handleChanged }) => (
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="">{t('Recipients')}</h4>
                    <div style={{ textAlign: 'right' }}>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <TextField
                            type="text"
                            variant="standard"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="recipientId"
                            fullWidth
                            value={values.recipientId}
                            margin="normal"
                            // helperText={touched.recipientId && errors.recipientId}
                            // error={Boolean(touched.recipientId && errors.recipientId)}
                            label={t('recipientId')}
                          // variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            className="mt-20"
                            type="text"
                            variant="standard"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="recipientTag"
                            fullWidth
                            label={t('recipientTag')}
                            // variant="outlined"
                            value={values.recipientTag}
                          // error={Boolean(touched.recipientTag && errors.recipientTag)}
                          // helperText={touched.recipientTag && errors.recipientTag}
                          />
                        </Grid>

                        <Grid item xs={4}>
                          {/* <div className="col-md-6" style={{ 'marginTop': '22px' }}> */}
                          <FormControl
                            fullWidth
                          // variant="outlined"
                          >
                            <InputLabel>{t('is_active')}</InputLabel>
                            <Select
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="isActive"
                              label={t('isActive')}
                              value={values.isActive}
                              defaultValue='true'

                              color="primary"
                            // variant="outlined"
                            // error={Boolean(touched.isActive && errors.isActive)}
                            // helperText={touched.isActive && errors.isActive}
                            >
                              <MenuItem value="true">yes</MenuItem>
                              <MenuItem value="false">no</MenuItem>

                            </Select>

                          </FormControl>
                          {/* </div> */}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <FormControl
                            fullWidth
                          >
                            <label style={{
                              "margin-right": "auto"
                            }}>{t('GstinMappings')}</label>
                            <Multiselect
                              options={options}
                              displayValue="gstin"
                              onSelect={onSelect}
                              onRemove={onRemove}
                              showCheckbox={true}
                              style={{ searchBox: { border: "none", "border-bottom": "1px solid", "border-radius": "0px", "margin-top": "9px" } }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            className="mt-20"
                            type="text"
                            variant="standard"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="description"
                            fullWidth
                            multiline
                            rows={3}
                            label={t('description')}
                            value={values.description}
                          // error={Boolean(touched.description && errors.description)}
                          // helperText={touched.description && errors.description}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <h4 className="">{t('Address')}</h4>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <TextField
                          className="mt-20"
                          type="text"
                          variant="standard"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="pincode"
                          fullWidth
                          label={t('pin_code')}
                          value={values.pincode}
                        // error={Boolean(touched.recipientTag && errors.recipientTag)}
                        // helperText={touched.recipientTag && errors.recipientTag}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          className="mt-20"
                          type="text"
                          variant="standard"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="state"
                          fullWidth
                          label={t('State')}
                          value={values.state}
                        // error={Boolean(touched.recipientTag && errors.recipientTag)}
                        // helperText={touched.recipientTag && errors.recipientTag}
                        />
                      </Grid>


                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <TextField
                          className="mt-20"
                          type="text"
                          variant="standard"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="address1"
                          fullWidth
                          multiline
                          rows={4}
                          label={t('Address1')}
                          value={values.address1}
                        // error={Boolean(touched.description && errors.description)}
                        // helperText={touched.description && errors.description}
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <TextField
                          className="mt-20"
                          type="text"
                          variant="standard"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="address2"
                          fullWidth
                          multiline
                          rows={4}
                          label={t('Address2')}
                          value={values.address2}
                        // error={Boolean(touched.description && errors.description)}
                        // helperText={touched.description && errors.description}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>




               <div class="row">
                {/* <div className="col-md-12">  */}
                  <div className="col-md-4">
                    <h4>{t("Delivery")}</h4>
                    
                     

                        <div className="col-md-6" style={{ 'marginTop': '22px' }}>
                          <FormControl
                            fullWidth
                          // variant="outlined"
                          >
                            <InputLabel>{t('deliveryMechanism')}</InputLabel>
                            <Select
                              id="deliveryMechanism"
                              onChange={(e) => setGetDel(e.target.value)}
                              // onChange={handleChange}
                              onBlur={handleBlur}
                              name="deliveryMechanism"
                              label={t('deliveryMechanism')}
                              value={values.deliveryMechanism}
                              color="primary"
                            // variant="outlined"
                            // error={Boolean(touched.deliveryMechanism && errors.deliveryMechanism)}
                            // helperText={touched.deliveryMechanism && errors.deliveryMechanism}
                            >
                              <MenuItem value="push">Push</MenuItem>
                              <MenuItem value="pull">Pull</MenuItem>

                            </Select>

                          </FormControl>
                        </div>
                        </div>
                   
                      


                        <div className="col-md-4">
                          {getDel === 'push' ? (
                            <div  className="">
                              <h4 className="">{t("DeliveryMode")}</h4>
                              <div className="col-md-6" style={{ 'marginTop': '22px' }}>
                                <FormControl
                                  fullWidth
                                >
                                  <InputLabel>{t('deliveryMode')}</InputLabel>
                                  <Select
                                    id="deliverymode"
                                    onChange={(e) => setGetValue(e.target.value)}
                                    onBlur={handleBlur}
                                    name="deliveryMode"
                                    label={t('deliveryMode')}
                                    value={values.deliveryMode}
                                    color="primary"
                                  // error={Boolean(touched.deliveryMode && errors.deliveryMode)}
                                  // helperText={touched.deliveryMode && errors.deliveryMode}
                                  >
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="ftp">FTP</MenuItem>
                                    <MenuItem value="webservices">WebServices</MenuItem>
                                  </Select>
                                </FormControl>
                                </div>
                                </div>

                               
                                 
                                // <div >
                                //   {getValue === 'email' ?

                                //     <RecipientEmail />
                                //     : null}
                                //   {getValue == "ftp" ?
                                //     <RecipientFTP />
                                //     : null}

                                //   {getValue == "webservices" ?
                                //     <RecipientWeb />
                                //     : null
                                //   }
                                // </div>
                              
                          )
                            : (<></>)}
                        </div>
                        <div  className="col-md-4">
                                 {getValue === 'email' ?

                                     <RecipientEmail />
                                     : null}
                                   {getValue == "ftp" ?
                                     <RecipientFTP />
                                     : null}

                                   {getValue == "webservices" ?
                                   <RecipientWeb />
                                     : null
                                   }
                                 </div>


                  
                 </div>
             
</div>

              <Button
                type="submit"
                color="primary"
                disabled={loading}
                variant="contained"
              >Submit
             </Button>
             {/* </div> */}
          </form>
        
        )}
      </Formik>

    </div>
  )
}
export default RecipientNewform