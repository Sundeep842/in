import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { useVendorMappingSlice } from '../slice'
import { useDispatch, useSelector } from "react-redux"
import { selectAllVendors } from '../slice/selectors'
import '../_components/vendorform.css'
import Vendorform from '../_components/Vendorform';
import {VENDORSEARCH_API_END_URL} from '../../../../constants/Constants'
import {invokeAPIGetRequest} from  '../../../../../Request'
import $ from 'jquery'

const VendorAllItemsGrid = (props) => {

  const { t } = useTranslation();
  const [tid, setTid] = useState(0);
  const navigation = useNavigate()
  const columns = [
    { field: 'partnerId', headerName: t('partnerId'), width: 200 },
    { field: 'companyName', headerName: t('companyName'), width: 250 },
  ];

  let rows = []
  const dispatch = useDispatch()
  const { actions } = useVendorMappingSlice()
  const vendorAllList = useSelector(selectAllVendors)
  

  const useEffectOnMount = (effect) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    console.log("use effect mount vendor search called")
    dispatch(actions.loadVendorFormDetails());
  });

  const _loadRows = () => {
    const x = vendorAllList.map((item, i) => ({
      ...item,
      id: i
    }))
    rows = x;
  }

  return (
    <div>
      <div style={{ height: "1000px" }}>
        <div className="search_wrapper" >
          <input type="text" id="Search_cntrl" placeholder="Search..." />
          <input
            type="submit"
            value="Search"
            color="primary"
            variant="contained"
            onClick={async () => {
              const _vendorsearch = await invokeAPIGetRequest(VENDORSEARCH_API_END_URL, true);
              console.log(_vendorsearch)
            }
            }
          />
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          {vendorAllList.length > 0 && _loadRows()}
          <DataGrid rows={rows} columns={columns} pageSize={10}

            onRowClick={(row) => {
              console.log(row.row.partnerId + 'datagrid row clicked')
              uid = row.row.partnerId
              var uid = row.row.partnerId;
              setTid(uid);

              if (window.confirm('Do You want to select the vendor with id :' + uid)) {
                console.log("if")
                navigation("/app/vendor_manager/vendorform/" + uid, { replace: true })
                //   $('.EditUpdateTask').toggleClass("open")

              } else {

                console.log("else")
              }

            }}
          ></DataGrid>
          <Button color="primary"
          >Ok</Button>
        </div>
      </div>
      <div className="EditUpdateTask">
        <Vendorform id={tid} />
      </div>
    </div>
  )
}

const VendorSearch = () => {
  const { t } = useTranslation()
  return (
    <div className="line_items_container">
      <VendorAllItemsGrid />
    </div>
  )
}
export default VendorSearch