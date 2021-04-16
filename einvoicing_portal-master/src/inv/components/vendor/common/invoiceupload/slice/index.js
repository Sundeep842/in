import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaFetchAllInvoices , sagaChangeTab  , sagaUploadInvoice , sagaLoadExistingInvoiceDetails , sagaLoadRecipientDetails } from './saga';
import { all } from 'redux-saga/effects'


export const initialState = {
	loading : false,
	error : false,
	uploads : null,
  tabIndex : 0,
  isLeftArrorwClicked : false,
  isRightArrowClicked : false,
  hasuploaded : false,
  invoiceDetails : null,
  refId:null,
  searchRecipients : false,
  recipientsList : []
} // initial state 

const slice = createSlice({
  name: '_invoiceSlice',
  initialState,
  reducers: {
  	loadAllInvoices(state,action) {
      state.loading = true
      state.error = null
    },
    loadedAllInvoices(state,action) {
      state.invoice_list =  action.payload
      state.loading = false
    },
    loadAllInvoiceError(state,action) {
       state.loading = false
       state.error = action.payload
    },
    changeTab(state,action) {
      state.loading = true
      state.tabIndex = action.payload
    },
    tabChanged(state,action) {
      state.loading = false
    },
    uploadInvoice(state,action) {
      state.loading = true
      state.uploads = action.payload
    },
    invoiceUploaded(state,action) {
      state.loading = false
      state.hasuploaded =  !action.payload.hasError
    },
    invoiceUploadError(state,action) {
      state.loading = false
      state.error = action.payload
    },
    emptyUploads(state,action) {
      state.hasuploaded =  action.payload
    },
    loadExistingInvoiceDetails(state,action) {
      state.loading = true
      state.refId = action.payload
    },
    existingInvoiceLoaded(state,action) {
      state.loading = false
      state.invoiceDetails = action.payload
    },
    invoiceFetchError(state,action) {
      state.loading = false
      state.error = action.payload
    },
    openSearchRecipients(state,action) {
      state.searchRecipients = action.payload
    },
    closeSearchRecipients(state,action) {
      state.searchRecipients = action.payload
    },
    searchRecipients(state) {
      state.loading = true
    },
    searchRecipientsCompleted(state,action) {
      state.loading = false
      state.recipientsList = action.payload
    },
    setError(state,action) {
      state.loading = false
      state.error = action.payload
    }
  },
});

export const { actions, reducer } = slice;

function* addComponentsSaga() {
  yield all([
      sagaFetchAllInvoices(),
      sagaChangeTab(),
      sagaLoadRecipientDetails(),
      sagaUploadInvoice(),
      sagaLoadExistingInvoiceDetails()
  ]);
}

export const useInvoiceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: addComponentsSaga });
  return { actions: slice.actions };
};