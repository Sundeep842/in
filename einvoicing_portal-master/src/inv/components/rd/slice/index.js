// all slice implementation
import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaFormSubmit , sagaLoadFormDetails } from './saga'
import { all } from 'redux-saga/effects'


export const initialState = {
    name : '',
    address : '',
    loading : false,
    error : null ,
    isFormSubmitted  : false
}

const slice = createSlice({
    name : '_rdSlice',
    initialState,
    reducers : {
        submitForm(state , action) {
            state.loading = true
            state.name  =  action.payload.name
            state.address  = action.payload.address
        },
        formSubmitted(state , action) {
            state.loading = false
            state.isFormSubmitted = action.payload
        },
        loadFormDetails(state, action) {
            state.loading = true
        },
        formLoaded(state,action) {
            state.loading = false
            state.name = action.payload.name
            state.address = action.payload.address
        },
        setError(state, action) {
            state.loading = false
            state.error = action.payload  
        }
    }
})

export const { actions, reducer } = slice

function* componentSaga() {
    yield all([
        sagaFormSubmit(),
        sagaLoadFormDetails(),
    ]);
}

export const useFormSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: componentSaga });
    //useInjectSaga({ key: slice.name, saga: sagaLoadFormDetails });
    return { actions: slice.actions };
  };

