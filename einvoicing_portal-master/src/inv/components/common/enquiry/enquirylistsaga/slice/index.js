import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaLoadFormDetails, sagaFormSubmit, sagaStatusChange }
  from './saga'
import { all } from 'redux-saga/effects'

export const initialState = {
  loading: false,
  error: false,
  enquiry_list: [],
  name: null,
  contactNo: null,
  email: null,
  message: null,
  partnerType: null,
  remarks: null,
  status:null,
  enqRefId:null,
  isFormSubmitted: null
} // initial state 

const slice = createSlice({
  name: '_enquirylistSlice',
  initialState,
  reducers: {
    enquirylist(state, action) {
      state.loading = true
      state.error = null
      state.name = action.payload.name
      state.contactNo = action.payload.contactNo
      state.email = action.payload.email
      state.message = action.payload.message
      state.partnerType = action.payload.partnerType
      state.remarks = action.payload.remarks
    },
    enquiryview(state, action) {
      state.loading = true
      state.error = null
      state.remarks = action.payload.remarks
      state.status= action.payload.status
      state.enqRefId= action.payload.enqRefId
      state.name = action.payload.name
      state.contactNo = action.payload.contactNo
      state.email = action.payload.email
      state.message = action.payload.message
      state.partnerType = action.payload.partnerType
    },
    enquirylistError(state, action) {
      state.loading = false
      state.error = action.payload
    },
    enquirylistComplete(state, action) {
      state.loading = false
      state.isFormSubmitted = action.payload
    },
    loadFormDetails(state, action) {
      state.loading = true
    },
    loadAllViewDetails(state, action) {
      state.loading = true
    },
    formLoaded(state, action) {
      state.loading = false
      state.name = action.payload.name
      state.contactNo = action.payload.contactNo
      state.email = action.payload.email
      state.message = action.payload.message
      state.partnerType = action.payload.partnerType
    },
    formLoadedview(state, action) {
      state.loading = false
      state.remarks = action.payload.remarks
      state.status= action.payload.status
      state.enqRefId= action.payload.enqRefId
      state.name = action.payload.name
      state.contactNo = action.payload.contactNo
      state.email = action.payload.email
      state.message = action.payload.message
      state.partnerType = action.payload.partnerType
    },
    loadList(state, action) {
      state.loading = false
      state.error = null

    },
    loadedAllEnquires(state, action) {
      state.enquiry_list = action.payload
      state.loading = false
    },
    statusChanged(state, action) {
      state.loading = true
      state.remarks = action.payload.remarks
      state.status= action.payload.status
      state.enqRefId= action.payload.enqRefId
      state.name = action.payload.name
      state.contactNo = action.payload.contactNo
      state.email = action.payload.email
      state.message = action.payload.message
      state.partnerType = action.payload.partnerType
    },
    statusChangedCompleted(state, action) {
      state.loading = false
  }
  }
});

export const { actions, reducer } = slice;

function* componentSaga() {
  yield all([
    sagaFormSubmit(),
    sagaLoadFormDetails(),
    sagaStatusChange(),
  ]);
}
export const useEnquiryListSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: componentSaga });
  // useInjectSaga({ key: slice.name, saga: sagaLoadFormDetails });
  return { actions: slice.actions };
};