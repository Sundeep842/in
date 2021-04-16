import { createSlice } from '@reduxjs/toolkit'
import {
  useInjectReducer,
  useInjectSaga,
} from 'redux-injectors';
import {
  sagaLoadFormDetails, sagaFormSubmit, sagaUpdate, sagaAllPrioritListDetails, sagaCompletedTodoListDetails,
  sagaDeletedTodoListDetails, sagaPriorityListDetails, sagaLowPriorityListDetails,sagaStarredTodoListDetails
}
  from './saga'
import { all } from 'redux-saga/effects'

export const initialState = {
  loading: false,
  error: false,
  todo_list: [],
  all_priority_list: [],
  completed_todolist: [],
  deleted_todolist: [],
  starred_todolist: [],
  priority_list: [],
  low_priority_list: [],
  title: null,
  description: null,
  assignedTo: null,
  priority: null,
  flag: null,
  dueDate: null, // YYYY-MM-DD
  status: null,
  action: null,
  comments: null,
  isFormSubmitted: false
} // initial state 

const slice = createSlice({
  name: '_todoSlice',
  initialState,
  reducers: {
    todo(state, action) {
      state.loading = true
      state.error = null
      state.title = action.payload.title
      state.assignedTo = action.payload.assignedTo
      state.dueDate = action.payload.dueDate
      state.priority = action.payload.priority
      state.description = action.payload.description
      state.status = action.payload.status
      state.action = action.payload.action
      state.comments = action.payload.comments
      state.flag = action.payload.flag
    },
    todoview(state, action) {
      state.loading = true
      state.error = null
      state.taskRefId = action.payload.taskRefId
      state.title = action.payload.title
      state.assignedTo = action.payload.assignedTo
      state.dueDate = action.payload.dueDate
      state.priority = action.payload.priority
      state.description = action.payload.description
      state.status = action.payload.status
      state.action = action.payload.action
      state.comments = action.payload.comments
      state.flag = action.payload.flag

    },
    todoError(state, action) {
      state.loading = false
      state.error = action.payload
    },
    todoComplete(state, action) {
      state.loading = false
      state.isFormSubmitted = action.payload
    },
    loadFormDetails(state, action) {
      state.loading = true
    },
    loadAllViewDetails(state, action) {
      state.loading = true
    },
    formLoaded(state, action) {
      state.loading = false
      state.title = action.payload.title
      state.assignedTo = action.payload.assignedTo
      state.status = action.payload.status
      state.description = action.payload.description
      state.priority = action.payload.priority
      state.comments = action.payload.comments
      state.action = action.payload.action
      state.flag = action.payload.flag
      state.dueDate = action.payload.dueDate
    },
    formLoadedview(state, action) {
      state.loading = false
      state.remarks = action.payload.remarks
      state.status = action.payload.status
      state.enqRefId = action.payload.enqRefId
      state.name = action.payload.name
      state.contactNo = action.payload.contactNo
      state.email = action.payload.email
      state.message = action.payload.message
      state.partnerType = action.payload.partnerType
    },
    loadList(state, action) {
      state.loading = false
      state.error = null

    },
    loadedAllTodo(state, action) {
      state.todo_list = action.payload
      state.loading = false
    },
    loadAllPriorityListDetails(state, action) {
      state.loading = true
    },
    loadedAllPriorityListDetails(state, action) {
      state.all_priority_list = action.payload
      state.loading = false
      console.log(state.all_priority_list)
    },
    loadCompletedTodoListDetails(state, action) {
      state.loading = true
    },
    loadedCompletedTodoListDetails(state, action) {
      state.completed_todolist = action.payload
      state.loading = false
    },
    loadDeletedTodoListDetails(state, action) {
      state.loading = true
    },
    loadedDeletedTodoListDetails(state, action) {
      state.deleted_todolist = action.payload
      state.loading = false
    },
    loadStarredTodoListDetails(state, action) {
      state.loading = true
    },
    loadedStarredTodoListDetails(state, action) {
      state.starred_todolist = action.payload
      state.loading = false
    },
    loadPriorityListDetails(state, action) {
      state.loading = true
    },
    loadedPriorityListDetails(state, action) {
      state.priority_list = action.payload
      state.loading = false
      console.log(state.priority_list)
    },
    loadLowPriorityListDetails(state, action) {
      state.loading = true
    },
    loadedLowPriorityListDetails(state, action) {
      state.low_priority_list = action.payload
      state.loading = false
    },

  },
});

export const { actions, reducer } = slice;

function* componentSaga() {
  yield all([

    sagaFormSubmit(),
    sagaLoadFormDetails(),
    sagaUpdate(),
    sagaAllPrioritListDetails(),
    sagaCompletedTodoListDetails(),
    sagaDeletedTodoListDetails(),
    sagaPriorityListDetails(),
    sagaLowPriorityListDetails(),
    sagaStarredTodoListDetails()
  ]);
}
export const useTodoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: componentSaga });
  // useInjectSaga({ key: slice.name, saga: sagaLoadFormDetails });
  return { actions: slice.actions };
};