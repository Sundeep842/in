import { combineReducers } from '@reduxjs/toolkit';

export function createReducer(injectedReducers = {}) {
  console.dir(injectedReducers)
  if (Object.keys(injectedReducers).length === 0) {
    return state => state
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
