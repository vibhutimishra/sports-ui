import { 
  FETCH_USER_REQUEST, 
  FETCH_USER_SUCCESS, 
  FETCH_USER_FAILURE,
  CREATE_USER_REQUEST, 
  CREATE_USER_REQUEST_SUCCESS,
  CREATE_USER_REQUEST_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  FETCH_REGISTERED_EVENT,
  FETCH_REGISTERED_EVENT_SUCCESS,
  REGISTER_EVENT,
  REGISTER_EVENT_SUCCESS,
  UNREGISTER_EVENT,
  UNREGISTER_EVENT_SUCCESS,
  UPDATE_MESSAGE,
  FETCH_LOGOUT_REQUEST,

} from '../actionTypes';

export const fetchUserRequest = (credentials) => ({
  type: FETCH_USER_REQUEST,
  payload: credentials,
});

export const updateMessage = (message) => ({
  type: UPDATE_MESSAGE,
  payload: message
})

export const fetchCreateUserRequest = (credentials) => ({
  type: CREATE_USER_REQUEST,
  payload: credentials,
});

export const fetchCreateUserSuccess = (credentials) => ({
  type: CREATE_USER_REQUEST_SUCCESS,
  payload: credentials,
});

export const fetchCreateUserFailure = (credentials) => ({
  type: CREATE_USER_REQUEST_FAILURE,
  payload: credentials,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchEventsRequest = () => ({
  type: FETCH_EVENTS_REQUEST,
});

export const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: events,
});

export const fetchEventsFailure = (error) => ({
  type: FETCH_EVENTS_FAILURE,
  payload: error,
});

export const fetchRegisteredEvent = (user) => ({
  type: FETCH_REGISTERED_EVENT,
  payload: user,
});

export const fetchRegisteredEventSuccess = (user) => ({
  type: FETCH_REGISTERED_EVENT_SUCCESS,
  payload: user,
});

export const registerEvent = (credentials) => ({
  type: REGISTER_EVENT,
  payload: credentials,
});

export const registerEventSuccess = (credentials) => ({
  type: REGISTER_EVENT_SUCCESS,
});

export const unregisterEvent = (credentials) => ({
  type: UNREGISTER_EVENT,
  payload: credentials,
});

export const unregisterEventSuccess = (credentials) => ({
  type: UNREGISTER_EVENT_SUCCESS,
  payload: credentials,
});

export const fetchLogoutRequest = (user) => ({
  type: FETCH_LOGOUT_REQUEST,
  payload: user,
});





