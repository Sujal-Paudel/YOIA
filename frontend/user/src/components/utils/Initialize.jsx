import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { fetchUserProfile, fetchItemsData } from "../../actions";

import fetchy from "../../utils/fetchy";

function Initialize() {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchItemsData({ type: "POPULATE_ITEMS", data: { index: 0 } }));
    dispatch({ type: "POPULATE_CART" });
  }, []);

  useEffect(() => {
    if (userDetails?.flags?.forceLogout) {
      console.log("logout");
      fetchy(`/api/v1/users/logout`, "GET");
    }
  }, [userDetails]);
}

export default Initialize;
