
import React from 'react'
import { useTranslation } from 'react-i18next'
// import '../styles.css'
import {
  Grid, TextField,makeStyles
} from '@material-ui/core'
import InputField from '../../../../../util/ui/form/InputField'

const useStyles = makeStyles((theme) => ({
  legend : {
      color: theme.palette.primary.main
    }
  })
)
const RecipientEmail = (props) => {
  const { t } = useTranslation()
  const classes = useStyles()
 

  return (
    <>
    {/* <div className="row">  */}
      <div className="col-md-4">
<h4>{t("email")}</h4>
      <InputField
        name="emailAddress"
        label={t('emailAddress')}
 
      />
      </div>
      {/* // </div> */}
    

    </>
  )

}
export default React.memo(RecipientEmail)
