import { put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { actions } from '.'
import {
	selectName,selectEmail,
	selectRemarks, selectContactNo, selectMessage, selectPartnerType,selectStatus,selectEnqID
} from './selectors'
import { invokeAPIGetRequest, invokeAPIRequest } from '../../../../../../Request'
import { ENQUIRYGET_API_END_URL, ENQUIRY_API_END_URL } from '../../../../../constants/Constants'


export function* _sagaLoadFormDetails(props) {
	try {
		let api = yield invokeAPIGetRequest(ENQUIRYGET_API_END_URL, true)
		yield put(actions.loadedAllEnquires(api.results));
	} catch (error) {
		console.log("error in api")
		yield put(actions.enquirylistError(error));
	}
}

export function* _sagaFormSubmit(props) {
	const remarks = yield select(selectRemarks)
	const status= yield select(selectStatus)
	const enqRefId = yield  select (selectEnqID)
	const name = yield select(selectName)
	const email = yield select(selectEmail)
	const contactNo = yield select(selectContactNo)
	const message = yield select(selectMessage)
	const partnerType = yield select(selectPartnerType)

	console.log("============================================================================")
	// console.log(uid)
	try {
		let params = {
			name:name,
			email: email,
			contactNo : contactNo ,
			message : message ,
			partnerType: partnerType,
			enqRefId:enqRefId,
			status: status,
			"enquiryActivities": [
				{
					"action": "",
					"remarks": remarks
				}
			]
		}
		
		console.log(params)
		console.log("api called")
		let api = yield invokeAPIRequest(ENQUIRY_API_END_URL+"/"+enqRefId, params,true, "post")
		console.log(api.results)
		yield put(actions.enquirylistComplete(api.results));
	} catch (error) {
		console.log("error in api")
		yield put(actions.enquirylistError(error));
	}
}
export function* _sagaStatusChange(props) {
	const remarks = yield select(selectRemarks)
	const status= yield select(selectStatus)
	const enqRefId = yield  select (selectEnqID)
	const name = yield select(selectName)
	const email = yield select(selectEmail)
	const contactNo = yield select(selectContactNo)
	const message = yield select(selectMessage)
	const partnerType = yield select(selectPartnerType)

	console.log("============================================================================")
	// console.log(uid)
	try {
		let params = {
			name:name,
			email: email,
			contactNo : contactNo ,
			message : message ,
			partnerType: partnerType,
			enqRefId:enqRefId,
			status: status,
			
		}
		
		console.log(params)
		console.log("api called")
		let api = yield invokeAPIRequest(ENQUIRY_API_END_URL+"/"+enqRefId, params,true, "post")
		console.log(api)
		yield put(actions.statusChangedCompleted(api));
	} catch (error) {
		console.log("error in api")
		yield put(actions.enquirylistError(error));
	}
}

export function* sagaLoadFormDetails() {
	yield takeEvery(actions.loadFormDetails, _sagaLoadFormDetails);
}
export function* sagaFormSubmit() {
	yield takeLatest(actions.enquiryview, _sagaFormSubmit);
}
export function* sagaStatusChange() {
	yield takeLatest(actions.statusChanged, _sagaStatusChange);
}


