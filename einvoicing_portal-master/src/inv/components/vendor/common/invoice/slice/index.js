import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaFetchAllInvoices } from './saga';
import { all } from 'redux-saga/effects'


export const initialState = {
	loading : false,
	error : false,
	invoice_list : [],
} // initial state 

const slice = createSlice({
  name: '_allInvoiceSlice',
  initialState,
  reducers: {
  	loadInvoices(state) {
      state.loading = true
      state.error = null
    },
    invoicesLoaded(state,action) {
      state.invoice_list =  action.payload
      state.loading = false
    },
    invoiceLoadError(state,action) {
       state.loading = false
       state.error = action.payload
    }
  },
});

export const { actions, reducer } = slice;

function* addComponentsSaga() {
  yield all([
      sagaFetchAllInvoices()
  ]);
}

export const useInvoiceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: addComponentsSaga });
  return { actions: slice.actions };
};