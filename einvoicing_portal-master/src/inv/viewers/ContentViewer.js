import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { invokeAPIRequest } from './../../Request'
import { GET_DOCUMENT_CONTENT } from './../constants/Constants'
import PerfectScrollbar from "react-perfect-scrollbar"
import './viewer.css'
import { useTranslation } from 'react-i18next'

const ContentViewer = () => {

  let { documentId } = useParams()
  const [document, setDocument] = useState(null)
  const _documentId = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    async function onLoad() {
      if (documentId.indexOf("=") >= 0)
        _documentId.current = documentId.split("=")[1]
      else
        _documentId.current = documentId

      const params = {
        "documentId": _documentId.current
      }

      await invokeAPIRequest(GET_DOCUMENT_CONTENT, params, false)
        .then((response) => {
          if (response && response.hasError === false) {
            let base64 = "data:" + response.results.mimeType + ";base64," + response.results.contentBase64
            setDocument(base64)
          }
        })
        .catch((error) => {
          alert('An error while fetching document')
        })
    }
    onLoad()
  }, [documentId]) // useEffect call when documentId changes


  return (
    <div className="content_viewer">
      <PerfectScrollbar>
        <div className="viewer">
          {document && (<iframe src={document} width="100%" height="100%" title={t('content_viewer')}/>)}
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default ContentViewer