import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) => state._invoiceJsonSlice || initialState

export const selectHasUploaded = createSelector(
  [_state],
  state => state.hasuploaded
);

export const selectRefId = createSelector(
  [_state],
  state => state.refId
);

export const selectInvoiceDetails = createSelector(
  [_state],
  state => state.invoiceDetails
);


export const selectLoading = createSelector(
  [_state],
  state => state.loading
);

export const selectUploads = createSelector(
  [_state],
  state => state.jsonUploads
);


export const selectError = createSelector(
  [_state],
  state => state.error
);

export const selectTab = createSelector(
  [_state],
  state => state.tabIndex
);

export const selectinvDoc = createSelector(
  [_state],
  state => state.invDoc
);

export const selectinvJsn = createSelector(
  [_state],
  state => state.invJsn
);

export const selectIsLeftArrowClicked = createSelector(
  [_state],
  state => state.isLeftArrorwClicked
);

export const selectIsRightArrowClicked = createSelector(
  [_state],
  state => state.isRightArrowClicked
);


export const selectSearchRecipient = createSelector(
  [_state],
  state => state.searchRecipients
);

export const selectRecipientList = createSelector(
  [_state],
  state => state.recipientsList
);