
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
const RecipientWeb = (props) => {
  const { t } = useTranslation()
  const classes = useStyles()
  
  return (
    <>
      <div className="col-md-4">
<h4 >{t("webservices")}</h4>

             <InputField
                        name="url"
                        label={t('url')}
                      
                    />
                     <InputField
                        name="userName"
                        label={t('userName')}
                        // variant="outlined"
                    />
                     <InputField
                        name="password"
                        label={t('password')}
                        // variant="outlined"
                    />
                    </div>
    </>
  )
  
  }
  export default React.memo(RecipientWeb)
