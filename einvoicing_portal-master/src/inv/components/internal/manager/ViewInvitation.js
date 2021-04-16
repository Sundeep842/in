import React, { useState, useEffect, useRef } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Box,
  makeStyles
} from '@material-ui/core'
import TabPanel from '../../../util/ui/tab/TabPanel'
import Loader from '../../../util/ui/Loader'
import './invitation.css'
import { invokeGetRequest, invokeAPIRequest } from '../../../../Request'
import { GET_REGISTRATION_DETAILS, POST_REGISTRATION_DETAILS } from '../../../constants/Constants'
import { formFields } from '../../../components/public/form_steps/formMeta'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector } from 'react-redux'
import ArtTrackOutlinedIcon from '@material-ui/icons/ArtTrackOutlined'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined'
import {
  selectUser
}  from '../../common/authentication/slice/selectors'


const useStyles = makeStyles((theme) => ({
  theme_color : {
    color:theme.palette.primary.main
  },
  border_color : {
    borderRight : `1px solid ${theme.palette.primary.main}`
  }
}))


const ViewInvitation = () => {

  let { registrartionId } = useParams()
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const [invitations, setInvitations] = useState(null)
  const [history, setHistory] = useState(null)
  const { partnerDetails, contactDetails, gstinDetails, msmeDetails } = formFields
  const { companyName, firmType, natureOfBusiness, panNo, partnerType, noOfPortalUsersAllowed, noOfInvoiceExpected, offeredServices, establishmentYear, country, webSite } = partnerDetails
  const { personName, address, city, state, personCountry, pinCode, mobileNumber, stdCodePhoneNumber, email } = contactDetails
  const { gstin, businessName, stateCode, registrationYear, gstinCertId } = gstinDetails
  const { msmeRegNo, msmeType, msmeRegDate, msmeDocId, additionalInfo } = msmeDetails
  const [msmeDocuments, setMsmeDocuments] = useState([])
  const [gstinDocuments, setGstinDocuments] = useState([])
  const user = useSelector(selectUser)
  const [openDialog, setOpenDialog] = useState(false)
  const commentsRef = useRef()
  const CONTENT_VIEWER_URL = "/viewer"
  const view_params = "location=yes,height=570,width=850,scrollbars=yes,status=yes,location=no"
  const [actionName, setActionName] = useState(null)
  const _resgistrartionId = useRef(null)
  const [ isLoading , setIsLoading ] = useState(false)
  const navigate =  useNavigate()
  const classes = useStyles()


  useEffect(() => {
    async function initLoad() {
      if (registrartionId.indexOf("=") > 0) {
       // resgistrartionId = undefined
        _resgistrartionId.current = registrartionId.split("=")[1]
        setIsLoading(true)
        await invokeGetRequest(GET_REGISTRATION_DETAILS.concat(_resgistrartionId.current), {}, false)
          .then((response) => {
            setIsLoading(false)
            if (response && response.hasError === false) {
              let _profileJsonDetails = JSON.parse(response.results.profileJsonDetails)
              setInvitations(_profileJsonDetails)
              setHistory(response.results.partnerProfileTransactions)
              if (_profileJsonDetails.msmeDocuments !== undefined)
                setMsmeDocuments(_profileJsonDetails.msmeDocuments)
              if (_profileJsonDetails.gstinDocuments !== undefined)
                setGstinDocuments(_profileJsonDetails.gstinDocuments)
            }
          })
          .catch((error) => {
            setIsLoading(false)
            alert('An error while fetching details');
          })
      }
    }
    initLoad()
  }, []) // load once per page . If error ignore UI 


  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const completeStep = () => {
    let params = {
      "activityStatus": actionName,
      "activityType": actionName,
      "partnerProfileTransactions": [
        {
          "actionBy": user.userId,
          "actionComments": commentsRef.current.value,
          "actionTaken": actionName
        }
      ],
      "profileJsonDetails": JSON.stringify(invitations)
    }
    invokeAPIRequest(POST_REGISTRATION_DETAILS.concat(_resgistrartionId.current), params, false)
      .then((response) => {
        if (response && response.hasError === false) {
          navigate(`/app/${user.roles[0]}/partners`,{replace:false})
        }
      })
      .catch((error) => {
        alert('there is an error while submitting registration form');
      })
  }


  const Attachments = () => {

    const columns = [
      { field: 'id', headerName: t('id'), width: 200, hide: true },
      { field: 'documentName', headerName: t('documentName'), width: 200 },
      { field: 'documentAddedBy', headerName: t('documentAddedBy'), width: 200 },
      { field: 'documentAddedOn', headerName: t('documentAddedOn'), width: 200 }
    ]

    const rows = []

    msmeDocuments.forEach((msmeDocument) => {
      rows.push({
        id: msmeDocument.documentId,
        documentName: msmeDocument.documentName,
        documentAddedBy: msmeDocument.documentAddedBy,
        documentAddedOn: msmeDocument.documentAddedOn
      })
    })

    gstinDocuments.forEach((gstinDocument) => {
      rows.push({
        id: gstinDocument.documentId,
        documentName: gstinDocument.documentName,
        documentAddedBy: gstinDocument.documentAddedBy,
        documentAddedOn: gstinDocument.documentAddedOn
      })
    })

    const openDocument = (document) => {
      const pathsParams = CONTENT_VIEWER_URL.concat("/").concat("documentId=").concat(document.id)
      window.open(pathsParams, "_blank", view_params)
    }

    return (
      <div>
        <div className="attachmentGrid">
          <DataGrid columns={columns} rows={rows} pageSize={10}
            onRowClick={(_row) => { openDocument(_row.row) }}
          />
        </div>
      </div>
    )
  }

  const History = () => {

    const columns = [
      { field: 'id', headerName: t('id'), width: 200, hide: true },
      { field: 'actionBy', headerName: t('actionBy'), width: 200 },
      { field: 'actionComments', headerName: t('actionComments'), width: 200 },
      { field: 'actionOn', headerName: t('actionOn'), width: 200 },
      { field: 'actionTaken', headerName: t('actionTaken'), width: 200 }
    ]

    const rows = []
    history.forEach((_history) => {
      rows.push({
        id: _history.id,
        actionBy: _history.actionBy,
        actionComments: _history.actionComments,
        actionOn: _history.actionOn,
        actionTaken: _history.actionTaken
      })
    })

    return (
      <div>
        <div className="historyGrid">
          <DataGrid columns={columns} rows={rows} pageSize={10} />
        </div>
      </div>
    )
  }

  const Invitations = () => {

    return (
      <Box className="invitations_view">

        { invitations && (
          <div className="company_details_container">
            <div className={`company_details_review_container ${classes.border_color}`}>
              <h5 className={`section_title ${classes.theme_color}`}>{t('company_partner_details')}</h5>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="rowLabel">{companyName.label}</TableCell>
                    <TableCell>{invitations.companyName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{firmType.label}</TableCell>
                    <TableCell>{invitations.firmType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{natureOfBusiness.label}</TableCell>
                    <TableCell>{invitations.natureOfBusiness}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{panNo.label}</TableCell>
                    <TableCell>{invitations.panNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{partnerType.label}</TableCell>
                    <TableCell>{invitations.partnerType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{noOfPortalUsersAllowed.label}</TableCell>
                    <TableCell>{invitations.noOfPortalUsersAllowed}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{noOfInvoiceExpected.label}</TableCell>
                    <TableCell>{invitations.noOfInvoiceExpected}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{offeredServices.label}</TableCell>
                    <TableCell>{invitations.offeredServices}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{establishmentYear.label}</TableCell>
                    <TableCell>{invitations.establishmentYear}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{country.label}</TableCell>
                    <TableCell>{invitations.country}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{webSite.label}</TableCell>
                    <TableCell>{invitations.webSite}</TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </div>
            <div className="contact_details_container">
              <h5 className={`section_title ${classes.theme_color}`}>{t('company_contact_person_details')}</h5>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="rowLabel">{personName.label}</TableCell>
                    <TableCell>{invitations.personName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{email.label}</TableCell>
                    <TableCell>{invitations.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{mobileNumber.label}</TableCell>
                    <TableCell>{invitations.mobileNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{stdCodePhoneNumber.label}</TableCell>
                    <TableCell>{invitations.stdCodePhoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{address.label}</TableCell>
                    <TableCell>{invitations.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{personCountry.label}</TableCell>
                    <TableCell>{invitations.personCountry}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{state.label}</TableCell>
                    <TableCell>{invitations.state}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{city.label}</TableCell>
                    <TableCell>{invitations.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{pinCode.label}</TableCell>
                    <TableCell>{invitations.pinCode}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className={`gstin_details_container ${classes.border_color}`} aria-label="gstin details">
              <h5 className={`section_title ${classes.theme_color}`}>{t('gstin_details')}</h5>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="rowLabel">{gstin.label}</TableCell>
                    <TableCell>{invitations.gstin}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{businessName.label}</TableCell>
                    <TableCell>{invitations.businessName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{stateCode.label}</TableCell>
                    <TableCell>{invitations.stateCode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{registrationYear.label}</TableCell>
                    <TableCell>{invitations.registrationYear}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{gstinCertId.label}</TableCell>
                    <TableCell>{invitations.gstinCertId}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="msme_details_container" aria-label="gstin details">
              <h5 className={`section_title ${classes.theme_color}`}>{t('msme_details')}</h5>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="rowLabel">{msmeRegNo.label}</TableCell>
                    <TableCell>{invitations.msmeRegNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{msmeType.label}</TableCell>
                    <TableCell>{invitations.msmeType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{msmeRegDate.label}</TableCell>
                    <TableCell>{invitations.msmeRegDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{msmeDocId.label}</TableCell>
                    <TableCell>{invitations.msmeDocId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowLabel">{additionalInfo.label}</TableCell>
                    <TableCell>{invitations.additionalInfo}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div style={{ clear: 'both'}}></div>
          </div>
        )}
      </Box>
    )
  }

  return (
  <div className="body_background">
    <div className="viewInvitation">
      <div className="viewTabs">
        <Tabs value={value} onChange={handleTabChange}>
          <Tab icon = {<ArtTrackOutlinedIcon /> } label={t('invitations_details')} />
          <Tab icon = {<DescriptionOutlinedIcon/>} label={t('attachments')} />
          <Tab icon = {<HistoryOutlinedIcon/>} label={t('history')} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Invitations />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Attachments />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <History />
        </TabPanel>
      </div>
      <div className="viewButtons">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpenDialog(!openDialog)
            setActionName("NeedMoreInformation")
          }}
        >
          {t('need_more_information')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpenDialog(!openDialog)
            setActionName("Approve")
          }}
        >
          {t('approve')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setOpenDialog(!openDialog)
            setActionName("Discard")
          }}
        >
          {t('discard')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
             navigate(`/app/${user.roles[0]}/partners`,{replace:false})
          }}
        >
          {t('close')}
        </Button>
      </div>

      <div className="view_action_dialog">
        <Dialog open={openDialog} fullWidth={true} maxWidth="sm">
          <DialogTitle>{t('add_comments')}</DialogTitle>
          <DialogContent>
            <div className="view_action_dialog_content">
              <TextField multiline type="text" rows={5} rowsMax={8} inputRef={commentsRef} variant="outlined" label={t('comments')} fullWidth />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                completeStep()
              }}
            >
              {t('ok_button')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpenDialog(!setOpenDialog)
              }}
            >
              {t('cancel_button')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    
    </div>
    <div style={{paddingBottom:'70px'}}></div>
    <Loader  isLoading = {isLoading}/>
  </div>
  )
}

export default ViewInvitation
