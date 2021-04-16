import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaFetchAllInvoices , sagaChangeTab  , sagaUploadInvoice , sagaLoadExistingInvoiceDetails ,
  sagaSubmitInvoiceJsonDetails, sagaLoadRecipientDetailsJson  } from './saga';
import { all } from 'redux-saga/effects'


export const initialState = {
	loading : false,
	error : false,
	jsonUploads : null,
  tabIndex : 0,
  isLeftArrorwClicked : false,
  isRightArrowClicked : false,
  hasuploaded : false,
  invoiceDetails : null,
  refId:null,
  searchRecipients : false,
  recipientsList : [],
  invJsn:[],
  invDoc:[]
} // initial state 

const slice = createSlice({
  name: '_invoiceJsonSlice',
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
    invoiceUploadError(state,action) {
      state.loading = false
      state.error = action.payload
    },
    invoiceJsonUploadError(state,action) {
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
    searchRecipientsJson(state) {
      state.loading = true
    },
    searchRecipientsCompleted(state,action) {
      state.loading = false
      state.recipientsList = action.payload
    },
   
    InvoiceJsonSub(state,action) {
      state.loading = true
      state.error = null
      console.dir(action.payload);
      state.jsonUploads = action.payload
    },
    InvoiceJsonSubCompleted(state,action) {
      state.loading = false
      // state.hasuploaded =  !action.payload.hasError
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
    //  sagaChangeTab(),
      sagaLoadRecipientDetailsJson(),
   //   sagaUploadInvoice(),
    //  sagaLoadExistingInvoiceDetails(),
     sagaSubmitInvoiceJsonDetails()
  ]);
}

export const useJsonInvoiceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: addComponentsSaga });
  return { actions: slice.actions };
};