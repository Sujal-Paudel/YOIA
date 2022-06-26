import React from "react";

import fetchy from "../../utils/fetchy";

function Settings() {
  const handleClick = {
    logout: () => {
      fetchy("/api/v1/admin/logout");
    },
  };

  return (
    <div>
      <p>Version: {process.env.REACT_APP_VERSION}</p>
      <div className="_button_round" onClick={handleClick.logout}>
        Logout
      </div>
    </div>
  );
}

export default Settings;
