import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Initialize from "./components/utils/Initialize";
import SocketIO from "./components/utils/SocketIO";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Snackbar from "./components/Snackbar";
import Login from "./views/Login";

import styles from "./App.styles";

import routes from "./routes.js";

const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogged, snackbar } = useSelector((state) => state);

  Initialize();
  SocketIO();

  const [open, setOpen] = React.useState(
    window.innerWidth > 960 ? true : false
  );

  const handleActivities = {
    drawerOpen: () => setOpen(true),
    drawerClose: () => setOpen(false),
    closeSnackbar: (e, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch({ type: "RESET_SNACKBAR" });
    },
  };

  return (
    <div className={classes.root}>
      {isLogged ? (
        <>
          <NavBar handleDrawerOpen={handleActivities.drawerOpen} open={open} />
          <SideBar
            items={routes}
            handleDrawerClose={handleActivities.drawerClose}
            open={open}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {routes.map((route, key) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            <Snackbar
              {...snackbar}
              handleClose={handleActivities.closeSnackbar}
            />
          </main>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
