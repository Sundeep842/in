// saga middleware
import { put, select, takeLatest , takeEvery , delay ,all } from 'redux-saga/effects'
import { actions } from '.'
import {
  selectName,
  selectAddress
} from './selectors'

export function* _sagaFormSubmit() {
  console.log('_sagaFormSubmit called')
  // call api to save form data
  const name = yield  select(selectName)
  const address = yield select(selectAddress)
  console.log(name + "" + address)
  yield delay(1000)
  // response back with action
  yield put(actions.formSubmitted(true));
}

export function* _sagaLoadFormDetails() {
  yield delay(4000)
  // response back with action
  yield put(actions.formLoaded({name : "sample name" , address : "sample address"}));
}


export function* sagaFormSubmit () {
    yield takeEvery(actions.submitForm, _sagaFormSubmit);
}

export function* sagaLoadFormDetails() {
  yield takeEvery(actions.loadFormDetails, _sagaLoadFormDetails);
}
  