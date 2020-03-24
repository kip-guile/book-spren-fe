import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";
import { deleteMention } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    left: "90%",
    top: "10%",
    position: "absolute"
  }
};

const DeleteMention = ({ deleteMention, classes, mentionId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteMentionFxn = () => {
    deleteMention(mentionId);
    setOpen(false);
  };
  return (
    <Fragment>
      <MyButton
        tip="Delete Mention"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteMentionFxn} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { deleteMention })(
  withStyles(styles)(DeleteMention)
);
