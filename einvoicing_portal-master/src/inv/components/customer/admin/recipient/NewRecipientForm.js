import React, { useState,useEffect } from 'react'
import { TextField, Button, Grid, Typography,InputLabel,Select,FormControl } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { invokeAPIGetRequest, invokeAPIRequest } from '../../../../../Request'
import { useTranslation } from 'react-i18next'
import { RECIPIENTID_API_END_URL, RECIPIENT_API_END_URL } from '../../../../constants/Constants'
import RecipientEmail from './RecipientEmail'
import RecipientFTP from './RecipientFTP'
import RecipientWeb from './RecipientWeb'
import axios from "axios";
//import Store from '../../../../redux/Store'


const NewRecipientForm = (props) => {

  const recipients = {
    recipientId: "",
    recipientTag: "",
    deliveryMode: "",
    description: "",
    isActive: 'yes',
    recipientGstinMappings: ""
  }

  
  const { t } = useTranslation()
  const [data, setData] = useState([]);
  const [recipientid,setRecipientid]=useState("")
  const [getValue,setGetValue]= useState("");
 

 
   const _validationSchema = Yup.object().shape({
    recipientId: Yup.string().max(7).required(t('recipient_id_required')),
    recipientTag: Yup.string().max(15).required(t('recipient_tag_required')),
    // deliveryMode: Yup.string().max(255).required(t('delivery_mode_required')),
    recipientGstinMappings:Yup.string().required(t('GSTN_mapping_require')),
    description:Yup.string().required(t('description_require')),
    isActive:Yup.string().max(255).required(t('is_active_required')),

   })
 


 const  handleChanged=(e)=>{
    const selectedValue=e.target.value;
    setGetValue(selectedValue)
    console.log(selectedValue)
    console.log(getValue)
   
  }
  
  useEffect(async () => {
    try {
      const _recipientID = await invokeAPIGetRequest(RECIPIENTID_API_END_URL,true);
      console.log(_recipientID.results)
      setRecipientid(_recipientID.results)
    } catch (error) {
      let message = t(error.errorCode)
    }
  }, [])
  // useEffect(async () => {
  //   console.log("USEEFFECT")
  //   try {
  //     let myparams=  
  //     {
  //         "deliveryMode": "email",
  //                "description": "mytest request here",
  //                "recipientActivities": [
  //                    {
  //                        "actionBy": "010001",
  //                        "actionComments": "testing",
  //                        "activityType": "submit"
  //                    }
  //                ],
  //                "recipientEmailMappings": [
  //                    {
  //                        "emailAddress": "test@gmail.com"
  //                    }
  //                ],
  //                "recipientFtpMappings": [],
  //                "recipientGstinMappings": [{
  //                    "gstin_tag":"test"
     
  //                }],
  //                "recipientTag": "test",
  //                "recipientWebserviceMappings": []
  //            };

  //            console.log(myparams)
  //          //const _data = await invokeAPIRequest(RECIPIENT_API_END_URL,myparams,true,"post");
  //          const securityToken = Store.getState().user.securityToken
  //         //  options.headers["Authorization"] = "Bearer " + securityToken
  //         //  options.headers["Access-Control-Allow-Origin"] = "*"

  //          const config = {
  //           headers: {
  //             "Authorization":   "Bearer " + securityToken,
  //             "Access-Control-Allow-Origin": "*",
  //             "Accept": "application/json, text/plain, */*", 
  //             "Content-Type": "application/json;charset=utf-8"
  //           }
  //         }
  //         console.log("request ::: =================")
  //         console.log(myparams)


  //          axios
  //          .post(RECIPIENT_API_END_URL,myparams,config).then((response) => {
  //            console.log("response ::: =================")
  //            console.log(response)
  //          }).catch(error => {
  //           console.log(error)
  //         })
          
  //   } catch (error) {
  //     let message = t(error.errorCode)

  //   }
  // }, [])

  return (
    <Formik
      initialValues={recipients}
      validationSchema={_validationSchema}
      onSubmit={async (values, { setSubmitting}) => {
      
        let params={
          "deliveryMode": "email",
          "description": values.description,
          "isActive": values.isActive,
          "recipientActivities": [
            
              {
                "actionComments": "testing",
                "activityType": "submit",
            }
            
          ],
          "recipientEmailMappings": [
              {
                  "emailAddress": "test",
              }
          ],
          "recipientFtpMappings": [{
            // "recipientId":values.recipientId,
            "ftp_server": "",
            "ftp_location": "",
            "user_name": "",
            "password":" "
          }],
          "recipientGstinMappings": [{
            "gstin": null,
            "gstinTag": null,     
          }],
          // "recipientId": values.recipientId,
          "recipientTag": values.recipientTag,
          "recipientWebserviceMappings": [{
            // "recipientId":values.recipientId,
            "url":"",
            "user_name":"",
            "password":""
          }]
      } ;
      // setSubmitting(true)
      let _contact = await invokeAPIRequest(RECIPIENT_API_END_URL, params, true, "post");
      console.log(_contact)
      // navigation('/contact/success', { replace: true })
      //     .catch((error) => {
      //       setSubmitting(false)
      //  })
    }}
  
      //  setSubmitting(true)
      //     const securityToken = Store.getState().user.securityToken;
      //      const config = {
      //       headers: {
      //         "Authorization":   "Bearer " + securityToken,
      //         "Access-Control-Allow-Origin": "*",
      //         "Accept": "application/json, text/plain, */*", 
      //         "Content-Type": "application/json;charset=utf-8"
      //       }
      //     }
      //     console.log("request ::: =================")
      //     console.log(params)
      //     console.log(config)
         
      //      axios
      //      .post(RECIPIENT_API_END_URL,params,config).then((response) => {
      //        console.log("response ::: =================");
      //        console.log(response)
      //      }).catch(error => {
      //       console.log(error)
      //     })
    >
      {({ values, handleBlur, handleChange, touched, errors, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="form text-center">
            {/* <div className="logo ">
              <div className="col-md-12">
                <Typography variant='h3' style={{
                  color: "#7f3d9a", fontWeight: "Bold",
                  fontSize: "34px",
                  float: "left"
                }}> New Recipient Form</Typography>
              </div>
            </div> */}
            <Grid container spacing={3}>
            <Grid item xs={6}>
            <TextField
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="recipientId"
              // placeholder={t('name_enter')}
              fullWidth
              value={recipientid}
              margin="normal"
              helperText={touched.recipientId && errors.recipientId}
              error={Boolean(touched.recipientId && errors.recipientId)}
              label={t('recipientId')}
              variant="outlined"
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="partnerId"
              //   placeholder={t('contactNo_enter')}
              fullWidth
              label={t('partnerId')}
              variant="outlined"
              value={values.partnerId}
              error={Boolean(touched.partnerId && errors.partnerId)}
              helperText={touched.partnerId && errors.partnerId}
            />
            </Grid>
            </Grid>
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="recipientTag"
              //   placeholder={t('email_enter')}
              fullWidth
              label={t('recipientTag')}
              variant="outlined"
              value={values.recipientTag}
              error={Boolean(touched.recipientTag && errors.recipientTag)}
              helperText={touched.recipientTag && errors.recipientTag}
            />
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="description"
              //   placeholder={t('message_enter')}
              fullWidth
              multiline
              rows={4}
              label={t('description')}
              variant="outlined"
              value={values.description}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />

<Grid container spacing={3}>
            <Grid item xs={6}>
              <div className="col-md-6" style={{ 'marginTop': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined" >
              <InputLabel>{t('is_active')}</InputLabel>
              <Select
                onChange={handleChange}
                onBlur={handleBlur}
                name="isActive"
                label={t('isActive')}
                value={values.isActive}
                color="primary"
                variant="outlined"
                error={Boolean(touched.isActive && errors.isActive)}
                // helperText={touched.isActive && errors.isActive}
              >
                <option value="yes">yes</option>
                <option value="no">no</option>
                
              </Select>

            </FormControl>
            </div>
            </Grid>

            <Grid item xs={6}>
            <div className="col-md-6" style={{ 'marginTop': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>{t('recipientGstinMappings')}</InputLabel>
              <Select
                onChange={handleChange}
                onBlur={handleBlur}
                name="recipientGstinMappings"
                label={t('recipientGstinMappings')}
                value={values.recipientGstinMappings}
                color="primary"
                variant="outlined"
                error={Boolean(touched.recipientGstinMappings && errors.recipientGstinMappings)}
                // helperText={touched.recipientGstinMappings && errors.recipientGstinMappings}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Select>

            </FormControl>
            </div>
            </Grid>
            </Grid>
            <div className="col-md-6" style={{ 'marginTop': '22px'}}>
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>{t('deliveryMode')}</InputLabel>
              <Select
                id="deliverymode"
                onChange={handleChanged}
                onBlur={handleBlur}
                name="deliveryMode"
                label={t('deliveryMode')}
                value={values.deliveryMode}
                color="primary"
                variant="outlined"
                error={Boolean(touched.deliveryMode && errors.deliveryMode)}
                // helperText={touched.deliveryMode && errors.deliveryMode}
              >
                <option value="email">Email</option>
                <option value="ftp">FTP</option>
                <option value="webservices">WebServices</option>
              </Select>
              </FormControl>
       
       </div>
        {getValue === 'email'?
    
      <RecipientEmail id={values.recipientId}/>
         : null }
     {getValue=="ftp"?
    <RecipientFTP id={values.recipientId}/>
       :null}
           
         {getValue == "webservices" ?
           <RecipientWeb id={values.recipientId}/>
         :null
        }
        </div>

            <Button color="secondary" type="submit" disabled={isSubmitting}
              className="btn-blue btn-login"
            >Submit
                  </Button>
         
        </form>
      )}
    </Formik>


  )
}

export default NewRecipientForm





