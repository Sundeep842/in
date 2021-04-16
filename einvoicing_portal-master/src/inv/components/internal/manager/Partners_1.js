import React , { useEffect , useState } from 'react'
import {
    Button,
    Tabs,
    Tab
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {GET_ALL_INVITATIONS } from '../../../constants/Constants'
import {invokeAPIGetRequest} from '../../../../Request'
import TabPanel from '../../../util/ui/tab/TabPanel'
import './invitation.css'
import { DataGrid } from '@material-ui/data-grid'
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined'
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined'
import { useSelector } from 'react-redux'




const Partners = () => {
    const { t } = useTranslation()
    const navigation = useNavigate()
    const [pendingInvitations, setPendingInvitations] = useState([])
    const [value,setValue] = useState(0)
    const [activeInvitations , setActiveInvitations] = useState([])
    const user = useSelector((state) => state._loginSlice.user)
    const VIEW_INVITATION_URL = `/app/${user.roles[0]}/partners/view_invitation`
    const view_params  = "location=yes,height=570,width=850,scrollbars=yes,status=yes"


    const columns = [
        { field: 'id', headerName: t('id'), width: 200 , hide : true},
        { field: 'partnerId', headerName: t('partnerId'), width: 200 , hide : true},
        { field: 'partnerCompanyName', headerName: t('partnerCompanyName'), width: 200 },
        { field: 'partnerContactEmail', headerName: t('partnerContactEmail'), width: 200 },
        { field: 'invSentOn', headerName: t('invSentOn'), width: 200 },
        { field: 'partnerContactPersonName', headerName: t('partnerContactPersonName'), width: 200 },
        { field: 'status', headerName: t('status'), width: 200 }
    ]



    const handleInvitation = () => {
        navigation('/app/partner_manager/invite_partner',{replace: false})
    }

    const handleTabChange = (event, newValue) => {
      setValue(newValue)
    }

    useEffect(() => {
        invokeAPIGetRequest(GET_ALL_INVITATIONS,{},false)
        .then((response) => {
          if(response && response.hasError === false) {
            const pendings = response.results.filter((invitation) => {
                return invitation.status !== "Active" && invitation.status !== null && invitation.status !== ''
            })
            const pendingRows = []
            pendings.forEach((_pending) => {
              pendingRows.push({
                id: _pending.regId,
                partnerCompanyName : _pending.companyName,
                partnerContactEmail: _pending.email,
                partnerContactPersonName: _pending.personName,
                invSentOn: _pending.invSentOn,
                status: _pending.status
              })
            });
            setPendingInvitations(pendingRows)

            const actives = response.results.filter((invitation) => {
                return invitation.status === "Active"  && invitation.status !== null &&  invitation.status !== ''
            })
            // map rows
            const activeRows   = []
            actives.forEach((_active) => {
              activeRows.push({
                id: _active.regId,
                partnerCompanyName : _active.companyName,
                partnerContactEmail: _active.email,
                partnerContactPersonName: _active.personName,
                invSentOn: _active.invSentOn,
                status: _active.status
              })
            });
            setActiveInvitations(activeRows)
          }
        })
        .catch((error) => {
          // open error dialog and explain message details
        })
    },[])

    return (
        <div className="partnerManagement">
            <div className="invite_new_button">
                <Button
                    onClick={()=>handleInvitation()}
                    color="primary"
                    variant="contained"
                >
                    {t('invite_partner')}
                </Button>
            </div>

            <div className="partner_initations_list">
                <Tabs value={value} onChange={handleTabChange}>
                  <Tab  icon={<TimerOutlinedIcon />}  label={t('invitations_pending')}/>
                  <Tab  icon ={<GroupAddOutlinedIcon />} label={t('invitations_completed')}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                  {pendingInvitations && (
                    <div className="gridInvPending">
                      <DataGrid columns = {columns} rows={pendingInvitations} pageSize={10}
                        onRowClick={(_row) => {
                          const pathsParams = VIEW_INVITATION_URL.concat("/").concat("registrartionId=").concat(_row.row.id)
                          navigation(pathsParams,{replace:false})
                        }}
                      />
                    </div>
                  )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {activeInvitations && (
                    <div className="gridInvPending">
                      <DataGrid columns = {columns} rows={activeInvitations} pageSize={10}
                        onRowClick={(_row) => {
                          const pathsParams = VIEW_INVITATION_URL.concat("/").concat("registrartionId=").concat(_row.row.id)
                          navigation(pathsParams,{replace:false})
                        }}
                      />
                    </div>
                  )}
               </TabPanel>
            </div>
        </div>
    )
}

export default Partners
