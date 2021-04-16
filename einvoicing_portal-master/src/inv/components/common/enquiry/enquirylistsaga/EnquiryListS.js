import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { useEnquiryListSlice } from './slice'
import { useDispatch, useSelector } from "react-redux"
import { selectAllEnquires, selectLoading } from './slice/selectors'
import formData from '../formData'
const EnquiryItemsGrid = (props) => {

  const { t } = useTranslation();
  const [tid, setTid] = useState(0);
  const navigation = useNavigate()
  const { enquiryDetails } = formData

  const columns = [
    { field: 'enqRefId', headerName: t('enqRefId'), width: 130, hide: true },
    { field: 'name', headerName: t('name'), width: 200 },
    { field: 'contactNo', headerName: t('contactNo'), width: 180 },
    { field: 'created_date', headerName: t('Created Date'), width: 180 },
    { field: 'status', headerName: t('status'), width: 200 },
    { field: 'message', headerName: t('message'), width: 500 },
  

  ];
  let rows = []
  const dispatch = useDispatch()
  const { actions } = useEnquiryListSlice()
  const enqList = useSelector(selectAllEnquires)
  const useEffectOnMount = (effect) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    console.log("useeffect mount called")
    dispatch(actions.loadFormDetails());

  });

  const _loadRows = () => {
    const x = enqList.map((item, i) => ({
      ...item,
      id: i
    }))

    console.log(x)
    rows = x
  }

  return (
    <div>
      <Grid container  >
        <div style={{ height: '500px', width: '115%' }}>
          {enqList.length > 0 && _loadRows()}
          <DataGrid rows={rows} columns={columns} pageSize={10}
            onRowClick={(row) => {
              console.log(row)
              uid = row.row.id

              var uid = row.row.id;
              setTid(uid);
              navigation("/app/partner_manager/enquiryview/" + uid, { replace: true })
            }

            } />
        </div>
        <div>
        </div>
      </Grid>
    </div>
  )
}

const EnquiryListS = () => {

  const { t } = useTranslation()

  return (
    <div className="line_items_container">
      <EnquiryItemsGrid />
    </div>
  )
}

export default EnquiryListS