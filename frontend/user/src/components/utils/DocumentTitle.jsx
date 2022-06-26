import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import routes from "../../routes";

function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const name = routes.find((e) => e.path === pathname)?.name;
    document.title = name ? `MahaanExpress | ${name}` : "MahaanExpress";
  }, [pathname]);
}

export default DocumentTitle;
