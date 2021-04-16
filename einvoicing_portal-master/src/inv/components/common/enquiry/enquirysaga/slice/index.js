import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaEnquiry } from './saga';

export const initialState = {
	loading : false,
	error : false,
    name: null,
    contactNo: null,
    email: null,
    message: null,
    partnerType: null,
    isFormSubmitted : null
} // initial state 

const slice = createSlice({
  name: '_enquirySlice',
  initialState,
  reducers: {
  	enquiry(state,action) {
      state.loading = true
      state.error = null
      state.name = action.payload.name
      state.contactNo = action.payload.contactNo
      state.email = action.payload.email
      state.message = action.payload.message
      state.partnerType = action.payload.partnerType
    },
    enquiryError(state,action) {
      state.loading = false
      state.error = action.payload
    },
    enquiryComplete(state,action) {
      state.loading = false
      state.isFormSubmitted = action.payload
    }
  },
});

export const { actions, reducer } = slice;

export const useEnquirySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: sagaEnquiry });
  return { actions: slice.actions };
};