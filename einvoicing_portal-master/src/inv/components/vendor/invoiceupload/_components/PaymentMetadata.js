import React from 'react'
import {
    Grid
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import InputField from '../../../../util/ui/form/InputField'

const PaymentMetadata = () => {
    const { t } = useTranslation()
    return (
        <div className="payments_container">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.payee_name"
                        label={t('payee_name')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.payee_financial_account"
                        label={t('payee_financial_account')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.modeofpayment"
                        label={t('mode_of_payment')}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.financial_institution_branch"
                        label={t('financial_institution_branch')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.credit_transfer"
                        label={t('credit_transfer')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.direct_debit"
                        label={t('direct_debit')}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.creditdays"
                        label={t('credit_days')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.payment_due"
                        label={t('payment_due')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.paid_amount"
                        label={t('paid_amount')}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.payment_terms"
                        multiline
                        rows={3}
                        label={t('payment_terms')}
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputField
                        name="invoiceSellerPaymentDetails.payment_instruction"
                        multiline
                        rows={3}
                        label={t('payment_instructions')}
                    />
                </Grid>
            </Grid>

        </div>
    )
}

export default React.memo(PaymentMetadata)
