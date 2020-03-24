import {
  SET_MENTIONS,
  LIKE_MENTION,
  UNLIKE_MENTION,
  LOADING_DATA,
  DELETE_MENTION,
  POST_MENTION,
  SET_MENTION,
  SUBMIT_COMMENT
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
    case SET_MENTION:
      return {
        ...state,
        mention: action.payload
      };
    case LIKE_MENTION:
    case UNLIKE_MENTION:
      let index = state.mentions.findIndex(
        mention => mention.mentionId === action.payload.mentionId
      );
      state.mentions[index] = action.payload;
      if (state.mention.mentionId === action.payload.mentionId) {
        state.mention = action.payload;
      }
      return {
        ...state
      };
    case DELETE_MENTION:
      index = state.mentions.findIndex(
        mention => mention.mentionId === action.payload
      );
      state.mentions.splice(index, 1);
      return {
        ...state
      };
    case POST_MENTION:
      return {
        ...state,
        mentions: [action.payload, ...state.mentions]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        mention: {
          ...state.mention,
          comments: [action.payload, ...state.mention.comments]
        }
      };
    default:
      return state;
  }
}
