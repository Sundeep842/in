import { put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { actions } from '.'
import {
	selectTitle, selectAssignedTo, selectAction, selectComments,
	selectDescription, selectPriority, selectTaskRefID,
	selectFlag, selectDueDate, selectStatus
} from './selectors'
import { invokeAPIGetRequest, invokeAPIRequest } from '../../../../../Request'
import { TODO, TODO_PRIORITY, TODO_STATUS ,TODO_FLAG} from '../../../../constants/Constants'

export function* _sagaLoadFormDetails(props) {
	try {
		let api = yield invokeAPIGetRequest(TODO, true)
		yield put(actions.loadedAllTodo(api.results));
	} catch (error) {
		console.log("error in api")
		yield put(actions.todoError(error));
	}
}
export function* _sagaTodo() {
	const title = yield select(selectTitle)
	const assignedTo = yield select(selectAssignedTo)
	const description = yield select(selectDescription)
	const priority = yield select(selectPriority)
	const dueDate = yield select(selectDueDate)
	const action = yield select(selectAction)
	const comments = yield select(selectComments)
	const flag = yield select(selectFlag)
	const status = yield select(selectStatus)
	try {
		let params = {
			assignedTo: assignedTo,
			description: description,
			dueDate: dueDate,
			flag: flag,
			priority: priority,
			status: status,
			title: title,
			taskActivities: [
				{
					action: action,
					comments: comments
				}
			]
		}
		console.log(JSON.stringify(params))
		let api = yield invokeAPIRequest(TODO, params, true)
		console.log("api called")
		document.getElementById("close").click()
		yield put(actions.todoComplete(api.results));
	} catch (error) {
		yield put(actions.todoError(error));
	}
}

export function* _sagaUpdate() {
	const title = yield select(selectTitle)
	const assignedTo = yield select(selectAssignedTo)
	const description = yield select(selectDescription)
	const priority = yield select(selectPriority)
	const dueDate = yield select(selectDueDate)
	const action = yield select(selectAction)
	const comments = yield select(selectComments)
	const flag = yield select(selectFlag)
	const status = yield select(selectStatus)
	const taskRefId = yield select(selectTaskRefID)
	try {
		let params = {
			taskRefId: taskRefId,
			assignedTo: assignedTo,
			description: description,
			dueDate: dueDate,
			flag: flag,
			priority: priority,
			status: status,
			title: title,
			"taskActivities": [
				{
					action: action,
					comments: comments
				}
			]
		}
		console.log(JSON.stringify(params))
		let api = yield invokeAPIRequest(TODO + "/" + taskRefId, params, true, "put")
		console.log("api called in Update")
		document.getElementById("close").click()
		yield put(actions.todoComplete(api.results));
	} catch (error) {
		yield put(actions.todoError(error));
	}
}

export function* _sagaAllPrioritListDetails() {

	try {
		let api = yield invokeAPIGetRequest(TODO_PRIORITY + "medium", true);
		yield put(actions.loadedAllPriorityListDetails(api.results));
		console.log(api.results)
	} catch (error) {
		console.log("error in api")
		yield put(actions.todoError(error));
	}
}

export function* _sagaCompletedTodoListDetails() {

	try {

		let api = yield invokeAPIGetRequest(TODO_STATUS + "Completed", true);
		yield put(actions.loadedCompletedTodoListDetails(api.results));
		console.log(api.results)
	} catch (error) {
		console.log("error in api")
		yield put(actions.todoError(error));
	}

}

export function* _sagaDeletedTodoListDetails() {

	try {
		let api = yield invokeAPIGetRequest(TODO_STATUS + "Deleted", true);
		yield put(actions.loadedDeletedTodoListDetails(api.results));
		console.log(api.results)
	} catch (error) {
		console.log("error in api")
		yield put(actions.todoError(error));
	}
}

export function* _sagaStarredTodoListDetails() {
console.log("starredapi called")
	try {
		let api = yield invokeAPIGetRequest(TODO_FLAG+"true", true);
		yield put(actions.loadedStarredTodoListDetails(api.results));
		console.log(api.results)
	} catch (error) {
		console.log("error in api")
		yield put(actions.todoError(error));
	}
}
export function* _sagaPrioritListDetails() {

	try {
		let api = yield invokeAPIGetRequest(TODO_PRIORITY + "high", true);
		yield put(actions.loadedPriorityListDetails(api.results));
		console.log(api.results)
	} catch (error) {
		console.log("error in api")
		yield put(actions.todoError(error));
	}
}
export function* _sagaLowPriorityListDetails() {

	try {
		let api = yield invokeAPIGetRequest(TODO_PRIORITY + "low", true);
		yield put(actions.loadedLowPriorityListDetails(api.results));
		console.log(api.results)
	} catch (error) {
		console.log("error in api")
		yield put(actions.todoError(error));
	}
}

export function* sagaLoadFormDetails() {
	yield takeEvery(actions.loadFormDetails, _sagaLoadFormDetails);
}

export function* sagaUpdate() {
	yield takeEvery(actions.todoview, _sagaUpdate);
}
export function* sagaFormSubmit() {
	yield takeLatest(actions.todo, _sagaTodo);
}
export function* sagaAllPrioritListDetails() {
	yield takeEvery(actions.loadAllPriorityListDetails, _sagaAllPrioritListDetails);
}
export function* sagaCompletedTodoListDetails() {
	yield takeEvery(actions.loadCompletedTodoListDetails, _sagaCompletedTodoListDetails);
}
export function* sagaDeletedTodoListDetails() {
	yield takeEvery(actions.loadDeletedTodoListDetails, _sagaDeletedTodoListDetails);
}
export function* sagaStarredTodoListDetails() {
	yield takeEvery(actions.loadStarredTodoListDetails, _sagaStarredTodoListDetails);
}

export function* sagaPriorityListDetails() {
	yield takeEvery(actions.loadPriorityListDetails, _sagaPrioritListDetails);
}

export function* sagaLowPriorityListDetails() {
	yield takeEvery(actions.loadLowPriorityListDetails, _sagaLowPriorityListDetails);
}



