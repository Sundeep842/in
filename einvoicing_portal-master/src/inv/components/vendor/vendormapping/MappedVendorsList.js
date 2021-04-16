import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'
import { useVendorMappingSlice } from './slice'
import { useDispatch, useSelector } from "react-redux"
import { selectAllMappedVendors, selectLoading } from './slice/selectors'
import './_components/vendorform.css'
import Vendorform from './_components/Vendorform';
import $ from 'jquery'


const VendorItemsGrid = (props) => {

    const { t } = useTranslation();
    const [tid, setTid] = useState(0);
    const navigation = useNavigate()

    const columns = [
        { field: 'customerPartnerId', headerName: t('customerPartnerId'), width: 200 },
        { field: 'vendorPartnerId', headerName: t('vendorPartnerId'), width: 200 },
        { field: 'description', headerName: t('description'), width: 200 }
    ]

    let rows = [];
    let id = null;
    const dispatch = useDispatch()
    const { actions } = useVendorMappingSlice()
    const vendorList = useSelector(selectAllMappedVendors)
    const useEffectOnMount = (effect) => {
        useEffect(effect, []);
    };

    useEffectOnMount(() => {
        console.log("useeffect Mapped mount called")
        dispatch(actions.loadMappedVendors());
    });
    const changeForm = (e) => {
        $('.EditUpdateTask').toggleClass("open")
    }

    const _loadRows = () => {
        const x = vendorList.map((item, i) => ({
            ...item,
            id: i
        }))
        rows = x;
        id = rows[0].customerPartnerId
     //   console.log("ROWWWWWW", id)
    }

    return (
        <div>
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
                <div style={{ height: '500px', width: '115%' }}>
                    {vendorList.length > 0 && _loadRows()}
                    <DataGrid rows={rows} columns={columns} pageSize={10}
                        onRowClick={(row) => {
                            console.log('datagrid row clicked')
                            console.log("row.row", row.row)
                        }
                        } />
                </div>
                <div>
                </div>
            </Grid>
            <div className="EditUpdateTask">
                <Vendorform />
            </div>
        </div>
    )
}

const MappedVendorsList = () => {

    const { t } = useTranslation()
    return (
        <div className="line_items_container">
            <VendorItemsGrid />
        </div>
    )
}

export default MappedVendorsList