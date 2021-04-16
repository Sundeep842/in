// load all async calls
import { put, takeLatest, delay } from 'redux-saga/effects'
import { actions } from '.'
import { GET_ALL_INVOICES } from '../../../../constants/Constants'
import { invokeAPIGetRequest } from '../../../../../Request'

export function* _sagaFetechAllInvoices() {
	try {
		yield delay(5000)
		let api = yield invokeAPIGetRequest(GET_ALL_INVOICES, true)
		yield put(actions.invoicesLoaded(api.results));
	} catch (error) {
		yield put(actions.invoiceLoadError(error));
	}
}

export function* sagaFetchAllInvoices() {
	yield takeLatest(actions.loadInvoices, _sagaFetechAllInvoices);
}
