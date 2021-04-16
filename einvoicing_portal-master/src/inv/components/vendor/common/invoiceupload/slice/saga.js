// load all async calls
import { put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { actions } from '.'
import { invokeAPIRequest , invokeAPIGetRequest } from '../../../../../../Request'
import { selectUploads , selectRefId } from './selector'
import { UPLOAD_INVOICE , GET_INVOICE_DETAILS , SEARCH_RECIPIENTS } from '../../../../../constants/Constants'


export function* _sagaFetechAllInvoices() {
	yield put(actions.loadedAllInvoices());
}


export function* sagaFetchAllInvoices() {
	yield takeLatest(actions.loadAllInvoices, _sagaFetechAllInvoices);
}

export function* _sagaChangeTab() {
	yield put(actions.tabChanged());
}

export function* sagaChangeTab() {
	yield takeEvery(actions.changeTab, _sagaChangeTab);
}


export function* _sagaUploadInvoice() {
	const uploads = yield select(selectUploads)
	try {
		let _uploads = [ uploads ]
		let api = yield invokeAPIRequest(UPLOAD_INVOICE, _uploads, true)
		yield put(actions.invoiceUploaded(api.results));
	} catch (error) {
		yield put(actions.invoiceUploadError(error));
	}
}

export function* sagaUploadInvoice() {
	yield takeEvery(actions.uploadInvoice, _sagaUploadInvoice);
}

export function* _sagaLoadExistingInvoiceDetails() {
	const refId = yield select(selectRefId)
	try {
		let api = yield invokeAPIGetRequest(GET_INVOICE_DETAILS +"/"+refId , true)
		yield put(actions.existingInvoiceLoaded(api.results));
	} catch (error) {
		yield put(actions.invoiceFetchError(error));
	}
}

export function* sagaLoadExistingInvoiceDetails() {
	yield takeEvery(actions.loadExistingInvoiceDetails, _sagaLoadExistingInvoiceDetails);
}


export function* _sagaLoadRecipientDetails() {
	try {
		let api = yield invokeAPIGetRequest(SEARCH_RECIPIENTS , true)
		yield put(actions.searchRecipientsCompleted(api.results));
	} catch (error) {
		yield put(actions.setError(error));
	}
}

export function* sagaLoadRecipientDetails() {
	yield takeEvery(actions.searchRecipients, _sagaLoadRecipientDetails);
}


