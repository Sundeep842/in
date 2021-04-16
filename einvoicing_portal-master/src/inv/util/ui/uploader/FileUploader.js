import React , { useState }from 'react'
import {
  IconButton,
  Chip
} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DropzoneDialogBase } from 'material-ui-dropzone'
import { ADD_DOCUMENTS , DELETE_DOCUMENT  } from '../../../constants/Constants'
import { invokeAPIRequest } from '../../../../Request'



const FileUploader = ( props ) => {

  const {  documents  , title , folderId  , userId  , documentProperties  , setDocuments  , maxUplods  , allowedMimeTypes} = props
  const [_files , setFiles] = useState([])
  const [openDialog , setOpenDialog] = useState(false)
  const CONTENT_VIEWER_URL = "/viewer"
  const view_params  = "location=yes,height=570,width=850,scrollbars=yes,status=yes,location=no"


  const documentDelete = (document) => {
    let params = {
      "documentId" : document.documentId
    }
    invokeAPIRequest(DELETE_DOCUMENT,params,false)
    .then((response) => {
      if(response && response.hasError === false) {
        setDocuments(documents.filter(_document =>  _document.documentId !== document.documentId))
        setFiles(_files.filter(_file => document.documentName !== _file.file.name))
      }
    })
    .catch((error) => {
      alert('An error while deleting document')
    })
  }

  const documentOpen = (document) => {
    const pathsParams = CONTENT_VIEWER_URL.concat("/").concat("documentId=").concat(document.documentId)
    window.open(pathsParams,"_blank",view_params)
  }

  return (
    <div className="form_uploader">
        <div className="form_upload_button" hidden={!(documents.length === 0)}>
            <IconButton
              onClick={() => {
                setOpenDialog(!openDialog)
              }}
            >
                <CloudUploadIcon/>
            </IconButton>
        </div>
        <div className="form_show_files" hidden={!(documents.length >= 1)}>
          {
            documents.map((document) => (
              <div key={document.documentId}>
                <Chip
                  label={document.documentName}
                  onDelete={() => { documentDelete(document) }}
                  onClick={() => { documentOpen(document)}}
                />
              </div>
            ))
          }
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
              invokeAPIRequest(ADD_DOCUMENTS,params,false)
              .then((response) => {
                  if(response && response.hasError === false) {
                    setDocuments(response.results)
                    setOpenDialog(!openDialog)
                  }
              })
              .catch((error) => {
                alert('error while uploading documents')
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

export default FileUploader
