import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField
} from '@material-ui/core';
import {
    selectSearchVendor,
    selectVendorList,
    selectAllVendors,
    search_data_vendors,
    selectedPartnerId

} from '../slice/selectors'
import $ from 'jquery';
import { useSelector, useDispatch } from 'react-redux'
import {
    useInvoiceSlice, useVendorMappingSlice
} from '../slice'
import { useTranslation } from 'react-i18next'
import { DataGrid } from '@material-ui/data-grid'
import { Formik, useFormikContext } from 'formik'
import Vendorform from './Vendorform';
import id from 'date-fns/locale/id';

const SearchVendor = (props) => {
    const openSearch = useSelector(selectSearchVendor)
    const { actions } = useVendorMappingSlice()
    const vendorAllList = useSelector(selectAllVendors)
    let selectedId = useSelector(selectedPartnerId)
    const [myobj, setMyobj] = useState("")
    const [getID, setGetID] = useState(0)
    var getPartnerID = "abishek";
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { setFieldValue } = useFormikContext()
    const [taskData, setTaskData] = useState({})
    const searchvendorList = useSelector(search_data_vendors)

    const closeSearch = () => {
        dispatch(actions.closeSearchVendors(false))
    }
    const handleChange = (row) => {
        alert(row.row.partnerId)
        // console.log(row)
        setMyobj(row.row.partnerId)
    }
    useEffect(() => {
        dispatch(actions.loadVendorFormDetails());
    }, [openSearch])

    const columns = [
        { field: 'partnerId', headerName: t('partnerId'), width: 200 },
        { field: 'companyName', headerName: t('companyName'), width: 250 },
    ];

    let rows = []
    const _loadRows = () => {
        const x = vendorAllList.map((item, i) => ({
            ...item,
            id: i
        }))
        rows = x;
    }
    const handleSearch = () => {
        console.log("Handle search")
    }
    let vendors = {
        search: ""
    }
    const submitForm = (values) => {
        console.log(values)
        dispatch(actions.searchvendorForm(values))
    }

    return (
        <div className="search_container">

            {vendorAllList.length > 0 && _loadRows()}
            <Dialog
                open={openSearch}
                onClose={closeSearch}
                fullWidth={true}
            >
                <DialogTitle>{t('Vendors')}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={vendors}
                        onSubmit={(values) => {
                            submitForm(values)
                        }}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit, handleReset }) => (
                            <div>
                                <form onSubmit={handleSubmit} >
                                    <div className="search_wrapper" >
                                        {/* <input type="text" id="Search_cntrl"  value={values.searchvendor} placeholder="Search Vendors..." onBlur={handleBlur}
                                onChange={handleChange} /> */}
                                        <TextField
                                            className="mt-20"
                                            type="text"
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="search"
                                            label={t('search')}
                                            value={values.search}
                                        />


                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                        >Search</Button>

                                    </div>

                                </form>
                            </div>
                        )}
                    </Formik>
                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid columns={columns} rows={rows} pageSize={10}
                            checkboxSelection
                            selection={{ mode: 'single' }}
                            // onSelectionModelChange={(row) => handleChange(row)}
                            onRowClick={(row) => handleChange(row)}
                            // onRowClick={(row) => {
                            //     setGetID(row.row.id + 1)
                            //     console.log(getID)
                            //     setTaskData(row.row);
                            //     console.log(taskData)
                            //     getPartnerID = row.row.partnerId;
                            //     setMyobj(row.row.partnerId)
                            //     console.log("PPPPP", getPartnerID)

                            //     selectedId = row.row.partnerId;
                            //     console.log("IDDDDDDDDD", selectedId)

                            //     //   $('.EditUpdateTask').toggleClass("open")

                            // }}

                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {setFieldValue('initialState.partnerId', myobj) ;closeSearch()}}
                    >
                        {t('select')}
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}

export default SearchVendor
