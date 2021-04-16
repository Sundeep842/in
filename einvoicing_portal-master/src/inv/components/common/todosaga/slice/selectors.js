import { createSelector } from '@reduxjs/toolkit'
import { initialState } from '.'

const _state = (state) => state._todoSlice || initialState

export const selectAllTodo = createSelector(
  [_state],
  state => state.todo_list
);
export const selectFormSubmitted = createSelector(
  [_state],
  state => state.isFormSubmitted
);

export const selectAllPriorityList = createSelector(
  [_state],
  state => state.all_priority_list
);
export const selectCompletedTodoList = createSelector(
  [_state],
  state => state.completed_todolist
);
export const selectDeletedTodoList = createSelector(
  [_state],
  state => state.deleted_todolist
);

export const selectStarredTodoList = createSelector(
  [_state],
  state => state.starred_todolist
);
export const selectPriorityTodoList = createSelector(
  [_state],
  state => state.priority_list
);

export const selectLowPriorityTodoList = createSelector(
  [_state],
  state => state.low_priority_list
);

export const selectTitle = createSelector(
  [_state],
  state => state.title
);
export const selectStatus = createSelector(
  [_state],
  state => state.status
);


export const selectLoading = createSelector(
  [_state],
  state => state.loading
);

export const selectError = createSelector(
  [_state],
  state => state.error
);


export const selectDescription = createSelector(
  [_state],
  state => state.description
);
export const selectTaskRefID = createSelector(
  [_state],
  state => state.taskRefId
);

export const selectAssignedTo = createSelector(
  [_state],
  state => state.assignedTo
);
export const selectPriority = createSelector(
  [_state],
  state => state.priority
);
export const selectAction = createSelector(
  [_state],
  state => state.action
);
export const selectComments = createSelector(
  [_state],
  state => state.comments
);
export const selectDueDate = createSelector(
  [_state],
  state => state.dueDate
);
export const selectFlag = createSelector(
  [_state],
  state => state.flag
);
export const selectedFilter = createSelector(
  [_state],
  state => state.selectedFilter
);
