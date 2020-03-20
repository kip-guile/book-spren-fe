import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import Mention from "../components/Mention";
import Profile from "../components/Profile";
import { getMentions } from "../redux/actions/dataActions";

const Home = ({ getMentions, data }) => {
  const { mentions, loading } = data;
  // const [mentions, setMentions] = useState([]);
  useEffect(() => {
    getMentions();
  }, [getMentions]);
  let recentMentionsMarkup = !loading ? (
    mentions.map(mention => (
      <Mention key={mention.mentionId} mention={mention} />
    ))
  ) : (
    <p>Loading...</p>
  );
  return (
    <div>
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentMentionsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </div>
  );
};

// Content... small screens have a width  of 8 and really small screens have a width of 12
// Profile... small screens have a width  of 8 and really small screens have a width of 12

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getMentions })(Home);
