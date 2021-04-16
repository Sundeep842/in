import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) => state._layoutSlice || initialState

export const selectShowTheme = createSelector(
  [_state],
  state => state.showTheme
);

export const selectTheme = createSelector(
  [_state],
  state => state.theme
);

export const selectLoading = createSelector(
  [_state],
  state => state.loading
);

export const selectError = createSelector(
  [_state],
  state => state.error
);

export const selectChatBox = createSelector(
  [_state],
  state => state.showChatBox
);

export const selectMobileView = createSelector(
  [_state],
  state => state.isMobileView
);

export const selectMenuToggle = createSelector(
  [_state],
  state => state.toggleMenu
);
