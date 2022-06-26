import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

import SideBar from "./SideBar";
import Profile from "./Profile";

import { accountRoutes } from "../../routes";
import { fetchLedgerData, fetchDebitCreditData } from "../../actions";

const useStyles = makeStyles((theme) => ({
  accountContent: {
    padding: theme.spacing(4),
    paddingTop: 0,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  sidebarTitle: {
    display: "flex",
    flexDirection: "row",
    background: "#eee",
    padding: "10px",
    cursor: "pointer",
  },
  sidebarText: {
    paddingLeft: "5px",
  },
  container: {
    display: "flex",
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      minHeight: 0,
    },
  },
  content: {
    width: "100%",
    marginTop: "15px",
  },
}));

const Account = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accountMatch = useRouteMatch("/account");
  const { isLogged, sidebar, userDetails } = useSelector((state) => state);
  const classes = useStyles({ open: sidebar });

  const [open, setOpen] = useState(window.innerWidth > 960);

  const defaultMonth = moment(new Date()).format("YYYY/MM");
        
  const filteredAccountRoutes = accountRoutes.filter(
    (e) => !e.onlyPaidUser || userDetails.paidUser
  );

  useEffect(() => {
    dispatch(fetchLedgerData({ month: defaultMonth }));
    dispatch(
      fetchDebitCreditData({
        month: defaultMonth,
        accountType: ["debit", "credit"],
      })
    );
    //**TODO:ohmmee** global route object to check if isLogged ALSO wait for isLogged value to store */
    if (!isLogged) history.push("/");
  }, []);

  return (
    <div className={classes.accountContent}>
      <div className={classes.sidebarTitle} onClick={() => setOpen(!open)}>
        <MenuIcon />
        <Typography variant="h5" className={classes.sidebarText}>
          Account
        </Typography>
      </div>
      <div className={classes.container}>
        {accountMatch && (
          <SideBar
            items={filteredAccountRoutes}
            open={open}
            setOpen={setOpen}
          />
        )}
        <div className={classes.content}>
          {filteredAccountRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
export { Profile };
