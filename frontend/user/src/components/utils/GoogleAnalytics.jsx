import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import ReactGA from "react-ga";

// if (process.env.REACT_APP_PRODUCTION === "true") {
//   ReactGA.initialize("UA-164780379-1");
//   ReactGA.pageview("/");
// }

function GoogleAnalytics() {
  return <></>;
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   if (process.env.REACT_APP_PRODUCTION === "true") {
  //     ReactGA.set({ page: pathname });
  //     ReactGA.pageview(pathname);
  //   }
  // }, [pathname]);
}

export default GoogleAnalytics;
