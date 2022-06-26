import Dashboard from "./views/Dashboard";
import Orders from "./views/Orders";
import Clients from "./views/Clients";
import Settings from "./views/Settings";
import Items from "./views/Items";
import Inventory from "./views/Inventory";
import Display from "./views/Display";
import OneOrder from "./views/Orders/OneOrder";
import SendSMS from "./views/SendSMS";

import store from "./reduxStore";
import AddOrder from "./views/Orders/AddOrder";

const routes = [
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    // component: Login,
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
    showInSideBar: true,
  },
  {
    path: "/display",
    name: "Display",
    component: Display,
    showInSideBar: true,
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory,
    showInSideBar: true,
  },
  {
    path: "/orders",
    name: "Orders",
    exact: true,
    component: Orders,
    showInSideBar: true,
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
    showInSideBar: true,
  },
  {
    path: "/sendSMS",
    name: "Send SMS",
    component: SendSMS,
    showInSideBar: true,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    showInSideBar: true,
  },
  {
    path: "/orders/:_id",
    name: "OneOrder",
    layout: "/orders",
    component: OneOrder,
  },
  {
    path: "/orders/add",
    layout: "/orders",
    component: AddOrder,
  },
];

export default routes;
