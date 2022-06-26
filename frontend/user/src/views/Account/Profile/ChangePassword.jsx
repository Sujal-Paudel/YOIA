import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import fetchy from "../../../utils/fetchy";
import { processFlatObject } from "../../../utils";

function ChangePassword() {
  const dispatch = useDispatch();

  const inputFields = [
    {
      label: "Old Password",
      state: "oldPassword",
    },
    {
      label: "New Password",
      state: "newPassword",
    },
    {
      label: "Confirm Password",
      state: "confirmNewPassword",
    },
  ];

  const [request, setRequest] = useState({});

  const handleClick = {
    update: () => {
      console.log(request);
      const req = processFlatObject(request);
      fetchy(`/api/v1/users/password`, "PATCH", req).then(
        ({ success, data }) => {
          if (success) {
            dispatch({
              type: "SET_SNACKBAR",
              payload: {
                type: "success",
                message: `Your password has been change Successfully`,
              },
            });
          }
        }
      );
    },
  };

  return (
    <Card>
      <form autoComplete="off" noValidate>
        <CardHeader
          subheader="The information can be edited"
          title="Change Password"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {inputFields.map((field) => (
              <Grid item md={6} xs={12} key={field.label}>
                <TextField
                  fullWidth
                  label={field.label}
                  margin="dense"
                  name={field.label}
                  required
                  variant="outlined"
                  defaultValue={field.defaultValue}
                  onChange={(e) => {
                    setRequest({
                      ...request,
                      [field.state]: e.currentTarget.value,
                    });
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClick.update}
          >
            Change Password
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default ChangePassword;
