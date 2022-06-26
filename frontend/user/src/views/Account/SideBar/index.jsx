import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import style from "./index.styles";

const useStyles = makeStyles(style);

function SideBar(props) {
  const { items, open, setOpen } = props;
  const { pathname } = useLocation();
  const classes = useStyles();

  const main = (
    <List className={classes.list}>
      {items
        .filter((e) => e.showInSideBar)
        .map((prop, key) => {
          if (!prop.layout && prop.name !== "Login") {
            return (
              <NavLink
                key={key}
                to={prop.path}
                onClick={() => {
                  window.innerWidth < 960 && setOpen(false);
                }}
                className={classes.listLink}
                exact
                activeClassName={classes.active}
              >
                <ListItem
                  button
                  selected={pathname === prop.path}
                  classes={{ selected: classes.active }}
                >
                  <ListItemIcon>
                    <prop.icon />
                  </ListItemIcon>
                  <ListItemText primary={prop.name} />
                </ListItem>
              </NavLink>
            );
          }
          return null;
        })}
    </List>
  );

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.paperOverride, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {main}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.paperOverride, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {main}
        </Drawer>
      </Hidden>
    </>
  );
}

export default SideBar;
