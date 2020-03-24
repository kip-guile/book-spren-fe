import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Material UI stuff
import { Dialog, DialogContent, Grid, Typography } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyButton from "../../util/MyButton";
import { getMention, clearErrors } from "../../redux/actions/dataActions";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = theme => ({
  ...theme.spreadThis,
  invisibleSeperator: {
    border: "none",
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    width: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  expandButton: {
    position: "absolute"
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  }
});

const MentionDialog = ({
  getMention,
  mentionId,
  username,
  mention,
  UI,
  classes,
  clearErrors,
  openDialog
}) => {
  const [open, setOpen] = useState(false);
  const [paths, setPaths] = useState({ oldPath: "", newPath: "" });

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${username}/mention/${mentionId}`;
    if (oldPath === newPath) oldPath = `/users/${username}`;
    window.history.pushState(null, null, newPath);
    setOpen(true);
    setPaths({ oldPath, newPath });
    getMention(mentionId);
  };
  const handleClose = () => {
    window.history.pushState(null, null, paths.oldPath);
    setOpen(false);
    clearErrors();
  };
  const dialogMarkup = UI.loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img
          src={mention.userImage}
          alt="Profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${username}`}
        >
          @{username}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(mention.createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body1">{mention.body}</Typography>
        <LikeButton mentionId={mentionId} />
        <span>{mention.likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{mention.commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeperator} />
      <CommentForm mentionId={mentionId} />
      <Comments comments={mention.comments} />
    </Grid>
  );
  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand Mention"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  mention: state.data.mention,
  UI: state.UI
});

const mapActionsToProps = {
  getMention,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MentionDialog));
