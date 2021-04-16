import React from 'react'
import '../styles.css'
import { FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import LineItemsGrid from './_LineItemsGrid'
import { forEach } from 'lodash'

const LineItems = () => {
    const { t } = useTranslation()
    let _lineItems = []
    return (
        <div className="line_items_container">
            <FieldArray
                name="lineItemDetails"
                label="Line Items"
            >
                {(props) => {
                    _lineItems = props.form.values.lineItemDetails
                    return <LineItemsGrid lineItems={_lineItems} insert={props.push} remove={props.remove}/>
                }}
            </FieldArray>
        </div>
    )
}

export default React.memo(LineItems) // memo is because we are using large form layout 
