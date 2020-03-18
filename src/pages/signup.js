import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/icon.png";
import axios from "axios";
import { Link } from "react-router-dom";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  confirmPassword: "",
  username: "",
  loading: false,
  errors: {}
};

const Signup = ({ classes, history }) => {
  const [formState, setFormState] = useState(init);
  const handleSubmit = e => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });
    const newUserData = {
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      email: formState.email,
      username: formState.username
    };
    axios
      .post("/signup", newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setFormState({ ...formState, loading: false });
        history.push("/");
      })
      .catch(err => {
        setFormState({
          ...formState,
          errors: err.response.data,
          loading: false
        });
      });
  };
  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="book" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={formState.errors.confirmPassword}
            error={formState.errors.confirmPassword ? true : false}
            value={formState.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="username"
            name="username"
            label="Username"
            className={classes.textField}
            helperText={formState.errors.username}
            error={formState.errors.username ? true : false}
            value={formState.username}
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
            disabled={formState.loading}
          >
            Signup
            {formState.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            have an account ? sign in <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(Signup);
