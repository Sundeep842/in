import React, { useState , useEffect } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core'
import {
    selectSearchRecipient,
    selectRecipientList
} from '../slice/selector'
import { useSelector, useDispatch } from 'react-redux'
import {
    useInvoiceSlice
} from '../slice'
import { useTranslation } from 'react-i18next'
import { DataGrid } from '@material-ui/data-grid'
import { useFormikContext } from 'formik'

const SearchRecipient = () => {
    const openSearch = useSelector(selectSearchRecipient)
    const recipientList = useSelector(selectRecipientList)
    const { actions } = useInvoiceSlice()
    const [recipientId , setRecipientId] = useState(null)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { setFieldValue } =  useFormikContext()

    const closeSearch = () => {
        dispatch(actions.closeSearchRecipients(false))
    }

    useEffect(() => {
        dispatch(actions.searchRecipients())
    },[openSearch])

    const handleChange = (e) => {
        setRecipientId(e.selectionModel[0])
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 150, hide: true },
        { field: 'company_name', headerName: t('company_name'), width: 150 },
        { field: 'country', headerName: t('country'), width: 150 },
        { field: 'nature_of_business', headerName: t('nature_of_business'), width: 150 },
        { field: 'pan_no', headerName: t('pan_no'), width: 150 },
        { field: 'partner_id', headerName: t('partner_id'), width: 70, hide: true },
        { field: 'vendor_partner_id', headerName: t('vendor_partner_id'), width: 70, hide: true },
        { field: 'recipient_id', headerName: t('recipient_id'), width: 70, hide: true }
    ]

    const rows = []

    const assignRows = () => {
        recipientList.forEach((item) => {
            rows.push(Object.assign({}, item, { id: item.recipient_id }))
        })
    }
    return (
        <div className="search_container">
            {recipientList.length > 0 && assignRows()}
            <Dialog
                open={openSearch}
                onClose={closeSearch}
                fullWidth={true}
            >
                <DialogTitle>{t('search_recipients')}</DialogTitle>
                <DialogContent>
                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid columns={columns} rows={rows} pageSize={10}
                            checkboxSelection 
                            selection={{ mode: 'single' }}
                            onSelectionModelChange={(e) => handleChange(e)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => { setFieldValue('invoiceDetails.recipientCode', recipientId) ; closeSearch()}}
                    >
                        {t('select')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SearchRecipient
