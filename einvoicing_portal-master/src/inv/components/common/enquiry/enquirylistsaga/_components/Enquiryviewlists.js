import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { selectAllEnquires, selectLoading, selectFormSubmission } from '../slice/selectors'
import { DataGrid } from '@material-ui/data-grid';
import { Grid } from '@material-ui/core'
import { useEnquiryListSlice } from '../slice'
import { useDispatch, useSelector } from "react-redux"


const Enquiryviewlists = (props) => {

  const { t } = useTranslation();
  const [tid, setTid] = useState(0);
  const navigation = useNavigate()
  const [display, setDisplay] = useState([]);

  const columns = [
    { field: 'enqRefId', headerName: t('enqRefId'), width: 130, hide: true },
    { field: 'remarks', headerName: t('Remarks'), width: 200 },
    // { field: 'actionBy', headerName: t('ActionBy'), width: 200 },
    { field: 'actionOn', headerName: t('ActionOn'), width: 200 },


  ];
  let rows = []
  const dispatch = useDispatch()
  const { actions } = useEnquiryListSlice()
  const enqList = useSelector(selectAllEnquires)
  const useEffectOnMount = (effect) => {
    useEffect(effect, [selectFormSubmission]);
  };

  useEffectOnMount(() => {
    console.log("useeffect mount called")
    dispatch(actions.loadFormDetails());

  });

  const _loadRows = () => {
    
    enqList[props.id].enquiryActivities.map((item2, j) => {
      console.log(j)
      rows.push({ id: item2.id, remarks: item2.remarks, actionBy: item2.actionBy, actionOn: item2.actionOn })
    })
    console.log(rows);

  }


  return (
    <div>
      <Grid container  >
        <div style={{ height: '30vh', width: '100%' }}>
          {/* {enqList.length} */}
          {enqList.length > 0 && _loadRows()}
          <DataGrid rows={rows} columns={columns} pageSize={4}

          />
        </div>
        <div>
        </div>
      </Grid>
    </div>
  )

}
export default Enquiryviewlists