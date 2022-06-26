import React from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import routes from "../../routes";

import "./index.scss";
import Style from "./index.styles";

const useStyles = makeStyles(Style);

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {routes
          .filter((e) => e.showInSideBar)
          .map((route, key) => (
            <DisplayCard
              key={route.path}
              title={route.name}
              path={route.path}
            />
          ))}
      </Grid>
    </div>
  );
}

function DisplayCard({ title, subTitle1, description, path }) {
  const history = useHistory();
  return (
    <Grid item xs={12} sm={6}>
      <div className="home_cards-each" onClick={() => history.push(path)}>
        <p className="home_cards-each_title">{title}</p>
        <p className="home_cards-each_subTitle">{subTitle1}</p>
        <p className="home_cards-each_description">{description}</p>
      </div>
    </Grid>
  );
}

export default Dashboard;
