import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) =>  state._sampleSlice || initialState

export const selectFormSubmitted = createSelector(
  [_state],
  state => state.isFormSubmitted
);

export const selectName = createSelector(
  [_state],
  state => state.name
);

export const selectLoading = createSelector(
  [_state],
  state => state.loading
);

export const selectError = createSelector(
  [_state],
  state => state.error
);

export const selectEmail = createSelector(
  [_state],
  state => state.email
);

export const selectContactNo = createSelector(
  [_state],
  state => state.contactNo
);
export const selectMessage = createSelector(
    [_state],
    state => state.message
  );
  export const selectPartnerType = createSelector(
    [_state],
    state => state.partnerType
  );
