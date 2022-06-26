import React from "react";

import AddOrder from "./AddOrder";
import ViewOrders from "./ViewOrders";
import { Divider } from "@material-ui/core";

function Orders() {
  return (
    <>
      <div className="App_content_buttons">
        <AddOrder />
      </div>
      <Divider />
      <ViewOrders />
    </>
  );
}

export default Orders;
