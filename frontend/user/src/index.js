import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import store from "./reduxStore";

import ScrollToTop from "./components/utils/ScrollToTop";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

if (process.env.REACT_APP_PRODUCTION === "true") {
  serviceWorker.register({
    onUpdate: (registration) => {
      // window.alert("update is installed");
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    },
  });
} else {
  serviceWorker.unregister();
}
