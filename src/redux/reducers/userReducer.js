import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_MENTION,
  UNLIKE_MENTION
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_MENTION:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            mentionId: action.payload.mentionId
          }
        ]
      };
    case UNLIKE_MENTION:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.mentionId !== action.payload.mentionId
        )
      };
    default:
      return state;
  }
}
