import React, { useState, useEffect } from "react";
import { useBeforeInstallPrompt } from "../../utils/useBeforeInstallPrompt";

import { isMobile, getStoredProps, setLocalStorage } from "../../utils";

import "./index.scss";

function AddToHomeScreen() {
  const [prompt, promptToInstall] = useBeforeInstallPrompt();
  const [isVisible, setVisibleState] = useState(
    getStoredProps("appConfig", "showAddToHomeScreen")
  );

  useEffect(() => {
    if (prompt && isMobile) {
      getStoredProps("appConfig", "showAddToHomeScreen") === null &&
        setVisibleState(true);
    }
  }, [prompt]);

  return (
    <>
      {isVisible && (
        <div className="addToHomeScreen">
          <p></p>
          <button className="addToHomeScreen_add" onClick={promptToInstall}>
            Add MahaanExpress to homescreen
          </button>
          <button
            className="addToHomeScreen_close"
            onClick={() => {
              setVisibleState(false);
              setLocalStorage("appConfig", "showAddToHomeScreen", false);
            }}
          >
            X
          </button>
        </div>
      )}
    </>
  );
}

export default AddToHomeScreen;
