
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import { useRecipientSlice } from './slice'
import { useDispatch, useSelector } from "react-redux"
import { selectAllRecipients, selectLoading } from './slice/selectors'
import MetaformData from './MetaformData'
const RecipientItemsGrid = () => {

  const { t } = useTranslation();
  const [tid, setTid] = useState(0);
  const navigation = useNavigate()
  const { recipientDetails } = MetaformData
  const columns = [
    { field: 'recipientId', headerName: t('recipientId'), width: 130, hide: true },
    { field: 'recipientTag', headerName: t('recipientTag'), width: 200 },
    { field: 'description', headerName: t('description'), width: 180 },
    { field: 'deliveryMode', headerName: t('deliveryMode'), width: 200 },
  ];
  let rows = []
  const dispatch = useDispatch()
  const { actions } = useRecipientSlice()
  const recpList = useSelector(selectAllRecipients)
  const useEffectOnMount = (effect) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    console.log("useeffect mount called")
    dispatch(actions.loadFormDetails());
  });
  const _loadRows = () => {
    // alert('_loadRows called')
    const x = recpList.map((item, i) => ({
      ...item,
      id: i
    }))
    console.log(x)
    rows = x
  }
  const recipients = {
    newrecipientform: {
      recipientId: "",
      recipientTag: "",
      deliveryMode: "",
      description: "",
      isActive: 'yes',
      deliveryMechanism: "",
      recipientGstinMappings: ""
    },
    recipientemail: {
      recipientId: "",
      emailAddress: " "
    },
    recipientftp: {
      recipientId: " ",
      ftp_server: " ",
      ftp_location: "",
      user_name: "",
      password: ""
    },
    recipientweb: {
      recipientId: " ",
      url: " ",
      user_name: "",
      password: ""
    }
  }
  const changeForm = (e) => {
    navigation("/app/customer_admin/newrecipientform", { replace: true })
  }
  return (
    <div>
      <div className="invite_new_button">
        <Button
          onClick={changeForm}
          color="primary"
          variant="contained"
        >
          New Recipient
                   
        </Button>
      </div>
      <Grid container  >
        <div style={{ height: '500px', width: '115%' }}>
          {recpList.length > 0 && _loadRows()}
          <DataGrid rows={rows} columns={columns} pageSize={10}
            onRowClick={(row) => {
              console.log('datagrid row clicked')
              console.log(row)
              uid = row.row.id
              var uid = row.row.id;
              setTid(uid);
              navigation("/app/customer_admin/recipientview/" + uid, { replace: true })
            }

            } />
        </div>
        <div>
        </div>
      </Grid>
    </div>
  )
}

const Recipientstest = () => {

  const { t } = useTranslation()

  return (
    <div className="line_items_container">
      <RecipientItemsGrid />
    </div>
  )
}

export default Recipientstest