import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) => state._allInvoiceSlice || initialState

export const selectAllInvoices = createSelector(
  [_state],
  state => state.invoice_list
);

export const selectLoading = createSelector(
  [_state],
  state => state.loading
);

export const selectError = createSelector(
  [_state],
  state => state.error
);
