
import { DataGrid } from '@material-ui/data-grid';
import { invokeAPIGetRequest } from '../../../../../Request'
import { useTranslation } from 'react-i18next'
import { RECIPIENT_API_END_URL } from '../../../../constants/Constants'
import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

function RecipientGrid(props) {
const data = [];
  const [rows, setRows] = useState([]);
  const [tid, setTid] = useState(0);
  const { t } = useTranslation(); 
  const navigation = useNavigate()

const columns = [
  { field: 'recipientId', headerName: t('recipientId'), width: 130 ,hide:"true"},
  { field: 'recipientTag', headerName: t('recipientTag'), width: 130 },
  { field: 'description', headerName: t('description'), width: 130 },
  { field: 'deliveryMode', headerName: t('deliveryMode'), width: 130 },
];

  useEffect(async () => {
    try {
      const _recipient = await invokeAPIGetRequest(RECIPIENT_API_END_URL,true);
      console.log(_recipient.results)
     let results= _recipient.results;
      for (let i = 1; i <= results.length; i++) {

        data.push({
          id: i,
          recipientId: results[i - 1].recipientId,
          recipientTag: results[i - 1].recipientTag,
          description: results[i - 1].description,
          deliveryMode: results[i - 1].deliveryMode
        })
      }
      setRows(data);
    } catch (error) {
      let message = t(error.errorCode)
    }
  }, [])
   const changeForm=(e)=>{
      navigation("/app/customer_admin/newrecipientform", { replace: true })  }
  return (
    <>
    <div className="invite_new_button">
                <Button
                    onClick={changeForm}
                    color="primary"
                    variant="contained"
                >
                   New Recipient
                    {/* {t('Create_new_recipient ')} */}
                </Button>
            </div>
      <Grid container  >
        <div style={{ height: 300, width: '115%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} 
            onRowClick={(row) => {
              console.log('datagrid row clicked')
              uid = row.row.recipientId
              var uid = row.row.recipientId;
              setTid(uid);
              navigation("/app/customer_admin/recipientview/" + uid, { replace: true })
            }}
          ></DataGrid>
        </div>
        <div>
        </div>
      </Grid>
    </>
  )
}

export default RecipientGrid;
