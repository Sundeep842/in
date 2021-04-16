// state seletors for the current component
import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) => state._vendorSlice || initialState

export const customer_PartnerId = createSelector(
  [_state],
  state => state.customerPartnerId
);
export const selectAllMappedVendors = createSelector(
  [_state],
  state => state.vendors_list
);
export const selectAllVendors = createSelector(
  [_state],
  state => state.allvendors_list
);

export const vendor_PartnerId = createSelector(
  [_state],
  state => state.vendorPartnerId
);
export const Description = createSelector(
  [_state],
  state => state.description
);
export const action_Taken = createSelector(
  [_state],
  state => state.actionTaken
);
export const action_Comments = createSelector(
  [_state],
  state => state.actionComments
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
export const selectVendorList = createSelector(
  [_state],
  state => state.vendorsList
);
export const selectSearchVendor = createSelector(
  [_state],
  state => state.searchVendors
);
export const search_data = createSelector(
  [_state],
  state => state.search
);

export const search_data_vendors = createSelector(
  [_state],
  state => state.searchvendorList
);
export const selectedPartnerId = createSelector(
  [_state],
  state => state.partnerId
);
export const selectFormSubmitted = createSelector(
  [_state],
  state => state.isFormSubmitted
)

