
import React,{ useState, useEffect } from 'react'
import './vendorform.css'
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'
import { ALLVENDORS_API_END_URL ,VENDORSEARCH_API_END_URL} from '../../../constants/Constants'
import { invokeAPIGetRequest } from '../../../../Request'
import $ from 'jquery'

 function VendorSearch() {
    const data = []
    const [rows, setRows] = useState([]);
    const [conform, setConform] = useState(false);  
    const [tid, setTid] = useState(0);
    const { t } = useTranslation();
    const navigation = useNavigate()
    const columns = [
        { field: 'partnerId', headerName: t('partnerId'), width: 200},
        { field: 'companyName', headerName: t('companyName'), width: 250 },
      ];
    //   const searchHandle=(e)=>{async=()=>{
    //         const _vendorsearch = await invokeAPIGetRequest(VENDORSEARCH_API_END_URL, true);
    //         console.log(_vendorsearch)
    //       }
    //       console.log("clicked on search" )
    //   }
    // const handleClose = () => {
    //     setOpenUpdate(false);
    // };
      useEffect(async () => {
        try {
          console.log("OMG")
          const _contact = await invokeAPIGetRequest(ALLVENDORS_API_END_URL, true);
          console.log(Object.keys(_contact.results))
          console.log(Object.values(_contact.results))
          var arrKeys=Object.keys(_contact.results);
          var arrValues=Object.values(_contact.results);
          for (let i = 1; i <= arrKeys.length; i++) {
            data.push({
              id: i,
              partnerId:  arrKeys[i-1],
              companyName: arrValues[i-1],
            })
          }
          console.log(data)
          setRows(data);
        } catch (error) {
          let message = t(error.errorCode)
        }
      }, [])
      const changeForm=(e)=>{
        $('.EditUpdateTask').toggleClass("open")
       }
    return (
      <>
       <div style={{height:"1000px"}}>
            {/* <h1>this is search page</h1> */}
            <div className="search_wrapper" >
                        <input type="text" id="Search_cntrl" placeholder="Search..." />
                        <input
              type="submit"
              value="Search"
              color="primary"
              variant="contained"
              onClick={async ()=>{
                const _vendorsearch = await invokeAPIGetRequest(VENDORSEARCH_API_END_URL, true);
                console.log(_vendorsearch)
              }
            }
            />
        </div>    
        <div style={{ height: '300px', width: '100%' }}>
          <DataGrid rows={rows} columns={columns}  pageSize={10} 
        
            onRowClick={(row) => {
              console.log(row.row.partnerId+'datagrid row clicked')
              uid = row.row.partnerId
              var uid = row.row.partnerId;
              setTid(uid);
           
              if (window.confirm('Do You want to select the vendor with id :'+uid)) {   
                  console.log("if")
                  $('.EditUpdateTask').toggleClass("open")
                //  navigation("/app/vendor_admin/vendorgrid/", { replace: true })
              }else{
                  
                console.log("else")
              }
           
            //   navigation("/app/vendor_admin/vendorform/" + uid, { replace: true })
            }}
          ></DataGrid>
          <Button color="primary" 
          >Ok</Button>
        </div>
        </div>
      </>
    )
}
export default VendorSearch