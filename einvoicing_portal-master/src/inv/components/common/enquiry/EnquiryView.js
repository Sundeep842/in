import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid, Typography, InputLabel, Select, FormControl ,Table,
  TableRow,
  TableBody,
  TableCell,MenuItem} from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { invokeAPIRequest, invokeAPIGetRequest } from '../../../../Request'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ENQUIRY_API_END_URL } from '../../../constants/Constants'
import './enquiry.css';
import { useNavigate } from 'react-router-dom'
import InputField from '../../../util/ui/form/InputField'
import formData from '../enquiry/formData'
import { DataGrid } from '@material-ui/data-grid';

const EnquiryView = (props) => {
  const recipientsview = {
    remarks: "",
  }

  let { uid } = useParams();
  const { t } = useTranslation()
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  // const [invitations, setInvitations] = useState(null)
  const {enquiryDetails} = formData
  const {contactNo, message, email,enquiryName,partnerType} = enquiryDetails
  const navigation = useNavigate()
  const columns = [
    { field: 'enqRefId', headerName: t('enqRefId'), width: 130, hide: true },
    { field: 'name', headerName: t('name'), width: 150 },
    { field: 'contactNo', headerName: t('contactNo'), width: 150 },
    { field: 'email', headerName: t('email'), width: 100 },
    { field: 'message', headerName: t('message'), width: 200 },
  ];
  const [rows, setRows] = useState([]);
  const replyView = (e) => {
    console.log("reply clicked")
  }

  const _validationSchema = Yup.object().shape({
    status: Yup.string().required(t('status_require')),
    remarks: Yup.string().max(500).required(t('remarks_required')),
  })

  useEffect(async () => {
    try {
      let url = ENQUIRY_API_END_URL + "/";
      const _contactview = await invokeAPIGetRequest(url + uid, false);
      console.log("RESPONE Data get by ID: ")
      console.log(_contactview.results)
      let resultsss = _contactview.results
      console.log(resultsss)
      setDisplay(resultsss)
      console.log(display)
      console.log(display.name)
    } catch (error) {
      let message = t(error.errorCode)

    }
  }, [])
  return (
    <Formik
      initialValues={recipientsview}
      validationSchema={_validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values)
        let params = {
          "name": display.name,
          "contactNo": display.contactNo,
          "email": display.email,
          "message": display.message,
          "partner_type": display.partner_type,
          "status": values.status,
          "enquiryActivities": [
            {
              "action": "",
              "actionBy": "100001",
              "remarks": values.remarks
            }
          ]
        }
        setSubmitting(true)
        let url = ENQUIRY_API_END_URL + "/";
        console.log("put of enquiry called")
        const _data = await invokeAPIRequest(url + uid, params, false, "put");
        console.log("api post request end")
        console.log(_data)
        console.log(values.remarks)
        console.log("RESPONE Data get by ID: ")
        console.log(_data)
        setData(_data)
        console.log(data)
        navigation("/app/partner_manager/enquires", { replace: true })
        // } catch (error) {
        //   let message = t(error.errorCode)
        // }
      }
      }
    >
      {({ values, handleBlur, handleChange, touched, errors, isSubmitting, handleSubmit }) => (
<Grid container>
<Grid xs={6}>
        <form onSubmit={handleSubmit}>
          {/* <div className="form text-center"> */}
        
          <div>
            
          <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="rowLabel">{enquiryName.label}</TableCell>
                    <TableCell>{display.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{contactNo.label}</TableCell>
                    <TableCell>{display.contactNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{email.label}</TableCell>
                    <TableCell>{display.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{message.label}</TableCell>
                    <TableCell>{display.message}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{partnerType.label}</TableCell>
                    <TableCell>{display.partnerType}</TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div className="col-md-6" style={{ 'margin-top': '22px' }}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel>{t('status')}</InputLabel>
                    <Select
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="status"
                      label={t('status')}
                      value={values.status}
                      defaultValue="open"
                      color="primary"
                      variant="outlined"
                      error={Boolean(touched.status && errors.status)}
                    // helperText={touched.status && errors.status}
                    >
                       <MenuItem value="open">Open</MenuItem>
                           <MenuItem value="inprogress">Inprogress</MenuItem>
                           <MenuItem value="closed">Closed</MenuItem>
                    </Select>

                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <TextField
              className="mt-20"
              type="text"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              name="remarks"
              //   placeholder={t('message_enter')}
              fullWidth
              multiline
              rows={4}
              label={t('remarks_enter')}
              variant="outlined"
              value={values.remarks}
              error={Boolean(touched.remarks && errors.remarks)}
            // helperText={touched.remarks && errors.remarks}
            />


            <Button onClick={replyView} color="secondary" type="submit" disabled={isSubmitting}
              className="btn-blue btn-login"
            >Reply
                  </Button>
                  
          </div>
        </form>
        </Grid>



        <div>
          {/* Right side grid start */}
            <Grid xs={6}>    
        <div style={{  height: '500px', width: '1000%',
    flexgrow: "100",
    maxwidth: "100",
    flexbasis: "50%" }}>
          <DataGrid rows={rows} columns={columns}  pageSize={10}
            onRowClick={(row) => {
              console.log('datagrid row clicked')
              uid = row.row.enqRefId
              var uid = row.row.enqRefId;
              // setTid(uid);
              // navigation("/app/partner_manager/enquiryview/" + uid, { replace: true })
            }}
          ></DataGrid>
        </div>
        <div>
        </div>
      
            </Grid>
          </div>
        </Grid>
      

     

      
      )}
    </Formik>


  )
}

export default EnquiryView
