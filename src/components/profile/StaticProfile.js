import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { Link } from "react-router-dom";

const styles = theme => ({
  ...theme.spreadThis
});

const StaticProfile = ({
  profile: { username, createdAt, imageUrl, bio, website, location },
  classes
}) => {
  return (
    <Paper className={classes.paper}>
      <div
        className={classes.profile}
        style={{ textAlign: "center", position: "relative" }}
      >
        <div
          className="image-wrapper"
          style={{ textAlign: "center", position: "relative" }}
        >
          <img
            style={{
              width: 200,
              height: 200,
              objectFit: "cover",
              maxWidth: "100%",
              borderRadius: "50%"
            }}
            className="profile-image"
            src={imageUrl}
            alt="profile"
          />
        </div>
        <hr />
        <div style={{ textAlign: "center" }} className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${username}`}
            color="primary"
            variant="h5"
          >
            @{username}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(StaticProfile);
