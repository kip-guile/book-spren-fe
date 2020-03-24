import {
  SET_MENTIONS,
  LOADING_DATA,
  LIKE_MENTION,
  UNLIKE_MENTION,
  DELETE_MENTION,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  POST_MENTION,
  STOP_LOADING_UI,
  SET_MENTION,
  SUBMIT_COMMENT
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

export const getMention = mentionId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/mention/${mentionId}`)
    .then(res => {
      dispatch({
        type: SET_MENTION,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

export const postMention = newMention => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/mention", newMention)
    .then(res => {
      dispatch({
        type: POST_MENTION,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      debugger;
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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

export const submitComment = (mentionId, commentData) => dispatch => {
  axios
    .post(`/mention/${mentionId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteMention = mentionId => dispatch => {
  axios
    .delete(`/mention/${mentionId}`)
    .then(() => {
      dispatch({ type: DELETE_MENTION });
    })
    .catch(err => console.log(err));
};

export const getUserData = username => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${username}`)
    .then(res => {
      dispatch({
        type: SET_MENTIONS,
        payload: res.data.mentions
      });
    })
    .catch(() => {
      dispatch({
        type: SET_ERRORS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
