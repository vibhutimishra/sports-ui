import { 
  FETCH_USER_REQUEST, 
  FETCH_USER_SUCCESS, 
  FETCH_USER_FAILURE,
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
  FETCH_LOGOUT_REQUEST,
  UPDATE_MESSAGE,
} from '../actionTypes';

const initialState = {
  userId: "",
  newUserID: "",
  events: [],
  registered_events: [],
  message: "",
  status: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state };
    case FETCH_USER_SUCCESS:
      return { ...state,  userId: action.payload.userId, status: true};
    case FETCH_USER_FAILURE:
      return { ...state, message: action.payload, status: false};
    case CREATE_USER_REQUEST_SUCCESS:
      return { ...state, newUserID: action.payload.userId, status: true}
    case CREATE_USER_REQUEST_FAILURE:
      return { ...state, message: action.payload, status: false};
    case FETCH_EVENTS_REQUEST:
        return { ...state };
    case FETCH_EVENTS_SUCCESS:
      return { ...state, events: action.payload };
    case FETCH_EVENTS_FAILURE:
      return { ...state, message: action.payload, status: false };
    case FETCH_REGISTERED_EVENT:
        return { ...state};
    case FETCH_REGISTERED_EVENT_SUCCESS:
        return { ...state, registered_events: action.payload};
    case REGISTER_EVENT:
        return { ...state };
    case REGISTER_EVENT_SUCCESS:
        return { ...state, message: action.payload, status:true};
    case UNREGISTER_EVENT:
        return { ...state };
    case UNREGISTER_EVENT_SUCCESS:
        return { ...state, message: action.payload, status:true};
    case UPDATE_MESSAGE:
        return { ...state, message: action.payload};
    case FETCH_LOGOUT_REQUEST:
      return { ...initialState };
    default:
      return state;
  }
};

export default userReducer;
