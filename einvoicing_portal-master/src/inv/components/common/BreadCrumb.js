import './common.css'
import {
    Breadcrumbs,
    makeStyles
} from '@material-ui/core'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
    root: {
    },
    breadcrumb: {
        padding: '10px 0px',
        fontSize: '0.85rem',
        borderBottom: '1px solid #d7d7d7',
        marginBottom: '10px !important'
    },
    links : {
        color:theme.palette.primary.main
    },
    active : {
        fontWeight: 'bold'
    },
    non_active : {

    }
}))

const BreadCrumb = () => {
    const location = useLocation()
    const classes = useStyles()
    const { t } = useTranslation()
    
    const breadcrumbs = [
        { path: "/app", name: t('home') },
        { path: "/app/partner_manager/todo", name: t('todo') },
        { path: "/app/partner/invitations", name: t('partner_invitations') },
        { path: "/app/partner/invitations/new", name: t('partner_invite') },
        { path: "/app/customer_admin/dashboard", name: t('dashboard') },
        { path: "/app/customer_admin/invoice_list", name: t('invoice_list') },
        { path: "/app/customer_admin/invoice_queries", name: t('invoice_queries') },
        { path: "/app/customer_admin/recipients", name: t('recipients') }, 
        { path: "/app/customer_admin/newrecipientform", name: t('new recipient') },
        { path: "/app/customer_admin/recipientview", name: t('recipient view') },
        { path: "/app/customer_admin/users", name: t('users') },
        { path: "/app/customer_admin/knowledge", name: t('knowledge') },
        { path: "/app/customer_admin/todo", name: t('todo') },
        { path: "/app/partner_manager/dashboard",name : t('dashboard')},
        { path: "/app/partner_manager/partners",name : t('partners')},
        { path: "/app/partner_manager/invite_partner",name : t('invite_partner')},
        { path: "/app/partner_manager/enquires",name : t('enquires')},
        { path: "/app/partner_manager/enquiryview",name :t('enquiryview')},
         { path: "/app/vendor_admin/vendorgrid",name :t('vendorlist')},
          { path: "/app/partner_manager/partners/view_invitation/registrartionId" , name : t('view_invitation')},
        { path : "/app/vendor_manager/invoice_list" , name : t('invoices')},
        { path : "/app/vendor_manager/invoice_upload" , name: t('upload_invoice')},
         { path: "/app/customer_manager/vendor_mapping",name :t('vendorlist')},
        { path: "/app/customer_manager/recipient_mapping",name :t('recipientlist')},
        { path:  "/app/vendor_manager/recipients", name :t('recipientlist')},
          { path : "/app/vendor_manager/json_upload" , name: t('upload_Json')}
    ]

     
     const crumbs = breadcrumbs.filter(({ path }) => location.pathname.includes(path));
     return (
        <Breadcrumbs
            separator=">"
            className={classes.breadcrumb}
        >
            {crumbs.map((crumb, index) => (
                <NavLink  className={`${classes.links} ${index === crumbs.length - 1 ? classes.active : classes.non_active}`} to={crumb.path} key={index}>{crumb.name}</NavLink>
            ))}
        </Breadcrumbs>
    )
}
export default BreadCrumb
