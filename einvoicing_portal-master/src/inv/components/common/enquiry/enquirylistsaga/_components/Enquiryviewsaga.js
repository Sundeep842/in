import React, { useState, useEffect } from 'react'
import {
  TextField, Button, Grid, Typography, InputLabel, Select, FormControl, Table,
  TableRow,
  TableBody,
  TableCell, MenuItem
} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import * as Yup from 'yup'
import '../../../enquiry/enquiry.css';
import { useNavigate } from 'react-router-dom'
import InputField from '../../../../../util/ui/form/InputField'
import formData from '../../formData'
import { DataGrid } from '@material-ui/data-grid';
import EnquiryListS from '../EnquiryListS';
import Enquiryviewlists from './Enquiryviewlists';
import { useEnquiryListSlice } from '../slice'
import { useDispatch, useSelector } from "react-redux"
import { selectAllEnquires, selectLoading, selectError } from '../slice/selectors'
import $ from 'jquery';


const Enquiryviewsaga = (props) => {
  let rows = []
  let { uid } = useParams();
  const { t } = useTranslation();
  const navigation = useNavigate()
  const { enquiryDetails } = formData
  const { contactNo, message, email, enquiryName, partnerType } = enquiryDetails
  let statusval=false;

  let id = null;
  let ename= null;
  let econtactNo = null;
  let eemail = null;
  let emessage = null;
  let epartnerType = null;
  let estatus = null;


  const _validationSchema = Yup.object().shape({
    // remarks: Yup.string().max(500).required(t('remarks_required')),
  })
  // let rows = []
  const dispatch = useDispatch()
  const { actions } = useEnquiryListSlice()
  const loading = useSelector(selectLoading)
  const enqList = useSelector(selectAllEnquires)
  const error = useSelector(selectError)

  const useEffectOnMount = (effect) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    console.log("useeffect mount called")
    dispatch(actions.loadFormDetails());
  },[enqList]);

  const _loadRows = () => {
    const x = enqList.map((item, i) => ({
      ...item,
      id: i
    }))
    console.log(x)
    rows = x
    rows.name = x
    id = rows[uid].enqRefId
    ename= rows[uid].name
    econtactNo = rows[uid].contactNo
    eemail= rows[uid].email
    emessage = rows[uid].message
    epartnerType = rows[uid].partnerType
    estatus=rows[uid].status
    console.log("======================================")
    console.log(uid)
    console.log(estatus)
    if(estatus==='closed'){
      statusval=true
    }

  }
  const enqview = {
    remarks: '',
    status: 'Inprogress',
    enqRefId: id,
    name: ename,
    contactNo : econtactNo,
    email : eemail,
    message : emessage,
    partnerType : epartnerType
  }


  const submitForm = (values) => {

    values.enqRefId = rows[uid].enqRefId
    values.name= rows[uid].name
    values.contactNo = rows[uid].contactNo
    values.email= rows[uid].email
    values.message = rows[uid].message
    values.partnerType = rows[uid].partnerType
    console.log(values)
    dispatch(actions.enquiryview(values))

  }
  const changeClose=(values)=>{
    // e.preventDefault()
    // console.log("change remarks called")
    // $('.showRemarks').hide();
    // navigation("/app/partner_manager/enquires", { replace: true })
    // console.log(values)
    $('.showRemarks').hide();
    values.enqRefId = rows[uid].enqRefId
    values.name= rows[uid].name
    values.contactNo = rows[uid].contactNo
    values.email= rows[uid].email
    values.message = rows[uid].message
    values.partnerType = rows[uid].partnerType
    values.status="closed";
    console.log(values)
     dispatch(actions.statusChanged(values))
  }
  

  return (
    <div>
    
      <Grid container>
        {enqList.length > 0 && _loadRows()}
        <Grid xs={6}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="rowLabel">{enquiryName.label}</TableCell>
                <TableCell>{rows[uid].name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="rowLabel">{contactNo.label}</TableCell>
                <TableCell>{rows[uid].contactNo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="rowLabel">{email.label}</TableCell>
                <TableCell>{rows[uid].email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="rowLabel">{message.label}</TableCell>
                <TableCell>{rows[uid].message}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="rowLabel">{partnerType.label}</TableCell>
                <TableCell>{rows[uid].partnerType}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Grid container spacing={3}>
            <Grid item xs={6}>

            </Grid>
          </Grid>
          <Formik
            initialValues={enqview}
            validationSchema={_validationSchema}
            onSubmit={(values) => { submitForm(values) }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, handleReset, touched, errors, }) => (
              <form onSubmit={handleSubmit}>

               { statusval !==true?(<div className="showRemarks">
                <TextField
                  className="mt-20"
                  type="text"
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="remarks"
                  placeholder={t('remarks_enter')}
                  fullWidth
                  multiline
                  rows={4}
                  label={t('remarks_enter')}
                  // variant="outlined"
                  value={values.remarks}
                //  error={Boolean(touched.remarks && errors.remarks)}
                //  helperText={touched.remarks && errors.remarks}
                />
                
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={loading}
                  style={{"margin": "21px 0px 0px 38px"}}
                >
                  {t('Add Remarks')}
                  
                </Button>
                <Button
                
                onClick={(e)=>changeClose(values) }
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={loading}
                  style={{"margin": "21px 0px 0px 38px"}}
                >
                  {t('Close')}
                </Button>
                
                </div> ):
                (<></>)
               }
              
                
              </form>
            )}
          </Formik>
        </Grid>



        <div>
          {/* Right side grid start */}
          <Grid xs={6}>
            <div style={{
              height: '500px', width: '1000%',
              flexgrow: "100",
              maxwidth: "100",
              flexbasis: "50%"
            }}>
              <h1>History</h1>
              {/* <EnquiryListS /> */}
              <Enquiryviewlists id={uid}/>
            </div>
          </Grid>
        </div>
      </Grid>
    </div>

  )
}

export default Enquiryviewsaga