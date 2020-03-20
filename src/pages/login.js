import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto",
    height: "50px",
    width: "50px"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: { position: "absolute" }
};

const init = {
  email: "",
  password: "",
  errors: {}
};

const Login = ({
  classes,
  history,
  loginUser,
  user,
  UI: { loading, errors }
}) => {
  const [formState, setFormState] = useState(init);
  const handleSubmit = e => {
    e.preventDefault();
    const userData = {
      password: formState.password,
      email: formState.email
    };
    loginUser(userData, history);
  };
  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (errors) {
      setFormState({ ...formState, errors: errors });
    }
  }, [errors, formState]);
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="book" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={formState.errors.email}
            error={formState.errors.email ? true : false}
            value={formState.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={formState.errors.password}
            error={formState.errors.password ? true : false}
            value={formState.password}
            onChange={handleChange}
            fullWidth
          />
          {formState.errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {formState.errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            dont have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
