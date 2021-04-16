import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) =>  state._enquirylistSlice || initialState

export const selectFormSubmission = createSelector(
  [_state],
  state => state.isFormSubmitted
);

export const selectAllEnquires = createSelector(
  [_state],
  state => state.enquiry_list
);

export const selectName = createSelector(
  [_state],
  state => state.name
);
export const selectStatus = createSelector(
  [_state],
  state => state.status
);
export const selectEnqID = createSelector(
  [_state],
  state => state.enqRefId
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
  export const selectRemarks = createSelector(
    [_state],
    state => state.remarks
  );
