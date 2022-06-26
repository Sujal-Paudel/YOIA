import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchItemsData,
  fetchOrdersData,
  fetchConfigData,
  fetchClientsData,
} from "../../actions";

function Initialize() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogged } = useSelector((state) => state);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchConfigData({ type: "POPULATE_CONFIG-DATA" }));
      dispatch(fetchItemsData({ type: "POPULATE_ITEMS", data: { index: 0 } }));
      dispatch(
        fetchClientsData({
          type: "POPULATE_CLIENTS",
          data: { index: 0, limit: 30 },
        })
      );
      dispatch(
        fetchOrdersData({
          type: "POPULATE_ORDERS",
          filter: {
            status: ["pending", "reviewed", "ready", "completed"],
            // from: 1569462641394,
            // to: 1569462768535,
            // username: "omkarstha"
          },
        })
      );
    } else {
      history.push("/login");
    }
  }, [isLogged]);
}

export default Initialize;
