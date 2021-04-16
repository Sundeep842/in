
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ENQUIRY_API_END_URL } from '../../../constants/Constants'
import { invokeAPIGetRequest } from '../../../../Request'
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
function EnquiryList(props) {

  const data = []
  const [rows, setRows] = useState([]);
  const [tid, setTid] = useState(0);
  const { t } = useTranslation();
  const navigation = useNavigate()
  const columns = [
    { field: 'enqRefId', headerName: t('enqRefId'), width: 130, hide: true },
    { field: 'name', headerName: t('name'), width: 200 },
    { field: 'contactNo', headerName: t('contactNo'), width: 180 },
    { field: 'email', headerName: t('email'), width: 200 },
    { field: 'message', headerName: t('message'), width: 500 },

  ];

  useEffect(async () => {
    try {
      console.log("OMG")
      const _contact = await invokeAPIGetRequest(ENQUIRY_API_END_URL, {}, false);
      console.log(_contact)
      let results = _contact.results;
      for (let i = 1; i <= results.length; i++) {

        data.push({
          id: i,
          enqRefId: results[i - 1].enqRefId,
          name: results[i - 1].name,
          contactNo: results[i - 1].contactNo,
          email: results[i - 1].email,
          message: results[i - 1].message
        })
      }
      console.log(_contact)
      setRows(data);
    } catch (error) {
      let message = t(error.errorCode)
    }
  }, [])
  return (
    <>
      <Grid container  >
        <div style={{ height: '500px', width: '115%' }}>

          <DataGrid rows={rows} columns={columns}  pageSize={10} radioSelection
            onRowClick={(row) => {
              console.log('datagrid row clicked')
              uid = row.row.enqRefId
              var uid = row.row.enqRefId;
              setTid(uid);
              navigation("/app/partner_manager/enquiryview/" + uid, { replace: true })
            }}
          ></DataGrid>
        </div>
        <div>
        </div>
      </Grid>


    </>
  )
}

export default EnquiryList;
