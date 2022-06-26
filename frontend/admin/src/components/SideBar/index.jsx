import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Hidden,
  Icon,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import style from "./index.styles";

const useStyles = makeStyles(style);

function SideBar(props) {
  const { open, handleDrawerClose, items } = props;
  const { pathname } = useLocation();

  const classes = useStyles();

  const main = (
    <div>
      <div className={classes.toolbar}>
        <ListItem button>
          <ListItemText primary="Mahaan Express" />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </ListItem>
      </div>
      <Divider />
      <List>
        {items
          .filter((e) => e.showInSideBar)
          .map((prop, key) => {
            if (!prop.layout && prop.name !== "Login") {
              return (
                <NavLink
                  key={key}
                  to={prop.path}
                  className={classes.listLink}
                  exact
                  activeClassName={classes.active}
                >
                  <ListItem button selected={pathname === prop.path}>
                    <ListItemIcon>
                      {key % 2 === 0 ? <MoveToInboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={prop.name} />
                  </ListItem>
                </NavLink>
              );
            }
            return null;
          })}
      </List>
    </div>
  );
  return (
    <nav>
      <Hidden smUp implementation="css">
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
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
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {main}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default SideBar;
