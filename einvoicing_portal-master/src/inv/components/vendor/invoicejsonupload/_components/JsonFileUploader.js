import React , { useState }from 'react'
import {
  IconButton,
  Chip
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DropzoneDialogBase } from 'material-ui-dropzone'


const JsonFileUploader = ( props ) => {

  const {  documents  , title , folderId  , userId  , documentProperties  , setDocuments  , maxUplods  , allowedMimeTypes} = props
  const [_files , setFiles] = useState([])
  const [openDialog , setOpenDialog] = useState(false)
  const CONTENT_VIEWER_URL = "/viewer"
  const view_params  = "location=yes,height=570,width=850,scrollbars=yes,status=yes,location=no"


  

  const documentOpen = (document) => {
    const pathsParams = CONTENT_VIEWER_URL.concat("/").concat("documentId=").concat(document.documentId)
    window.open(pathsParams,"_blank",view_params)
  }

  return (
    <div className="form_uploader">
        <div className="form_upload_button" >
            <IconButton
              onClick={() => {
                setOpenDialog(!openDialog)
              }}
            >
                <CloudUploadIcon/>
            </IconButton>
        </div>
       
        <div className="form_drop_zone">
          <DropzoneDialogBase
            open={openDialog}
            dialogTitle={title}
            acceptedFiles={allowedMimeTypes}
            onClose={()=>{ setOpenDialog(!openDialog) }}
            fileObjects={_files}
            showPreviews={true}
            showFileNamesInPreview={true}
            filesLimit={maxUplods}
            onSave={()=>{
              // upload documents to alfresco
              let params = []
              _files.forEach((_file) => {
                params.push({
              "documentName" : _file.file.name,
                  "documentBase64" : _file.data.split("base64,")[1],
                  "addedBy" : userId,
                  "mimeType": _file.file.type,
                  "className": "document",
                  "folderId": folderId,
                  "properties" : documentProperties
                })
              })
             
            }}
            onDelete={(__files)=>{}}
            onAdd={(__files) => {
              setFiles(__files)
            }}
          />
        </div>
    </div>
  )
}

export default JsonFileUploader
