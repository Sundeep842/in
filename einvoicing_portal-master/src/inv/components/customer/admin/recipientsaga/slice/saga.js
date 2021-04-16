// saga middleware
import { put, select, takeLatest, takeEvery, delay, all } from 'redux-saga/effects'
import { actions } from '.'
import {
  selectRecipientId,
  selectRecipientTag, selectDescription, selectDeliveryMode, selectIsActive,
  selectRecipientGstinMappings, selectAllGstins, selectAllDelmodes, selectEmailAddress
  ,selectFtpServer,selectFtpLocation,selectUserName,selectPassword,selectUrl, selectDeliveryMechanism
} from './selectors'
import { invokeAPIRequest, invokeAPIGetRequest } from '../../../../../../Request'
import { RECIPIENT_API_END_URL, RECIPIENTID_API_END_URL, GSTIN_MAPPING } from '../../../../../constants/Constants'




export function* _sagaFormSubmit() {
  console.log('_sagaFormSubmit called')
  // call api to save form data
  const recipientId = yield select(selectRecipientId)
  // const recipientId = recipientId
  const recipientTag = yield select(selectRecipientTag)
  const description = yield select(selectDescription)
  const deliveryMode = yield select(selectDeliveryMode)
  const deliveryMechanism = yield select(selectDeliveryMechanism)
  const isActive = yield select(selectIsActive)
  const recipientGstinMappings = yield select(selectAllGstins)
  const emailAddress = yield select(selectEmailAddress)
  const ftpServer = yield select(selectFtpServer)
  const ftpLocation = yield select(selectFtpLocation)
  const userName = yield select(selectUserName)
  const password = yield select(selectPassword)
  const url = yield select(selectUrl)

  try {
    let params =
    {
      // deliveryMode:"email",
      deliveryMode: deliveryMode,
      deliveryMechanism:deliveryMechanism,
      description: description,
      isActive: isActive,
      recipientActivities: [],
      recipientEmailMapping: [{
        emailAddress: emailAddress
      }],
      recipientFtpMappings: [
        {
          ftpServer:ftpServer,
          ftpLocation:ftpLocation,
          userName:userName,
          password:password
        }
      ],
      recipientGstinMappings: recipientGstinMappings,
      recipientTag: recipientTag,
      recipientWebserviceMappings: [{
        url:url,
        userName:userName,
        password:password
      }],
      recipientId: recipientId
    }
    console.log(JSON.stringify(params))
    let api = yield invokeAPIRequest(RECIPIENT_API_END_URL, params, true)
    console.log("api called")
    yield put(actions.formSubmitted(api.results));
  } catch (error) {
    yield put(actions.setError(error));
  }
}
export function* _sagaLoadFieldDetails() {
  console.log("get api called")
  try {
    let api = yield invokeAPIGetRequest(RECIPIENTID_API_END_URL, true);
    console.log("end of get")
    console.log(api)
    console.log(api.results)
    yield put(actions.formLoaded({ recipientId: api.results }));
  } catch (error) {
    console.log("error block of get")
    yield put(actions.setError(error));
  }
}

export function* _sagaLoadFormDetails(props) {
  try {

    let api = yield invokeAPIGetRequest(RECIPIENT_API_END_URL, true)
    yield put(actions.loadedAllRecipients(api.results));
  } catch (error) {
    console.log("error in api")
    yield put(actions.recipientlistError(error));
  }
}
export function* _sagaLoadMultiSelect(props) {
  try {
    let arr = [];
    let api = yield invokeAPIGetRequest(GSTIN_MAPPING, true)
    console.log(Object.keys(api.results))
    console.log(Object.values(api.results))
    var arrKeys = Object.keys(api.results);
    var arrValues = Object.values(api.results);

    for (let i = 0; i < arrKeys.length; i++) {
      arr.push(
        {
          // id: i + 1, 
          gstin: arrKeys[i],
          gstinTag: arrValues[i]
        },
      )
      console.log(arr)
    }
    yield put(actions.loadedAllGstin(arr));
  } catch (error) {
    console.log("error in api")
    yield put(actions.recipientlistError(error));
  }
}


export function* sagaFormSubmit() {
  yield takeLatest(actions.recipient, _sagaFormSubmit);
}

export function* sagaLoadFieldDetails() {
  yield takeEvery(actions.loadFormDetails, _sagaLoadFieldDetails);
}
export function* sagaLoadFormDetails() {
  yield takeEvery(actions.loadFormDetails, _sagaLoadFormDetails);
}
export function* sagaLoadMultiSelect() {
  yield takeEvery(actions.loadFormDetails, _sagaLoadMultiSelect);
}
