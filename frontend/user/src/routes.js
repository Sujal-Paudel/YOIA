import Home from "./views/Home";
import Search from "./views/Search";
import Category from "./views/Category";
import ItemDisplay from "./views/ItemDisplay";
import Compare from "./views/Compare";
import LoginRegister from "./components/LoginRegister";
import Cart from "./views/Cart";
import Account, { Profile } from "./views/Account";
import ResetPassword from "./components/LoginRegister/ResetPassword";
import Orders from "./views/Orders";
import Ledger from "./views/Ledger";
import DebitCredit from "./views/DebitCredit";

import PersonIcon from "@material-ui/icons/Person";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AssignmentIcon from "@material-ui/icons/Assignment";
import OneParty from "./views/DebitCredit/OneParty";

const accountRoutes = [
  {
    path: "/account",
    name: "Profile",
    exact: true,
    component: Profile,
    showInSideBar: true,
    icon: PersonIcon,
  },
  {
    path: "/account/orders",
    name: "Orders",
    component: Orders,
    showInSideBar: true,
    icon: ShoppingBasketIcon,
  },
  {
    path: "/account/ledger",
    name: "Ledger",
    component: Ledger,
    showInSideBar: true,
    onlyPaidUser: true,
    icon: AssignmentIcon,
  },
  {
    path: "/account/debit",
    name: "Debit",
    exact: true,
    component: DebitCredit,
    showInSideBar: true,
    onlyPaidUser: true,
    icon: AssignmentIcon,
  },
  {
    path: "/account/credit",
    name: "Credit",
    exact: true,
    component: DebitCredit,
    showInSideBar: true,
    onlyPaidUser: true,
    icon: AssignmentIcon,
  },
  {
    path: "/account/debit/:partyName",
    name: "Debit Party",
    component: OneParty,
    showInSideBar: false,
    onlyPaidUser: true,
    icon: AssignmentIcon,
  },
  {
    path: "/account/credit/:partyName",
    name: "Credit Credit",
    component: OneParty,
    showInSideBar: false,
    onlyPaidUser: true,
    icon: AssignmentIcon,
  },
];

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/search/:query",
    name: "Search",
    component: Search,
  },
  {
    path: "/category/:query",
    name: "Category",
    component: Category,
  },
  {
    path: "/compare",
    name: "Compare",
    component: Compare,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginRegister,
  },
  {
    path: "/register",
    name: "Register",
    component: LoginRegister,
  },
  {
    path: "/forgot",
    name: "Forgot Password",
    component: LoginRegister,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    routes: accountRoutes,
  },
  {
    path: "/item/:_id",
    name: "Item",
    component: ItemDisplay,
  },
  {
    path: "/resetlink/:resetKey",
    name: "Reset Password",
    component: ResetPassword,
    showInSideBar: false,
  },
];

export default routes;
export { accountRoutes };
