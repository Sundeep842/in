import React, { useState , useEffect } from 'react'
import {
    DataGrid
} from '@material-ui/data-grid'
import {
    IconButton
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import RefreshIcon from '@material-ui/icons/Refresh';
import '../ui.css'
import { DropzoneDialogBase } from 'material-ui-dropzone'

const GridUploader = (props) => {
    const { _items, insert , folderId  , doc_type } = props
    const [items,setItems] = useState([])
    const { t } = useTranslation()
    const [openUploader, setOpenUploader] = useState(false)
    const allowedMimeTypes = ['image/*', 'application/pdf', 'text/html', 'text/plain']
    const maxUplods = 100 // MAX Value

    useEffect(() => {
        if(_items && _items.length > 0) {
            let ___item = []
            _items.forEach((_item) => {
                if (_item) {
                    let __item = {}
                    __item.file = {}
                    __item.file.name = _item.ecm_doc_id
                    __item.file.type = _item.mime_type != null ? _item.mime_type : ""
                    __item.file.lastModifiedDate = _item.created_date
                    __item.id = _item.ecm_doc_id
                    ___item.push(__item)
                }
            })
            setItems(___item)
        }
    },[])

    const columns = [
        { field: 'document_name', headerName: t('document_name'), width: 180 },
        { field: 'document_type', headerName: t('document_type'), width: 180 },
        { field: 'document_added_on', headerName: t('document_added_on'), width: 180 },
    ]

    let rows = []
    items.forEach((_item) => {
        if (_item && _item.file) {
            let __item = {}
            __item.id = _item.id ? _item.id : rows.length + 1
            __item.document_name = _item.file.name
            __item.document_type = _item.file.type
            __item.document_added_on = _item.file.lastModifiedDate
            rows.push(__item)
        }
    })

    const upload = () => {
        setOpenUploader(!openUploader)
    }

    const refresh = () => {
    }

    return (
        <div style={{ height: 400, width: '80%' }}>
            <div className="uploadActionButtons">
                <IconButton
                    onClick={() => upload()}
                >
                    <CloudUploadIcon />
                </IconButton>
                <IconButton
                    onClick={() => refresh()}
                >
                    <RefreshIcon />
                </IconButton>
            </div>
            <DataGrid rows={rows} columns={columns} />
            <DropzoneDialogBase
                open={openUploader}
                dialogTitle={t('upload_title')}
                acceptedFiles={allowedMimeTypes}
                onClose={() => { setOpenUploader(!openUploader) }}
                showPreviews={true}
                showFileNamesInPreview={true}
                filesLimit={maxUplods}
                fileObjects={items}
                onSave={() => {
                    setOpenUploader(!openUploader)
                }}
                onDelete={(__files) => { }}
                onAdd={(__files) => {
                    let _x = null
                    __files.map((_f) => {
                        _x =   [...items, _f]
                        let upload = {
                            "doc_type": doc_type,
                            "mime_type": _f.file.type,
                            "base64":  _f.data,
                            "folderId": folderId
                        }
                        insert(_items.length , upload)
                    })
                    setItems(_x)
                }}
            />
        </div>
    )
}

export default GridUploader
