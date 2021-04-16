import React from 'react'
import {
    Grid,
    makeStyles
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import '../styles.css'
import InputField from '../../../../../util/ui/form/InputField'

const useStyles = makeStyles((theme) => ({
    legend : {
        color: theme.palette.primary.main,
    }
}));


const InvoiceQueries = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    return (
        <>
            
                <h4 >{t('Invoice Queries')}</h4>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceQueries.query_ref_id"
                            label={t('query_id')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceQueries.document_ref_id"
                            label={t('document_id')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceQueries.query_type"
                            label={t('query_type')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceQueries.query_text"
                            label={t('query_text')}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputField
                            name="invoiceQueries.query_from"
                            label={t('query_from')}
                        />
                    </Grid>
                </Grid>
                   
        </>
    )
}

export default React.memo(InvoiceQueries)