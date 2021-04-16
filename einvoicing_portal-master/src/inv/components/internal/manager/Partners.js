import React, { useEffect, useState } from 'react'
import { usePartnersSlice } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectError, selectLoading, selectPartners } from './slice/selectors'
import Loader from '../../../util/ui/Loader'
import './invitation.css'
import {
  Button,
  Tabs,
  Tab
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TabPanel from '../../../util/ui/tab/TabPanel'
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined'
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined'
import { DataGrid } from '@material-ui/data-grid'
import { useLoginSlice } from '../../common/authentication/slice'
import {
  selectUser
} from '../../common/authentication/slice/selectors'

const Partners = () => {
  const { actions } = usePartnersSlice()
  const dispatch = useDispatch()
  const isLoading = useSelector(selectLoading)
  const isError = useSelector(selectError)
  const partners = useSelector(selectPartners)
  useLoginSlice()
  const { t } = useTranslation()
  const navigation = useNavigate()
  const [value, setValue] = useState(0)
  const user = useSelector(selectUser)
  const VIEW_INVITATION_URL = `/app/${user.roles[0]}/partners/view_invitation`

  useEffect(() => {
    dispatch(actions.loadAllPartners())
  }, [])

  const handleInvitation = () => {
    navigation('/app/partner_manager/invite_partner', { replace: false })
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const columns = [
    { field: 'id', headerName: t('id'), width: 200, hide: true },
    { field: 'partnerId', headerName: t('partnerId'), width: 200, hide: true },
    { field: 'partnerCompanyName', headerName: t('partnerCompanyName'), width: 200 },
    { field: 'partnerContactEmail', headerName: t('partnerContactEmail'), width: 200 },
    { field: 'invSentOn', headerName: t('invSentOn'), width: 200 },
    { field: 'partnerContactPersonName', headerName: t('partnerContactPersonName'), width: 200 },
    { field: 'status', headerName: t('status'), width: 200 }
  ]

  const rows = []
  const rows1 = []
  const createGridRows = () => {
    let _partners = partners.filter((partner) => {
      return partner.status !== 'Active' && partner.status !== '' && partner.status != null
    })

    _partners.forEach((partner) => {
      var _p = {
        id: partner.regId,
        partnerCompanyName: partner.companyName,
        partnerContactEmail: partner.email,
        partnerContactPersonName: partner.personName,
        invSentOn: partner.invSentOn,
        status: partner.status
      }
      rows.push(_p)
    })

    let _partners_1 = partners.filter((partner) => {
      return partner.status == 'Active' && partner.status !== '' && partner.status != null
    })

    _partners_1.forEach((partner) => {
      var _p = {
        id: partner.regId,
        partnerCompanyName: partner.companyName,
        partnerContactEmail: partner.email,
        partnerContactPersonName: partner.personName,
        invSentOn: partner.invSentOn,
        status: partner.status
      }
      rows1.push(_p)
    })
  }



  return (
    <div className="partnerManagement">
      { partners.length > 0 && createGridRows()}
      <div className="invite_new_button">
        <Button
          onClick={() => handleInvitation()}
          color="primary"
          variant="contained"
        >
          {t('invite_partner')}
        </Button>
      </div>
      <div className="partner_initations_list">
        <Tabs value={value} onChange={handleTabChange}>
          <Tab icon={<TimerOutlinedIcon />} label={t('invitations_pending')} />
          <Tab icon={<GroupAddOutlinedIcon />} label={t('invitations_completed')} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="gridInvPending">
            <DataGrid columns={columns} rows={rows} pageSize={10}
              onRowClick={(_row) => {
                const pathsParams = VIEW_INVITATION_URL.concat("/").concat("registrartionId=").concat(_row.row.id)
                navigation(pathsParams, { replace: false })
              }}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="gridInvPending">
            <DataGrid columns={columns} rows={rows1} pageSize={10}
              onRowClick={(_row) => {
                const pathsParams = VIEW_INVITATION_URL.concat("/").concat("registrartionId=").concat(_row.row.id)
                navigation(pathsParams, { replace: false })
              }} />
          </div>
        </TabPanel>
      </div>
      <div className="loading">
        <Loader isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Partners
