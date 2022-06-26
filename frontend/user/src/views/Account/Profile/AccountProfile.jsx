import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";

import fetchy from "../../../utils/fetchy";

const AccountProfile = ({ viewPanel, setViewPanel }) => {
  const { userDetails } = useSelector((state) => state);

  const handleClick = {
    logout: () => {
      fetchy(`/api/v1/users/logout`, "GET");
    },
    showPasswordPanel: () => {
      setViewPanel("ChangePassword");
    },
    showAccountDetails: () => {
      setViewPanel("AccountDetails");
    },
  };

  return (
    <Card ariant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {userDetails.fullName}
        </Typography>
        <Typography variant="subtitle1">
          Username: {userDetails.username}
        </Typography>
        <Typography variant="body2">
          Business: {userDetails.businessName || "------"}
        </Typography>
        <Typography variant="body2" component="p">
          Email: {userDetails.email || "------"}
        </Typography>
        <Typography variant="body2" component="p">
          Contact: {userDetails.phone}
        </Typography>
        <Typography variant="body2" component="p">
          Address: {userDetails.address}
        </Typography>
      </CardContent>
      <CardActions>
        {viewPanel === "ChangePassword" && (
          <Button size="small" onClick={handleClick.showAccountDetails}>
            View Profile
          </Button>
        )}
        {viewPanel === "AccountDetails" && (
          <Button size="small" onClick={handleClick.showPasswordPanel}>
            Change Password
          </Button>
        )}
        <Button size="small" onClick={handleClick.logout}>
          Logout
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
