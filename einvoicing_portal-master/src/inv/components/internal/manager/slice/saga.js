import { put, takeLatest, delay } from 'redux-saga/effects'
import { actions } from '.'
import { GET_ALL_INVITATIONS } from '../../../../constants/Constants'
import { invokeAPIGetRequest } from '../../../../../Request'


export function* _sagaLoadAllPartners() {
	try {
		// rest api 
        yield delay(5000)
        let api = yield invokeAPIGetRequest(GET_ALL_INVITATIONS, true)
        console.log(api)
        yield put(actions.loadAllPartnersCompleted(api.results));
    } catch (error) {
		yield put(actions.loadError(error));
	}
}

export function* sagaLoadAllPartners() {
	yield takeLatest(actions.loadAllPartners, _sagaLoadAllPartners);
}

