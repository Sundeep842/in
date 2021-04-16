import React, { useEffect, useState } from 'react'
import {
    Grid,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core'
import { Formik, useFormikContext } from 'formik'
import { useVendorMappingSlice } from '../slice'
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from '@material-ui/data-grid';
import {
    selectError,
    selectLoading,
    selectIsFormSubmitted,
    selectAllMappedVendors,
    selectedPartnerId,
    selectSearchVendor,
    selectAllVendors,
    search_data_vendors,
    selectFormSubmitted
} from '../slice/selectors';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { SearchIcon } from '@material-ui/data-grid'
import { useTranslation } from 'react-i18next'
import { store } from "../../../../../inv/store/configureStore"
import SearchVendor from './SearchVendor'
import _Input from '../../../../util/ui/form/_Input'
import $ from 'jquery'
import { Close } from '@material-ui/icons'
import InputField from '../../../../util/ui/form/InputField'
const Vendorform = (props) => {
    let rows = []
    let { uid } = useParams();
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const { actions } = useVendorMappingSlice()
    const vendorList = useSelector(selectAllMappedVendors)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    //const isSubmitted = useSelector(selectIsFormSubmitted)
    const { t } = useTranslation();
    let selectedId = useSelector(selectedPartnerId)
    let id = null;
    const openSearch = useSelector(selectSearchVendor)
    const vendorAllList = useSelector(selectAllVendors)
    const [myobj, setMyobj] = useState("")
    const [getID, setGetID] = useState(0)
    const [taskData, setTaskData] = useState({})
    const searchvendorListData = useSelector(search_data_vendors)
    const isSubmitted = useSelector(selectFormSubmitted)
    const [searchButton, setSearchButton] = useState(false)

    const useEffectOnMount = (effect) => {
        useEffect(effect, []);
    };


    useEffectOnMount(() => {
        console.log("useeffect Mapped mount called")
        //   dispatch(actions.loadMappedVendors());
        dispatch(actions.loadVendorFormDetails());
    }, []);
    const viewSearch = (e) => {
        console.log("clicked on search icon")
        navigation("/app/vendor_manager/vendorsearch", { replace: true })
    }

    // console.log("@@@@@@@@@@", myobj)
    const vendors = {
        customerPartnerId: store.getState()._loginSlice.user.partnerId,
        vendorPartnerId: myobj,
        description: "",
        // actionTaken: "",
        // actionComments: ""
    }
    //  console.log("DATAAAAAAAAAAA", vendors)
    const submitForm = (values) => {
        values.vendorPartnerId = myobj;
        console.log(values)
        dispatch(actions.vendorForm(values))
    }
    const handleVendorClick = () => {
        dispatch(actions.openSearchVendors(true))
    }

    const submitFormSearch = (values) => {
        console.log(values)
        setSearchButton(true);
        dispatch(actions.searchvendorForm(values))
    }

    const closeSearch = () => {
        dispatch(actions.closeSearchVendors(false))
    }

    const columns = [
        { field: 'partnerId', headerName: t('partnerId'), width: 200 },
        { field: 'companyName', headerName: t('companyName'), width: 250 },
    ];
    const handleCreateClose = () => {
        $('.EditUpdateTask').toggleClass("open")
    }

    const _loadRows = () => {
        let x = null;
        if (searchButton === true) {

            x = searchvendorListData.map((item, i) => ({
                ...item,
                id: i
            }))
            rows = x;


        } else {
            x = vendorAllList.map((item, i) => ({
                ...item,
                id: i
            }))
            rows = x;
        }

    }

    const handleRecipientClick = () => {
        dispatch(actions.openSearchRecipients(true))
    }
    return (
        <div className="container">
            <div className="EditUpdateTask">
                <label>ADD VENDORS</label>
                {/* {isSubmitted && <Navigate to="/app/vendor_manager/MappedVendorList"/>} */}
                <Formik
                    initialValues={vendors}
                    onSubmit={(values) => {
                        console.log(values)
                        submitForm(values)
                    }}
                >
                    {({ values, handleChange, handleBlur, handleSubmit, handleReset }) => (
                        <div>
                            <form onSubmit={handleSubmit} >
                                <Button variant="contained" color="primary" style={{ textTransform: "none", justifyItems: "flex-end", margin: "-50px 0px 0px 200px" }} onClick={handleCreateClose}>
                                    <Close fontSize="large" style={{ fontSize: "20px" }} />
                                </Button>
                                <div>               <Grid item xs={12}>
                                   
                                </Grid>
                                    {/* <SearchIcon
                                        onClick={viewSearch}
                                    /> */}
                                    {/*
                                     <FormControl variant="standard" >
                                        {/* <InputLabel>Vendor Code</InputLabel> */}
                                    {/* <div>{myobj}</div>
                                    <InputField
                                        name="partnerId"
                                        label="VendorCode"
                                        defaultValue={myobj}
                                    ></InputField>
                                    <IconButton
                                        edge="end"
                                        onClick={handleVendorClick}
                                    >
                                        <SearchIcon /> */}
                                    {/* </IconButton>   */}
                                    {/* </FormControl> */}

                                    <FormControl variant="standard"  >
                                        <InputLabel style={{margin: "-35px 0px 0px 0px"}}>Recipient Code</InputLabel>
                                        <div style={{ display: "inline-flex" }}>
                                            <InputField
                                                name="initialState.partnerId"
                                                // label="Recipient Code"
                                            />

                                            <IconButton
                                                edge="end"
                                                onClick={handleVendorClick}
                                                style={{
                                                    marginRight: " 66px",
                                                    marginTtop: "12px"
                                                }}>
                                                <SearchIcon />
                                            </IconButton>

                                        </div>

                                    </FormControl>
                                    <SearchVendor />
                                    {/* <div className="search_container">
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
                                                    submitFormSearch(values)
                                                }}
                                            >
                                                {({ values, handleChange, handleBlur, handleSubmit, handleReset }) => (
                                                    <div>
                                                        <form onSubmit={handleSubmit} >
                                                            <div >
                                                                <TextField
                                                                    style={{ margin: "-36px 60px 0px 59px" }}
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
                                                    onRowClick={(row) => {
                                                        setMyobj(row.row.partnerId)
                                                        //    console.log("PPPPP", myobj)

                                                    }}
                                                />
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={closeSearch}
                                            >
                                                {t('select')}
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div> */}

                                </div>

                                <TextField
                                    className="mt-20"
                                    type="text"
                                    variant="standard"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label={t('description')}
                                    variant="outlined"
                                    value={values.description}
                                />

                                {/* <TextField
                                className="mt-20"
                                type="text"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="actionTaken"
                                fullWidth
                                label={t('actionTaken')}
                                variant="outlined"
                                value={values.actionTaken}
                            />
                            <TextField
                                className="mt-20"
                                type="text"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange} s
                                name="actionComments"
                                fullWidth
                                multiline
                                rows={4}
                                label={t('actionComments')}
                                variant="outlined"
                                value={values.actionComments}
                            /> */}

                                <Grid item xs={12}>
                                    <MenuItem className="addTaskHolder">
                                        <Button
                                            id="close"
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                        >Ok</Button>&nbsp;&nbsp;
                                 <Button
                                            onClick={handleReset}
                                            color="primary"
                                            variant="contained"
                                        >Reset</Button>
                                    </MenuItem>
                                </Grid>

                            </form>
                        </div>
                    )}
                </Formik>
            </div>
        </div >
    )
}
export default Vendorform