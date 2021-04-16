
import React from 'react'
import { useTranslation } from 'react-i18next'
// import '../styles.css'
import {
  Grid,makeStyles
} from '@material-ui/core'
import InputField from '../../../../../util/ui/form/InputField'

const useStyles = makeStyles((theme) => ({
  legend : {
      color: theme.palette.primary.main
    }
  })
)
const RecipientFTP = (props) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <div  className="col-md-4">
<h4>{t("ftp")}</h4>
      <InputField
        name="ftpServer"
        label={t('ftpServer')}
       
      />
      <InputField
        name="ftpLocation"
        label={t('ftpLocation')}
        
      />
      <InputField
        name="userName"
        label={t('userName')}
       
      />
      <InputField
        name="password"
        label={t('password')}
       
      />

</div>
    </>
  )

}
export default React.memo(RecipientFTP)
