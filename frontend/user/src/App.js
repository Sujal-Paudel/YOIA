import React, { useState } from "react";
import { Route } from "react-router-dom";
import {
  makeStyles,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

import Snackbar from "./components/Snackbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Initialize from "./components/utils/Initialize";
import DocumentTitle from "./components/utils/DocumentTitle";
import GoogleAnalytics from "./components/utils/GoogleAnalytics";
import PreLoader from "./components/utils/PreLoader";
import AddToHomeScreen from "./components/utils/AddToHomeScreen";

import routes, { accountRoutes } from "./routes.js";

import styles from "./App.styles";
import theme from "./styles/CustomTheme.style";
const useStyles = makeStyles(styles);
const responsiveTheme = responsiveFontSizes(theme);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLogged, snackbar, loader } = useSelector((state) => state);

  Initialize();
  DocumentTitle();
  GoogleAnalytics();

  const handleActivities = {
    closeSnackbar: (e, reason) => {
      if (reason === "clickaway") {
        return;
      }
      dispatch({ type: "RESET_SNACKBAR" });
    },
  };


  return (
    <>
      <AddToHomeScreen />
      <ThemeProvider theme={responsiveTheme}>
        <CssBaseline />

        <Header />
        <div className={classes.content}>
          {isLogged === null ? (
            <PreLoader />
          ) : (
            routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
          )}
        </div>
        <Snackbar {...snackbar} handleClose={handleActivities.closeSnackbar} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
