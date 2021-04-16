import { createSlice } from '@reduxjs/toolkit'
import { sagaLoadAllPartners } from './saga'
import {
    useInjectReducer,
    useInjectSaga,
} from 'redux-injectors';
import { all } from 'redux-saga/effects'

export const initialState = {
    loading: false,
    error: null,
    partners: []
}

const slice = createSlice({
    name: '_partnerSlice',
    initialState,
    reducers: {
        loadAllPartners(state) {
            state.loading = true
        },
        loadAllPartnersCompleted(state, action) {
            state.loading = false
            state.partners = action.payload
        },
        loadError(state, action) {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { actions, reducer } = slice;

function* addComponentsSaga() {
    yield all([
        sagaLoadAllPartners()
    ]);
}

export const usePartnersSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: addComponentsSaga });
    return { actions: slice.actions };
};
