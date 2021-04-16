// all slice implementation
import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaFormSubmit, sagaLoadFormDetails, sagaLoadFieldDetails, sagaLoadMultiSelect } from './saga'
import { all } from 'redux-saga/effects'


export const initialState = {
  recipient_list: [],
  gstin_list: [],
  delmode_list: [],
  recipientId: null,
  recipientTag: null,
  deliveryMode: null,
  description: null,
  isActive: 'yes',
  deliveryMechanism: null,
  recipientGstinMappings: null,
  emailAddress:null,
  loading: false,
  error: null,
  isFormSubmitted: null
}

const slice = createSlice({
  name: '_recipientSlice',
  initialState,
  reducers: {
    recipient(state, action) {
      state.loading = true
      state.error = null
      state.recipientId = action.payload.recipientId
      state.recipientTag = action.payload.recipientTag
      state.deliveryMode = action.payload.deliveryMode
      state.description = action.payload.description
      state.isActive = action.payload.isActive
      state.deliveryMechanism = action.payload.deliveryMechanism
      state.recipientGstinMappings = action.payload.recipientGstinMappings
      state.emailAddress = action.payload.emailAddress
      state.ftpServer=action.payload.ftpServer
      state.ftpLocation=action.payload.ftpLocation
      state.userName= action.payload.userName
      state.password= action.payload.password
      state.url=action.payload.url
    
    },
    recipientlistError(state, action) {
      state.loading = false
      state.error = action.payload
    },
    recipientlistComplete(state, action) {
      state.loading = false
      state.isFormSubmitted = action.payload
    },
    formSubmitted(state, action) {
      state.loading = false
      state.isFormSubmitted = action.payload
    },
    loadFormDetails(state, action) {
      state.loading = true
    },
    formLoaded(state, action) {
      state.loading = false
      state.recipientId = action.payload.recipientId
    },
    loadList(state, action) {
      state.loading = false
      state.error = null
    },
    loadedAllRecipients(state, action) {
      state.recipient_list = action.payload
      state.loading = false
    },
    loadedAllGstin(state, action) {
      state.gstin_list = action.payload
      state.loading = false
    },
    loadedAllDelmodes(state, action) {
      state.delmode_list = action.payload
      state.loading = false
    },
  }
})

export const { actions, reducer } = slice

function* componentSaga() {
  yield all([
    sagaFormSubmit(),
    sagaLoadFieldDetails(),
    sagaLoadFormDetails(),
    sagaLoadMultiSelect()
  ]);
}

export const useRecipientSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: componentSaga });
  // useInjectSaga({ key: slice.name, saga: sagaLoadFormDetails });
  return { actions: slice.actions };
};

