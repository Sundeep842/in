import React from 'react'
import { useTranslation } from 'react-i18next'
import '../styles.css'
import {
    Grid
} from '@material-ui/core'
import InputField from '../../../../util/ui/form/InputField'

const EWaybillMetadata = (props) => {
    const { t } = useTranslation()
    return (
        <div className="eway_bill_container">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceEwayBillDetails.transporter_id"
                        label={t('transporter_id')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceEwayBillDetails.transportername"
                        label={t('transporter_name')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceEwayBillDetails.transmode"
                        label={t('trans_mode')}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceEwayBillDetails.transdistance"
                        label={t('trans_distance')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceEwayBillDetails.transdocno"
                        label={t('trans_doc_no')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceEwayBillDetails.vehicleno"
                        label={t('vehicle_no')}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceEwayBillDetails.vehicle_type"
                        label={t('vehicle_type')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceEwayBillDetails.transdocdate"
                        type="date"
                        label={t('trans_doc_date')}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default React.memo(EWaybillMetadata)
