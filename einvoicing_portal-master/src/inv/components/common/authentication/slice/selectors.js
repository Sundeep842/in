import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) => state._loginSlice || initialState

export const selectUserName = createSelector(
  [_state],
  state => state.userName
);

export const selectLoading = createSelector(
  [_state],
  state => state.loading
);

export const selectError = createSelector(
  [_state],
  state => state.error
);

export const selectPassword = createSelector(
  [_state],
  state => state.password
);

export const selectUser = createSelector(
  [_state],
  state => state.user
);

