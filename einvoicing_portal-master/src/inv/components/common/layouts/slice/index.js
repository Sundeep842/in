import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { sagaChangeTheme } from './saga';

export const initialState = {
	loading : false,
	error : false,
	isMobileView : false,
  showTheme : false,
  showChatBox : false,
  toggleMenu : false,
  theme : JSON.parse(localStorage.getItem('theme'))  || {}
} // initial state 

const slice = createSlice({
  name: '_layoutSlice',
  initialState,
  reducers: {
    toggleMenu(state,action) {
      state.loading = true
      state.error = null
      state.toggleMenu = action.payload
    },
    setMobileView(state,action) {
      state.loading = true
      state.error = null
      state.isMobileView = action.payload
    },
    changeTheme(state,action) {
      state.loading = true
      state.error = null
      state.theme = action.payload
    },
    themeChanged(state,action) {
      state.loading = false
      state.showTheme = action.payload
      localStorage.setItem('theme',JSON.stringify(state.theme)) 
      window.location.reload()
    },
    showChatBox(state,action) {
      state.loading = true
      state.error = null
      state.showChatBox = action.payload
    }
  },
});

export const { actions, reducer } = slice;

export const useLayoutSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: sagaChangeTheme });
  return { actions: slice.actions };
};