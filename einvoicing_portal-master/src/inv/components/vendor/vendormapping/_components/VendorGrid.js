import { DataGrid } from '@material-ui/data-grid';
import { invokeAPIGetRequest } from '../../../../../Request'
import { useTranslation } from 'react-i18next'
import { VENDORS_API_END_URL } from '../../../../constants/Constants'
import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'
import './vendorform.css'
import Vendorform from './Vendorform';
function VendorGrid(props) {
const data = [];
  const [rows, setRows] = useState([]);
  const [tid, setTid] = useState(0);
  const { t } = useTranslation(); 
  const navigation = useNavigate()

const columns = [
  { field: 'customerPartnerId', headerName: t('customerPartnerId'), width: 130 },
  { field: 'vendorPartnerId', headerName: t('vendorPartnerId'), width: 130 },
  { field: 'description', headerName: t('description'), width: 130 },
];

  useEffect(async () => {
    try {
      const _recipient = await invokeAPIGetRequest(VENDORS_API_END_URL,true);
      console.log(_recipient)
      console.log(_recipient.results)
     let results= _recipient.results;
      for (let i = 1; i <= results.length; i++) {

        data.push({
          id: i,
          customerPartnerId: results[i - 1].customerPartnerId,
          vendorPartnerId: results[i - 1].vendorPartnerId,
          description: results[i - 1].description,
        })
      }
      setRows(data);
    } catch (error) {
      let message = t(error.errorCode)
 //     console.log(error)
    }
  }, [])
   const changeForm=(e)=>{
    $('.EditUpdateTask').toggleClass("open")
   }
    //   navigation("/app/vendor_admin/vendorform", { replace: true })  }
  return (
    <>
    <div className="invite_new_button">
                <Button
                    onClick={changeForm}
                    color="primary"
                    variant="contained"
                >
                   New Vendor
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
      <div className="EditUpdateTask">
          <Vendorform/>
      </div>
    </>
  )
}

export default VendorGrid;
