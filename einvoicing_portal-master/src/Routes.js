import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/css/bootstrap-theme.min.css";
import TodoList from '../src/inv/components/common/todo/TodoList.js'
import Login from './inv/components/common/authentication/Login' // change this to original once design finalized
import EnqSuccess from './inv/components/common/enquiry/EnqSuccess'
import EnquiryView from './inv/components/common/enquiry/EnquiryView'
import Layout from './inv/components/common/layouts/Layout'
import UpdateToDo from './inv/components/common/todo/UpdateTodo'
import Dashboard from './inv/components/customer/admin/Dashboard'
import Receivable from './inv/components/customer/admin/Receivable'
import InvoiceList from './inv/components/customer/admin/InvoiceList'
import InvoiceQueries from './inv/components/customer/admin/InvoiceQueries'
import Knowledge from './inv/components/customer/admin/Knowledge'
import NewRecipientForm from './inv/components/customer/admin/recipient/NewRecipientForm'
import RecipientGrid from './inv/components/customer/admin/recipient/RecipientGrid'
import Recipients from './inv/components/customer/admin/Recipients'
import Users from './inv/components/customer/admin/Users'
import InvitationResponse from './inv/components/internal/manager/InvitationResponse'
import PartnerInvite from './inv/components/internal/manager/PartnerInvite'
import Partners from './inv/components/internal/manager/Partners'
import ViewInvitation from './inv/components/internal/manager/ViewInvitation'
import PartnerRegistration from './inv/components/public/PartnerRegistration'
import ContentViewer from './inv/viewers/ContentViewer'
import PrivateRoute from './PrivateRoute'
import Vendorform from './inv/components/vendor/vendormapping/_components/Vendorform'
import VendorGrid from './inv/components/vendor/vendormapping/_components//VendorGrid'
import VendorSearch from './inv/components/vendor/vendormapping/_components/VendorSearch'
import Multiselect from './inv/components/customer/admin/recipient/Multiselects'
import EnquirySaga from './inv/components/common/enquiry/enquirysaga/Enquirysaga.js'
import EnquiryListS from './inv/components/common/enquiry/enquirylistsaga/EnquiryListS.js'
import RD from './inv/components/rd/index'
import RecipientNewform from './inv/components/customer/admin/recipientsaga/_components/RecipientNewForm.js'
import Enquiryviewsaga from './inv/components/common/enquiry/enquirylistsaga/_components/Enquiryviewsaga.js'
import Recipientstest from './inv/components/customer/admin/recipientsaga/index.js'
import RecipientView from './inv/components/customer/admin/recipientsaga/_components/RecipientView.js'
import Todolistsaga from './inv/components/common/todosaga/index.js'
import MappedVendorsList from './inv/components/vendor/vendormapping/MappedVendorsList'
import { Payble } from './inv/components/customer/Payble.jsx'
import UploadJsonInvoice from './inv/components/vendor/invoicejsonupload/index'
import UploadInvoice from './inv/components/vendor/common/invoiceupload'
import ViewInvoice from './inv/components/vendor/common/invoiceview'
import Invoice from './inv/components/vendor/common/invoice'
import Sample from "./inv/components/rd/sample/index";
import Steps from "./inv/components/public/samplesteps/Steps";

let Router = [
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/contact/success",
    element: <EnqSuccess />
  },
  {
    path: "/sample",
    element: <Sample/>
  },
  {
    path: "/steper",
    element: <Steps/>
  },

  {
    path: "/contactsaga",
    element: <EnquirySaga />
  },

  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "/customer_admin/dashboard",
        element: <PrivateRoute component={Dashboard} path="/customer_admin/dashboard" />
      },
      {
        path: "/customer_admin/paybles",
        element: <PrivateRoute component={Payble} path="/customer_admin/paybles" />
      },
      {
        path: "/customer_admin/Receivable",
        element: <PrivateRoute component={Receivable} path="/customer_admin/Receivable" />
      },
      {
        path: "partner_manager/enquires",
        element: <PrivateRoute component={EnquiryListS} path="partner_manager/enquires" />
      },
      {
        path: "/partner_manager/enquiryview/:uid",
        element: <PrivateRoute component={Enquiryviewsaga} path="/partner_manager/enquiryview/:uid" />
      }, {
        path: "/partner_manager/paybles",
        element: <PrivateRoute component={Payble} path="/partner_manager/paybles" />
      },
      {
        path: "/customer_admin/invoice_list",
        element: <PrivateRoute component={InvoiceList} path="/customer_admin/invoice_list" />
      },
      {
        path: "/customer_admin/recipients",
        element: <PrivateRoute component={Recipientstest} path="/customer_admin/recipients" />
      },
      {
        path: "/customer_admin/users",
        element: <PrivateRoute component={Users} path="/customer_admin/users" />
      },
      {
        path: "/customer_admin/knowledge",
        element: <PrivateRoute component={Knowledge} path="/customer_admin/knowledge" />
      },
      {
        path: "/customer_admin/todo",
        element: <PrivateRoute component={Todolistsaga} path="/customer_admin/todo" />
      },
      {
        path: "/customer_admin/newrecipientform",
        element: <PrivateRoute component={RecipientNewform} path="/customer_admin/newrecipientform" />
      },

      {
        path: "/customer_admin/recipientview/:uid",
        element: <PrivateRoute component={RecipientView} path="/customer_admin/recipientview/:uid" />
      },
      {
        path: "/partner_manager/dashboard",
        element: <PrivateRoute component={Dashboard} path="/partner_manager/dashboard" />
      },
      {
        path: "/partner_manager/partners",
        element: <PrivateRoute component={Partners} path="/partner_manager/partners" />
      },
      {
        path: "/partner_manager/invite_partner",
        element: <PrivateRoute component={PartnerInvite} path="/partner_manager/invite_partner" />
      },
      // {
      //     path: "/partner_manager/todo",
      //     element: <PrivateRoute component={TodoList} path="/partner_manager/todo" />
      //   },
      {
        path: "/partner_manager/todo",
        element: <PrivateRoute component={Todolistsaga} path="/partner_manager/todo" />
      },
      {
        path: "/customer_admin/todo",
        element: <PrivateRoute component={TodoList} path="/customer_admin/todo" />
      },
      {
        path: "/partner_manager/todo",
        element: <PrivateRoute component={TodoList} path="/partner_manager/todo" />
      },
      {
        path: "/customer_admin/todo_update/:id",
        element: <PrivateRoute component={UpdateToDo} path="/customer_admin/todo_update/:id" />
      },
      {
        path: "/customer_manager/dashboard",
        element: <PrivateRoute component={Dashboard} path="/customer_manager/dashboard" />
      },
      {
        path: "/customer_manager/vendor_mapping",
        element: <PrivateRoute component={MappedVendorsList} path="/customer_manager/vendor_mapping" />
      },
      {
        path: "/customer_manager/recipient_mapping",
        element: <PrivateRoute component={Recipientstest} path="/customer_manager/recipient_mapping" />
      },
      {
        path: "/vendor_manager/dashboard",
        element: <PrivateRoute component={Dashboard} path="/vendor_manager/dashboard" />
      },
      {
        path: "/vendor_manager/todo",
        element: <PrivateRoute component={Todolistsaga} path="/vendor_manager/todo" />
      },
      {
        path: "/vendor_manager/recipients",
        element: <PrivateRoute component={Recipientstest} path="/vendor_manager/recipients" />
      },
      {
        path: "/vendor_manager/invoice_list",
        element: <PrivateRoute component={Invoice} path="/vendor_manager/dashboard" />
      },
      {
        path: "/vendor_manager/invoice_upload",
        element: <PrivateRoute component={UploadInvoice} path="/vendor_manager/invoice_upload" />
      },
        {
                path: "/vendor_manager/json_upload",
                element: <PrivateRoute component={UploadJsonInvoice} path="/vendor_manager/json_upload" />
            },
      {
        path: "/vendor_manager/invoice_upload/:refId",
        element: <PrivateRoute component={UploadInvoice} path="/vendor_manager/invoice_upload" />
      },
      {
        path: "/vendor_manager/invoice_view/:refId",
        element: <PrivateRoute component={ViewInvoice} path="/vendor_manager/invoice_view" />
      },
      {
        path: "/partner_manager/partners/view_invitation/:registrartionId",
        element: <PrivateRoute component={ViewInvitation} path="/partner/invitations/view_invitation/:registrartionId" />
      },
      {
        path: "/vendor_manager/vendorform",
        element: <PrivateRoute component={Vendorform} path="/vendor_manager/vendorform" />
      },
      {
        path: "/vendor_manager/vendorform/:uid",
        element: <PrivateRoute component={Vendorform} path="/vendor_manager/vendorform/:uid " />
      },
      {
        path: "/vendor_manager/vendorgrid",
        element: <PrivateRoute component={VendorGrid} path="/vendor_manager/vendorgrid" />
      },
      {
        path: "/vendor_manager/MappedVendorList",
        element: <PrivateRoute component={MappedVendorsList} path="/vendor_manager/MappedVendorList" />
      },
      {
        path: "/vendor_manager/vendorsearch",
        element: <PrivateRoute component={VendorSearch} path="/vendor_manager/vendorsearch" />
      },
    ]

  },
  {
    path: "/partner/registration",
    children: [
      { path: ":resgistrartionId", element: <PartnerRegistration /> }
    ]
  },
  {
    path: "/partner/invitations/view_invitation",
    children: [
      { path: ":resgistrartionId", element: <ViewInvitation /> }
    ]
  },
  {
    path: "/vendor_manager/dashboard",
    element: <PrivateRoute component={Dashboard} path="/vendor_manager/dashboard" />
  },
  {
    path: "/partner_manager/partners/view_invitation/:registrartionId",
    element: <PrivateRoute component={ViewInvitation} path="/partner/invitations/view_invitation/:registrartionId" />
  },

  {
    path: "/vendor_admin/upload_invoice",
    element: <UploadInvoice />
  },
  {
    path: "/applications/chat",
    element: <UploadInvoice />
  },


  {
    path: "/partner/invitations/response",
    children: [
      { path: ":resgistrartionId", element: <InvitationResponse /> }
    ]
  },
  {
    path: "/viewer",
    children: [
      { path: ":documentId", element: <ContentViewer /> }
    ]
  },
  {
    path: "/rd",
    element: <RD />
  }
]
export default Router;
