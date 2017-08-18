import React from "react";
import { delay } from "redux-saga";
import { call, put, takeEvery, takeLatest, all, take, race, select } from "redux-saga/effects";
import * as actionTypes from "../constants/constants.js"
import { getData, getFilteredData, updateData } from '../apis/api'
import * as actions from "../actions/actions"
import 'regenerator-runtime/runtime'

function* fetchData() {
  try {
    //yield put(actions.showLoading(true))
    var data = yield call(getData)
    // if data then succesds action
    console.log("data in saga", data)
    yield put(actions.getDataSuccess(data))

  } catch (error) {
    yield put(actions.getDataFailure(error.message))
  }
  finally {
    // yield put(actions.showLoading(false))
  }

}
function* fetchFilteredData(action) {
  try {
    //yield put(actions.showLoading(true))
    var data = yield call(getFilteredData, action.id)
    // if data then succesds action
    console.log("data in saga filtered", data)
    yield put(actions.getFilteredDataSuccess(data))

  } catch (error) {
    yield put(actions.getFilteredDataFailure(error.message))
  }
  finally {
    // yield put(actions.showLoading(false))
  }
}

function* updateFilteredData(action){
  try {
    //yield put(actions.showLoading(true))
    var res = yield call(updateData, action.id,action.updatedObj)
    // if data then succesds action
    console.log("data in saga filtered", res.data)
    yield put(actions.updateDataSuccess(res.data))

  } catch (error) {
    yield put(actions.updatDataFailure(error.message))
  }
  finally {
    // yield put(actions.showLoading(false))
  }
}
//backgroundTask
function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action from saga', action)
    console.log('state after saga', state)
  }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('*')
    yield race({
      task: call(watchAndLog),
      cancel: take('CANCEL_TASK')
    })
  }
}
function* watchFetchAsync() {
  console.log("in wathc")
  yield takeEvery(actionTypes.GET_DATA_REQUEST, fetchData)
  yield takeEvery(actionTypes.GET_FILTERDDATA_REQUEST, fetchFilteredData)
  yield takeEvery(actionTypes.UPDATE_DATA_REQUEST,updateFilteredData)
}


export default function* rootSaga() {
  yield all([watchFetchAsync(), watchStartBackgroundTask()])
}