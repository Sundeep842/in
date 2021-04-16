import { Form,Formik} from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next';
import  './vendorform.css'
import * as Yup from 'yup'
import { TextField,Button} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import VendorSearch from './VendorSearch';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Close, ListAlt, LowPriorityRounded, NotInterested, PriorityHighRounded,StarBorder } from '@material-ui/icons';

const  Vendorform=(props) =>{
  // let { uid } = useParams();
  // console.log(uid)
    const vendors={
        customerPartnerId:"",
        vendorPartnerId:"",
        description:""
    }
  
 
    const { t } = useTranslation()
    const navigation = useNavigate()
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
  };
 const viewSearch=(e)=>{
   console.log("clicked on serach icon")
   navigation("/app//vendor_admin/vendorsearch", { replace: true })

 }
      const onSubmit= values=>{
          console.log('Form data',values)
      }
 
   
    return (
      <>
     
      <Formik initialValues={vendors}  onSubmit={onSubmit}>
      {({ values, handleBlur, handleChange, touched, errors, isSubmitting, handleSubmit }) => (
      
    <div>
      <div>
        <label>Select Vendor</label>
        <SearchIcon 
        onClick={viewSearch}
        />
       
      </div>
     
      <TextField
                      className="mt-20"
                      type="text"
                      variant="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="description"
                      fullWidth
                      multiline
                      rows={4}
                      label={t('description')}
                      variant="outlined"
                      value={values.description}
                    />
                    <Button color="secondary" type="submit" disabled={isSubmitting}
                    className="btn-blue btn-login">
                  Ok
                </Button>
                </div>
      )}


      </Formik>
      
      </>
        
    )
}

export default Vendorform