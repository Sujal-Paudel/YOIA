import React from "react";

import AddItem from "./AddItem";
import ViewItems from "./ViewItems";
import { Divider } from "@material-ui/core";

function Items() {
  return (
    <>
      <div className="App_content_buttons">
        <AddItem />
      </div>
      <Divider />
      <ViewItems />
    </>
  );
}

export default Items;
