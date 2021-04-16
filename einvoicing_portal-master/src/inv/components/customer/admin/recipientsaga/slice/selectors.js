import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) => state._recipientSlice || initialState

export const selectAllRecipients = createSelector(
  [_state],
  state => state.recipient_list
);

export const selectAllGstins = createSelector(
  [_state],
  state => state.gstin_list
);
export const selectAllDelmodes = createSelector(
  [_state],
  state => state.delmode_list
);
export const selectRecipientId = createSelector(
  [_state],
  state => state.recipientId
);
export const selectRecipientTag = createSelector(
  [_state],
  state => state.recipientTag
);

export const selectDeliveryMode = createSelector(
  [_state],
  state => state.deliveryMode
);
export const selectDescription = createSelector(
  [_state],
  state => state.description
);

export const selectIsActive = createSelector(
  [_state],
  state => state.isActive
);
export const selectRecipientGstinMappings = createSelector(
  [_state],
  state => state.recipientGstinMappings
);
export const selectDeliveryMechanism = createSelector(
  [_state],
  state => state.deliveryMechanism
);
export const selectEmailAddress = createSelector(
  [_state],
  state => state.emailAddress
);
export const selectFtpServer = createSelector(
  [_state],
  state => state.ftpServer
);
export const selectFtpLocation = createSelector(
  [_state],
  state => state.ftpLocation
);
export const selectUserName = createSelector(
  [_state],
  state => state.userName
);
export const selectPassword = createSelector(
  [_state],
  state => state.password
);
export const selectUrl = createSelector(
  [_state],
  state => state.url
);
export const selectLoading = createSelector(
  [_state],
  state => state.loading
);

export const selectError = createSelector(
  [_state],
  state => state.error
);
export const selectIsFormSubmitted = createSelector(
  [_state],
  state => state.isFormSubmitted
);
