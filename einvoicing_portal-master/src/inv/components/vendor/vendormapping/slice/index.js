// all slice implementation
import { Navigation } from '@material-ui/icons';
import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import { all } from 'redux-saga/effects';
import { sagaFormSubmit, sagaLoadFormDetails, sagaLoadVendorDetails, sagasearchFormSubmit } from './saga'

export const initialState = {
  loading: false,
  error: null,
  customerPartnerId: "",
  vendorPartnerId: "",
  description: "",
  vendors_list: [],
  allvendors_list: [],
  isFormSubmitted : null,
  searchVendors :false,
  vendorsList: [],
  searchvendorList:[],
  partnerId:""
  
}

const slice = createSlice({
  name: '_vendorSlice',
  initialState,
  reducers: {
    loadMappedVendors(state, action) {
      console.log("LoadMappedVendors")
      state.loading = true
    },

    loadMappedVendorsError(state, action) {
      state.loading = false
      state.error = action.payload
    },

    loadedAllMappedVendors(state, action) {
      state.vendors_list = action.payload
      state.loading = false

    },
    loadVendorsError(state, action) {
      state.loading = false
      state.error = action.payload
    },
    loadedAllVendors(state, action) {
      state.allvendors_list = action.payload
      state.loading = false
    },
    vendorForm(state, action) {
      state.loading = true
      state.customerPartnerId = action.payload.customerPartnerId
      state.vendorPartnerId = action.payload.vendorPartnerId
      state.description = action.payload.description
      state.actionTaken = action.payload.actionTaken
      state.actionComments = action.payload.actionComments
    },
    formSubmitted(state, action) {
      state.loading = false
      state.isFormSubmitted = action.payload
    },
    loadFormDetails(state, action) {
      state.loading = true
    },
    loadVendorFormDetails(state, action) {
      state.loading = true
    },
    openSearchVendors(state,action) {
      state.searchVendors = action.payload
    },    
    closeSearchVendors(state,action) {
      state.searchVendors = action.payload
    },
    
    // searchVendors(state) {
    //   state.loading = true
    // },
    // searchVendorsCompleted(state,action) {
    //   state.loading = false
    //   state.vendorsList = action.payload
    // },
    searchvendorForm(state, action) {
      state.loading = true
      state.search = action.payload.search
      
    },
    searchformSubmitted(state, action) {
      state.loading = false
      state.isFormSubmitted = action.payload
    },
    loadSearchedVendors(state, action) {
      state.loading = false
      state.error = action.payload
    },
    loadedSearchedVendors(state, action) {
      state.searchvendorList = action.payload
      state.loading = false

    },
    loadedSelectedPartnerId(state, action) {
      state.partnerId = action.payload
          },
  }
})

export const { actions, reducer } = slice

function* componentSaga() {
  yield all([
    sagaFormSubmit(),
    sagaLoadFormDetails(),
    sagaLoadVendorDetails(),
    sagasearchFormSubmit()
    // sagaLoadVendorsDetails()
   
  ]);
}

export const useVendorMappingSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: componentSaga });
  return { actions: slice.actions };
};


