import React from 'react'
import {
    Button
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import dashboard_list from '../../images/dashboard_list.png'

const PartnerManagement = () => {
    const { t } = useTranslation()
    const navigation = useNavigate()

    const handleInvitation = () => {
        navigation('/app/partner/invitations/new',{replace: false})
    }


    return (
        <div className="partnerManagement">
            <div> {/** invitation actions  buttons should be RBAC in future*/}
                <Button
                    onClick={()=>handleInvitation()}
                    color="primary"
                    variant="contained"
                >
                    {t('invite_partner')}
                </Button>
            </div>

            <div>
                {/** a place to show all the existing inivtations details */}
                <img src={dashboard_list} alt="dashboard"/>
            </div>
        </div>
    )
}

export default PartnerManagement
