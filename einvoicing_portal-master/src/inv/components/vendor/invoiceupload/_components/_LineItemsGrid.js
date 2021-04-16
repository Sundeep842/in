import React, { 
     useState } from 'react'
import {
    DataGrid
} from '@material-ui/data-grid'
import {
    Button,
    IconButton
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import LineItemsEntry from './LineItemsEntry'
import { useTranslation } from 'react-i18next'

const _default = {
    id: -1,
    item_description: '',
    is_service: false,
    hsn_code: '',
    barcode: '',
    quantity: 0.0,
    free_qty: 0.0,
    unit_of_measurement: '',
    item_price: 0.0,
    gross_amount: 0.0,
    item_discount_amount: 0.0,
    pre_tax_value: 0.0,
    item_taxable_value: 0.0,
    gst_rate: 0.0,
    sgst_utgst_amt: 0.0,
    cgst_amt: 0.0,
    igst_amt: 0.0,
    comp_cess_rate_ad_valorem: 0.0,
    comp_cess_amt_ad_valorem: 0.0,
    comp_cess_amt_non_ad_valorem: 0.0,
    state_cess_rate_ad_valorem: 0.0,
    state_cess_amt_ad_valorem: 0.0,
    state_cess_amt_non_ad_valorem: 0.0,
    other_charges_item_level: 0.0,
    item_total_amt: 0.0,
    batch_number: 0.0,
    batch_expiry_date: "",
    warranty_date: ""
}



const LineItemsGrid = (props) => {
    console.log(props)
    const { t } = useTranslation()
    const [openLineItem, setOpenLineItem] = useState(false)
    const [index, setIndex] = useState(-1)
    const {lineItems , insert , remove } = props
    const columns = [
        { field: 'item_description', headerName: t('item_description'), width: 100 },
        { field: 'hsn_code', headerName: t('hsn_code'), width: 100 },
        { field: 'quantity', headerName: t('quantity'), width: 100 },
        { field: 'item_price', headerName: t('item_price'), width: 100 },
        {
            field: 'edit_item', headerName: t('edit_item'), width: 150, renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => editLineItem(params)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => removeLineItem(params)}
                    >
                        <RemoveIcon />
                    </IconButton>
                </>

            )
        }
    ]

    let rows = []
    lineItems.forEach((_lineItem) => {
         rows.push(_lineItem)
     })
    


    const removeLineItem = (e) => {
         remove(e.rowIndex)
    }

    const editLineItem = (e) => {
        setIndex(e.rowIndex)
        setOpenLineItem(!openLineItem)
    }

    const addNewLineItem = () => {
         _default.id = lineItems.length + 1
         insert(_default)
    }

    const changeGridIndex = (params) => {
        lineItems[params.index] = params.values
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => addNewLineItem()}
            >{t('add_new_line_item')}</Button>
             <LineItemsEntry openLineItem={openLineItem} setOpenLineItem={setOpenLineItem} index={index} changeGridIndex={(params) => changeGridIndex(params)} item={lineItems[index]}/>
        </div>

    )
}
export default React.memo(LineItemsGrid)