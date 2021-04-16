import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import React, { useState ,useEffect} from 'react';
import {invokeAPIRequest} from '../../../Request'
import { useTranslation } from 'react-i18next'
export default function AgGridUtil(props) {

  var id = [];
  const data = [];
  const { t } = useTranslation()
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rows, setRows] = useState([]);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  useEffect(async () => {
    try {
        const _grid = await invokeAPIRequest(props.url, {}, false, "get");
        setRows(_grid);
    } catch (error) {
        let message = t(error.errorCode)
    }
}, [])
  
  const rowSelectionType = props.rowSelectionType
  const onSelectionChanged = (e) => {
    var selectedRows = gridApi.getSelectedRows();
    let id = selectedRows.map(post => post.id);
    console.log(selectedRows)
    return selectedRows
  }
  const defaultColDef = {
    sortable: true, filter: true
  }

  return (
    <>
     <div className="ag-theme-alpine grid-width" style={{ width: 1200, height: 250 }}>
     <AgGridReact
              onGridReady={onGridReady}
              rowData={rows}
              defaultColDef={defaultColDef}
              rowSelection={rowSelectionType}
              onSelectionChanged={onSelectionChanged}
              pagination={true}
              enableRangeSelection={true}
              paginationAutoPageSize={true}
              columnDefs={props.columnDefs} 
            >
             
            </AgGridReact>
            </div>
    </>
  )
}
