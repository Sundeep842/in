import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'


const _state = (state) => state._partnerSlice || initialState

export const selectLoading = createSelector(
    [_state],
    state => state.loading
);

export const selectError = createSelector(
    [_state],
    state => state.error
);


export const selectPartners = createSelector(
    [_state],
    state => state.partners
);
