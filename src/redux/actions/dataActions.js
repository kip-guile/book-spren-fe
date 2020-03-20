import {
  SET_MENTIONS,
  LOADING_DATA,
  LIKE_MENTION,
  UNLIKE_MENTION,
  DELETE_MENTION
} from "../types";
import axios from "axios";

export const getMentions = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/mentions")
    .then(res => {
      dispatch({
        type: SET_MENTIONS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_MENTIONS,
        payload: []
      });
    });
};

export const likeMention = mentionId => dispatch => {
  axios
    .get(`/mention/${mentionId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_MENTION,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const unlikeMention = mentionId => dispatch => {
  axios
    .get(`/mention/${mentionId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_MENTION,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const deleteMention = mentionId => dispatch => {
  axios
    .delete(`/scream/${mentionId}`)
    .then(() => {
      dispatch({ type: DELETE_MENTION });
    })
    .catch(err => console.log(err));
};
