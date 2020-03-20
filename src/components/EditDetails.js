import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
import withStyles from "@material-ui/core/styles/withStyles";

// Material UI stuff
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import MyButton from "../util/MyButton";

const init = {
  bio: "",
  website: "",
  location: "",
  open: false
};

const styles = theme => ({
  ...theme.spreadThis,
  button: {
    float: "right"
  }
});

const EditDetails = ({ editUserDetails, classes, credentials }) => {
  const [profileState, setProfileState] = useState(init);
  const mapUserDetailsToState = cred => {
    setProfileState({
      ...profileState,
      bio: cred.bio ? cred.bio : "",
      website: cred.website ? cred.website : "",
      location: cred.location ? cred.location : ""
    });
  };
  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);
  const handleOpen = () => {
    setProfileState({
      ...profileState,
      open: true
    });
    console.log(profileState);
    // mapUserDetailsToState(credentials);
  };
  const handleClose = () => {
    setProfileState({
      ...profileState,
      open: false
    });
  };
  const handleChange = e => {
    setProfileState({ ...profileState, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    const userDetails = {
      bio: profileState.bio,
      website: profileState.website,
      location: profileState.location
    };
    editUserDetails(userDetails);
    handleClose();
  };
  return (
    <Fragment>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog
        open={profileState.open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="short bio"
              className={classes.textField}
              value={profileState.bio}
              onChange={handleChange}
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="personal website"
              className={classes.textField}
              value={profileState.website}
              onChange={handleChange}
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="where do you live"
              className={classes.textField}
              value={profileState.location}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});
export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
