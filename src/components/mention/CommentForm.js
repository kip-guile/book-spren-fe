import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { submitComment } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
});

const init = {
  body: "",
  errors: {}
};

const CommentForm = ({
  UI: { errors, loading },
  authenticated,
  submitComment,
  classes,
  mentionId
}) => {
  const [formState, setFormState] = useState(init);
  useEffect(() => {
    if (errors) {
      setFormState({ ...formState, errors: errors });
    }
    if (!errors && !loading) {
      setFormState({ ...formState, body: "" });
    }
  }, [errors, loading]);
  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: [e.target.value] });
  };
  const handleSubmit = e => {
    e.preventDefault();
    submitComment(mentionId, { body: formState.body[0] });
  };
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on mention"
          error={formState.errors.comment ? true : false}
          helperText={formState.errors.comment}
          value={formState.body}
          onChange={handleChange}
          fullWidth
          className={classes.TextField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeperator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
