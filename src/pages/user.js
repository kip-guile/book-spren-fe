import React, { useEffect, useState } from "react";
import axios from "axios";
import Mention from "../components/mention/Mention";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/profile/StaticProfile";
import MentionSkeleton from "../util/MentionSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

const User = ({ data, getUserData, match }) => {
  const [profile, setProfile] = useState(null);
  const [mentionIdParam, setMentionIdParam] = useState(null);
  useEffect(() => {
    const username = match.params.username;
    const mentionId = match.params.mentionId;
    if (mentionId) setMentionIdParam(mentionId);
    getUserData(username);
    axios
      .get(`/user/${username}`)
      .then(res => {
        setProfile(res.data.user);
      })
      .catch(err => console.log(err));
  }, [match.params.getUserData]);
  // const { mentions, loading } = data;
  const mentionsMarkup = data.loading ? (
    <MentionSkeleton />
  ) : data.mentions === null ? (
    <p>No mentions from this user</p>
  ) : !mentionIdParam ? (
    data.mentions.map(mention => (
      <Mention key={mention.mentionId} mention={mention} />
    ))
  ) : (
    data.mentions.map(mention => {
      if (mention.mentionId !== mentionIdParam)
        return <Mention key={mention.mentionId} mention={mention} />;
      else
        return <Mention key={mention.mentionId} mention={mention} openDialog />;
    })
  );
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {mentionsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
