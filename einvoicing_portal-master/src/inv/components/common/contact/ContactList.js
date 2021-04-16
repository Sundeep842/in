import React from 'react'
import AgGridUtil from '../../../util/themes/AgGridUtil';
import { ENQUIRY_API_END_URL } from '../../../constants/Constants'


var exactpath = '';
const ContactList = () => {

  const
    columnDefs = [
  
      {
        headerName: "Name", field: "name",
      },
      , {
        headerName: "Contact Number", field: "contactNo",
      }, {
        headerName: "Email", field: "email",
      }, {
        headerName: "Message", field: "message",
      },
    ]

    

  return (
    <>  
        <AgGridUtil 
        url={ENQUIRY_API_END_URL}
         columnDefs={columnDefs}
         rowSelectionType="single" />

    </>
  )
}
export default ContactList;