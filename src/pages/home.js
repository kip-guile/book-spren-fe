import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Mention from "../components/Mention";

const Home = () => {
  const [mentions, setMentions] = useState([]);
  useEffect(() => {
    axios
      .get("/mentions")
      .then(res => {
        console.log(res.data);
        setMentions(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  let recentMentionsMarkup = mentions ? (
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
          <p>Profile...</p>
        </Grid>
      </Grid>
    </div>
  );
};

// Content... small screens have a width  of 8 and really small screens have a width of 12
// Profile... small screens have a width  of 8 and really small screens have a width of 12

export default Home;
