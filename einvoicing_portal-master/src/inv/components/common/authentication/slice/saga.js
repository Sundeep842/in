import { put, select, takeLatest } from 'redux-saga/effects'
import { actions } from '.'
import { selectUserName , selectPassword } from './selectors'
import { invokeAPIRequest } from '../../../../../Request'
import { LOGIN_API_END_URL } from '../../../../constants/Constants'


export function* _sagaLogin() { 
	const username = yield select(selectUserName)
	const password = yield select(selectPassword)
	try {
		let api = yield invokeAPIRequest(LOGIN_API_END_URL,{
			user: username,
	        password: password
		},false)
		yield put(actions.loginComplete(api.results));
	} catch (error) {
		yield put(actions.loginError(error));
	}
}


export function* sagaLogin() {
  yield takeLatest(actions.login, _sagaLogin);
}


