// state seletors for the current component
import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) => state._rdSlice || initialState

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

export const selectAddress = createSelector(
  [_state],
  state => state.address
);

export const selectIsFormSubmitted = createSelector(
    [_state],
    state => state.isFormSubmitted
  );

