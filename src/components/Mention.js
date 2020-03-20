import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { connect } from "react-redux";
import { likeMention, unlikeMention } from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
import DeleteMention from "./DeleteMention";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

const Mention = ({
  classes,
  mention: {
    body,
    time,
    userImage,
    username,
    mentionId,
    likeCount,
    commentCount
  },
  likeMention,
  unlikeMention,
  user
}) => {
  console.log(user, username);
  dayjs.extend(relativeTime);
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
  const deleteButton =
    user.authenticated && username === user.credentials.username ? (
      <DeleteMention mentionId={mentionId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${username}`}
          color="primary"
        >
          {username}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(time).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeMention,
  unlikeMention
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Mention));
