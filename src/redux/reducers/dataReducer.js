import {
  SET_MENTIONS,
  LIKE_MENTION,
  UNLIKE_MENTION,
  LOADING_DATA,
  DELETE_MENTION
} from "../types";

const initialState = {
  mentions: [],
  mention: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_MENTIONS:
      return {
        ...state,
        mentions: action.payload,
        loading: false
      };
    case LIKE_MENTION:
    case UNLIKE_MENTION:
      let index = state.mentions.findIndex(
        mention => mention.mentionId === action.payload.mentionId
      );
      state.mentions[index] = action.payload;
      return {
        ...state
      };
    case DELETE_MENTION:
      index = state.mentions.findIndex(
        mention => mention.mentionId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state
      };
    default:
      return state;
  }
}
