import React from "react";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { connect } from "react-redux";
import { likeMention, unlikeMention } from "../../redux/actions/dataActions";

const LikeButton = ({ user, mentionId, likeMention, unlikeMention }) => {
  const likedMention = () => {
    if (user.likes && user.likes.find(like => like.mentionId === mentionId))
      return true;
    else return false;
  };
  const likeMentionfxn = () => {
    likeMention(mentionId);
  };
  const unlikeMentionfxn = () => {
    unlikeMention(mentionId);
  };
  const likeButton = !user.authenticated ? (
    <MyButton tip="like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedMention() ? (
    <MyButton tip="Undo like" onClick={unlikeMentionfxn}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeMentionfxn}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeMention,
  unlikeMention
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
