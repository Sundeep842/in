import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    Grid,
    DialogTitle,
    MenuItem,
    TextField
} from '@material-ui/core'
import '../styles.css'
import { useTranslation } from 'react-i18next'
import InputField from '../../../../util/ui/form/InputField'



const LineItemsEntry = (props) => {
    const { openLineItem, setOpenLineItem, index, changeGridIndex, item } = props
    const { t } = useTranslation()

    const getCurrentDate = () => {
        let d = new Date()
        return d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    }

    const [values, setValues] = useState({
        item_description: '',
        batch_number: '',
        is_service: '',
        hsn_code: '',
        barcode: '',
        quantity: 0.0,
        free_qty: 0.0,
        unit_of_measurement: 0.0,
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
        batch_expiry_date: getCurrentDate(),
        warranty_date: getCurrentDate()
    })

    useEffect(() => {
        if (item != undefined) {
            setValues(item);
        }
    }, [index])


    const _changeGrid = () => {
        changeGridIndex({
            index: index,
            values: {
                item_description: values.item_description,
                batch_number: values.batch_number,
                is_service: values.is_service,
                hsn_code: values.hsn_code,
                barcode: values.barcode,
                quantity: values.quantity,
                free_qty: values.free_qty,
                unit_of_measurement: values.unit_of_measurement,
                item_price: values.item_price,
                gross_amount: values.gross_amount,
                item_discount_amount: values.item_discount_amount,
                pre_tax_value: values.pre_tax_value,
                item_taxable_value: values.item_taxable_value,
                gst_rate: values.gst_rate,
                sgst_utgst_amt: values.gst_utgst_amt,
                cgst_amt: values.cgst_amt,
                igst_amt: values.igst_amt,
                comp_cess_rate_ad_valorem: values.comp_cess_rate_ad_valorem,
                comp_cess_amt_ad_valorem: values.comp_cess_amt_ad_valorem,
                comp_cess_amt_non_ad_valorem: values.comp_cess_amt_non_ad_valorem,
                state_cess_rate_ad_valorem: values.state_cess_rate_ad_valorem,
                state_cess_rate_ad_valorem: values.state_cess_rate_ad_valorem,
                state_cess_amt_non_ad_valorem: values.state_cess_amt_non_ad_valorem,
                other_charges_item_level: values.other_charges_item_level,
                item_total_amt: values.item_total_amt,
                batch_expiry_date: values.batch_expiry_date,
                warranty_date: values.warranty_date,
                id: index + 1
            }
        })
        closeDialog()
    }

    const closeDialog = () => {
        setOpenLineItem(!openLineItem)
    }


    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div className="line_items_entry_container">
            <Dialog
                open={openLineItem}
                fullWidth={true}
                maxWidth={"md"}
                onClose={closeDialog}
            >
                <DialogTitle>{t('edit_line_items')}</DialogTitle>
                <DialogContent>
                    <fieldset>
                        <legend>{t('item_details')}</legend>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('item_description')}
                                    required
                                    fullWidth
                                    type="text"
                                    margin="normal"
                                    value={values.item_description}
                                    onChange={handleChange('item_description')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('is_service')}
                                    required
                                    fullWidth
                                    select
                                    margin="normal"
                                    value={values.is_service}
                                    onChange={handleChange('is_service')}
                                >
                                    <MenuItem value={"false"}>FALSE</MenuItem>
                                    <MenuItem value={"true"}>TRUE</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('hsn_code')}
                                    required
                                    fullWidth
                                    type="text"
                                    margin="normal"
                                    value={values.hsn_code}
                                    onChange={handleChange('hsn_code')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('barcode')}
                                    required
                                    fullWidth
                                    type="text"
                                    margin="normal"
                                    value={values.barcode}
                                    onChange={handleChange('barcode')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('quantity')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.quantity}
                                    onChange={handleChange('quantity')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('free_qty')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.free_qty}
                                    onChange={handleChange('free_qty')}
                                />
                            </Grid>
                        </Grid>
                    </fieldset>
                    <fieldset>
                        <legend>{t('value_details')}</legend>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('unit_of_measurement')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.unit_of_measurement}
                                    onChange={handleChange('unit_of_measurement')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('item_price')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.item_price}
                                    onChange={handleChange('item_price')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('gross_amount')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.gross_amount}
                                    onChange={handleChange('gross_amount')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('item_discount_amount')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.item_discount_amount}
                                    onChange={handleChange('item_discount_amount')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('pre_tax_value')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.pre_tax_value}
                                    onChange={handleChange('pre_tax_value')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('item_taxable_value')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.item_taxable_value}
                                    onChange={handleChange('item_taxable_value')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('gst_rate')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.gst_rate}
                                    onChange={handleChange('gst_rate')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('sgst_utgst_amt')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.sgst_utgst_amt}
                                    onChange={handleChange('sgst_utgst_amt')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('cgst_amt')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.cgst_amt}
                                    onChange={handleChange('cgst_amt')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('igst_amt')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.igst_amt}
                                    onChange={handleChange('igst_amt')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('comp_cess_rate_ad_valorem')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.comp_cess_rate_ad_valorem}
                                    onChange={handleChange('comp_cess_rate_ad_valorem')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('comp_cess_amt_ad_valorem')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.comp_cess_amt_ad_valorem}
                                    onChange={handleChange('comp_cess_amt_ad_valorem')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('comp_cess_amt_non_ad_valorem')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.comp_cess_amt_non_ad_valorem}
                                    onChange={handleChange('comp_cess_amt_non_ad_valorem')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('state_cess_rate_ad_valorem')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.state_cess_rate_ad_valorem}
                                    onChange={handleChange('state_cess_rate_ad_valorem')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('state_cess_amt_ad_valorem')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.state_cess_amt_ad_valorem}
                                    onChange={handleChange('state_cess_amt_ad_valorem')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('state_cess_amt_non_ad_valorem')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.state_cess_amt_non_ad_valorem}
                                    onChange={handleChange('state_cess_amt_non_ad_valorem')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('other_charges_item_level')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.other_charges_item_level}
                                    onChange={handleChange('other_charges_item_level')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('item_total_amt')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.item_total_amt}
                                    onChange={handleChange('item_total_amt')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('batch_number')}
                                    required
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    value={values.batch_number}
                                    onChange={handleChange('batch_number')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('batch_expiry_date')}
                                    required
                                    fullWidth
                                    type="date"
                                    margin="normal"
                                    value={values.batch_expiry_date}
                                    onChange={handleChange('batch_expiry_date')}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label={t('warranty_date')}
                                    required
                                    fullWidth
                                    type="date"
                                    margin="normal"
                                    value={values.warranty_date}
                                    onChange={handleChange('warranty_date')}
                                />
                            </Grid>
                        </Grid>
                    </fieldset>

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            _changeGrid()
                        }}
                        variant="outlined"
                        color="primary"
                    >
                        {t('ok_button')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default React.memo(LineItemsEntry)
