import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserSuccess, fetchUserFailure, fetchEventsSuccess, fetchEventsFailure, fetchRegisteredEventSuccess, registerEventSuccess, unregisterEventSuccess, fetchCreateUserFailure,fetchRegisteredEvent, fetchCreateUserSuccess } from '../actions/sportsActions';
import { fetchUserApi, createUserApi, fetchEventsApi, fetchRegisteredEventsApi, registerEventApi, unregisterEventApi } from '../../api/userApi';
import { act } from 'react';


function* fetchUser(action) {
  try {
    const response = yield call(fetchUserApi, action.payload);
    yield put(fetchUserSuccess(action.payload));
  } catch (error) {
    yield put(fetchUserFailure(error.response.data.error));
  }
}

function* createUser(action) {
  try {
    const response = yield call(createUserApi, action.payload);
    yield put(fetchCreateUserSuccess(action.payload));
  } catch (error) {
    yield put(fetchCreateUserFailure(error.response.data.error));
  }
}


function* fetchEvents() {
  try {
    const response = yield call(fetchEventsApi);
    yield put(fetchEventsSuccess(response));
  } catch (error) {
    yield put(fetchEventsFailure(error.message));
  }
}

function* fetchRegistered(action) {
  try {
    const response = yield call(fetchRegisteredEventsApi, action.payload);
    yield put(fetchRegisteredEventSuccess(response));
  } catch (error) {
    yield put(fetchEventsFailure(error.message));
  }
}

function* registerEvent(action) {
  try {
    const response = yield call(registerEventApi, action.payload);
    yield put(registerEventSuccess(response.message));
    yield put(fetchRegisteredEvent({ userId: action.payload.userId }));
  } catch (error) {
    yield put(fetchEventsFailure(error.response.data.error));
  }
}

function* unregisterEvent(action) {
  try {
    const response = yield call(unregisterEventApi, action.payload);
    yield put(unregisterEventSuccess(response.message));
    yield put(fetchRegisteredEvent({ userId: action.payload.userId }));
  } catch (error) {
    yield put(fetchEventsFailure(error.response.data.error));
  }
}



export default function* userSaga() {
  yield takeLatest('FETCH_USER_REQUEST', fetchUser);
  yield takeLatest('CREATE_USER_REQUEST', createUser);
  yield takeLatest('FETCH_EVENTS_REQUEST', fetchEvents);
  yield takeLatest('FETCH_REGISTERED_EVENT', fetchRegistered);
  yield takeLatest('REGISTER_EVENT', registerEvent);
  yield takeLatest('UNREGISTER_EVENT', unregisterEvent);
}

