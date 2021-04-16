import { put, select, takeLatest, takeEvery, delay, all } from 'redux-saga/effects'
import { actions, NavigatorFun } from '.'
import { invokeAPIGetRequest, invokeAPIRequest, invokeGetRequest } from '../../../../../Request';
import { ALLVENDORS_API_END_URL, NEW_VENDOR_MAPPING, VENDORSEARCH_API_END_URL, VENDORS_API_END_URL } from '../../../../constants/Constants';
import {
  customer_PartnerId,
  vendor_PartnerId,
  Description,
  action_Comments,
  action_Taken,
  search_data,
  searchvendorList

} from './selectors';

export function* _sagaFormSubmit() {
  console.log('_sagaFormSubmit called')
  // call api to save form data
  const _customerPartnerId = yield select(customer_PartnerId)
  const _vendorPartnerId = yield select(vendor_PartnerId)
  const _description = yield select(Description)
  const _actionTaken = yield select(action_Taken)
  const _actionComments = yield select(action_Comments)

  let params = {
    customerPartnerId: _customerPartnerId,
    vendorPartnerId: _vendorPartnerId,
    description: _description,
    vendorMappingActivities: [
      {
        actionComments: _actionComments,
        actionTaken: _actionTaken
      }
    ]

  }
  console.log(params)

  try {

    console.log("FORM SUbmitted")
    let api = yield invokeAPIRequest(NEW_VENDOR_MAPPING, params, true);
    console.log(api)
    document.getElementById("close").click()
    yield put(actions.formSubmitted(api.results));
    console.log(api.results)
    return api;
    // Navigation("/app/vendor_manager/MappedVendorList", { replace: true });
  } catch (error) {
    yield put(actions.formError(error));
  }

}

export function* sagaFormSubmit() {
  yield takeLatest(actions.vendorForm, _sagaFormSubmit);
}

export function* _sagaLoadFormDetails(props) {
  try {
    let api = yield invokeAPIGetRequest(VENDORS_API_END_URL, true)
    yield put(actions.loadedAllMappedVendors(api.results));
  } catch (error) {
    console.log("error in api")
    yield put(actions.loadMappedVendorsError(error));
  }
}

export function* sagaLoadFormDetails() {
  yield takeEvery(actions.loadMappedVendors, _sagaLoadFormDetails);
}


export function* _sagaLoadVendorDetails(props) {
  try {
    let api = yield invokeAPIGetRequest(ALLVENDORS_API_END_URL, true)
    const data = []
    var arrKeys = Object.keys(api.results);
    var arrValues = Object.values(api.results);
    for (let i = 1; i <= arrKeys.length; i++) {
      data.push({
        id: i,
        partnerId: arrKeys[i - 1],
        companyName: arrValues[i - 1],
      })
    }
    console.log(data)
    yield put(actions.loadedAllVendors(data));
  } catch (error) {
    console.log("error in api")
    yield put(actions.loadVendorsError(error));
  }
}

export function* sagaLoadVendorDetails() {
  yield takeEvery(actions.loadVendorFormDetails, _sagaLoadVendorDetails);
}

export function* _sagasearchFormSubmit() {
  console.log('_sagasearchFormSubmit called')
  // call api to save form data
  const _search = yield select(search_data)
  let params = {
    search: _search
  }
  console.log(params)
  try {
    let api = yield invokeAPIGetRequest(VENDORSEARCH_API_END_URL + params.search, true);
    const data = []
    var arrKeys = Object.keys(api.results);
    var arrValues = Object.values(api.results);
    for (let i = 1; i <= arrKeys.length; i++) {
      data.push({
        id: i,
        partnerId: arrKeys[i - 1],
        companyName: arrValues[i - 1],
      })
    }
    console.log("data", data)
    yield put(actions.loadedSearchedVendors(data));
  } catch (error) {
    yield put(actions.formError(error));
  }
}

export function* sagasearchFormSubmit() {
  yield takeLatest(actions.searchvendorForm, _sagasearchFormSubmit);
}

