import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { postMention, clearErrors } from "../../redux/actions/dataActions";
import withStyles from "@material-ui/core/styles/withStyles";

// Material UI stuff
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyButton from "../../util/MyButton";

const init = {
  body: "",
  errors: {},
  open: false
};

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 12
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    left: "91%",
    top: "6%",
    position: "absolute"
  }
});

const PostMention = ({
  postMention,
  clearErrors,
  UI: { loading, errors },
  classes
}) => {
  const [postState, setPostState] = useState(init);
  const handleOpen = () => {
    setPostState({ ...postState, open: true });
  };
  const handleClose = () => {
    clearErrors();
    setPostState({ ...postState, open: false, errors: {} });
  };
  const handleChange = e => {
    setPostState({ ...postState, [e.target.name]: [e.target.value] });
  };
  const handleSubmit = e => {
    e.preventDefault();
    postMention({ body: postState.body[0] });
  };
  useEffect(() => {
    if (errors) {
      setPostState({ ...postState, errors: errors });
    }
    if (!errors && !loading) {
      setPostState({ ...postState, body: "", open: false, errors: {} });
    }
  }, [errors, loading]);
  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post a mention">
        <AddIcon />
      </MyButton>
      <Dialog
        open={postState.open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post new Mention</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="MENTION!!"
              multiline
              rows="3"
              placeholder="Leave a mention"
              error={postState.errors.body ? true : false}
              helperText={postState.errors.body}
              className={classes.TextField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postMention, clearErrors })(
  withStyles(styles)(PostMention)
);
