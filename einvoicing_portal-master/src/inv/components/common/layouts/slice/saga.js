import { put,  takeLatest } from 'redux-saga/effects'
import { actions } from '.'


export function* _sagaChangeTheme() { 
	yield put(actions.themeChanged(false)); // chnage current theme 
}


export function* sagaChangeTheme() {
  yield takeLatest(actions.changeTheme, _sagaChangeTheme);
}

export function* sagaChangeChatBox() {
	yield takeLatest(actions.login, sagaChangeChatBox);
}


