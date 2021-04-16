import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaLogin } from './saga';


export const initialState = {
	loading : false,
	error : false,
	userName :  (JSON.parse(localStorage.getItem('appUser')) && JSON.parse(localStorage.getItem('appUser')).userId) || null,
  password : null,
  user : JSON.parse(localStorage.getItem('appUser')) || null
} // initial state 

const slice = createSlice({
  name: '_loginSlice',
  initialState,
  reducers: {
  	login(state,action) {
      state.loading = true
      state.error = null
      state.userName = action.payload.userId
      state.password = action.payload.password
    },
    loginError(state,action) {
      state.loading = false
      state.error = action.payload
    },
    loginComplete(state,action) {
      state.loading = false
      state.user = action.payload
      localStorage.setItem('appUser',JSON.stringify(action.payload))     // save user details in local storge 
    }
  },
});
export const { actions, reducer } = slice;

export const useLoginSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: sagaLogin });
  return { actions: slice.actions };
};