import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from  '@material-ui/core'
import {useTranslation} from 'react-i18next'

const MessageDialog = ( props ) => {

  const { messageTitle , message , openMessage , setOpenMessage , callBack } = props
  const {t} = useTranslation()
  return (
    <Dialog
      open={openMessage}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>{messageTitle}</DialogTitle>
      <DialogContent>
        {message}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpenMessage(!openMessage)
            callBack()
          }}
        >
        {t('ok_button')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MessageDialog
