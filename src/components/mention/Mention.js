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

import { connect } from "react-redux";
import MyButton from "../../util/MyButton";
import DeleteMention from "./DeleteMention";
import MentionDialog from "./MentionDialog";
import LikeButton from "./LikeButton";

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
  user,
  openDialog
}) => {
  dayjs.extend(relativeTime);

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
        <LikeButton mentionId={mentionId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <MentionDialog
          mentionId={mentionId}
          username={username}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Mention));
