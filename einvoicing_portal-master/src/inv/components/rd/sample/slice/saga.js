import { put, select, takeLatest } from 'redux-saga/effects'
import { actions } from '.'
import { selectName, selectEmail, selectContactNo, selectMessage, selectPartnerType } from './selectors'
import { invokeAPIRequest } from '../../../../../Request'
import { ENQUIRY_API_END_URL } from '../../../../constants/Constants'
// import { useNavigate } from 'react-router-dom'


export function* _sagaSample() {
	const name = yield select(selectName)
	const email = yield select(selectEmail)
	const contactNo = yield select(selectContactNo)
	const message = yield select(selectMessage)
	const partnerType = yield select(selectPartnerType)
	// const navigation = useNavigate()
	try {
		let params = {
			name: name,
			email: email,
			contactNo: contactNo,
			message: message,
			partnerType: partnerType,
			status: "Inprogress",
			enquiryActivities: [
				{
					"action": "",
					"remarks": ""
				}
			]
		};
		console.log(JSON.stringify(params))
		let api = yield invokeAPIRequest(ENQUIRY_API_END_URL, params, false)
		console.log("api called")
		yield put(actions.sampleComplete(api.results));
		// navigation('/contact/success', { replace: true })
	} catch (error) {
		yield put(actions.sampleError(error));
	}
}

export function* sagaSample() {
	yield takeLatest(actions.sample, _sagaSample);
}



