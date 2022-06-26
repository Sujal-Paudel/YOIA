import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import AccountProfile from "./AccountProfile";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   padding: theme.spacing(4),
  // },
}));

const Profile = () => {
  const classes = useStyles();
  const [viewPanel, setViewPanel] = useState("AccountDetails");

  return (
    <Grid container spacing={4}>
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <AccountProfile viewPanel={viewPanel} setViewPanel={setViewPanel} />
      </Grid>
      {viewPanel === "AccountDetails" && (
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails />
        </Grid>
      )}
      {viewPanel === "ChangePassword" && (
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <ChangePassword />
        </Grid>
      )}
    </Grid>
  );
};

export default Profile;
