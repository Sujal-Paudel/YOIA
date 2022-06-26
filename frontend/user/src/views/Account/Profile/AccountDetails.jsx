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
import { camelToPascalCase, processFlatObject } from "../../../utils";

function AccountDetails() {
  const { userDetails } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [request, setRequest] = useState({});

  React.useEffect(() => {
    setRequest({
      fullName: userDetails.fullName,
      email: userDetails.email,
      phone: userDetails.phone,
      businessName: userDetails.businessName,
    });
  }, [userDetails]);

  const handleClick = {
    update: () => {
      console.log(request);
      const req = processFlatObject(request);
      fetchy(`/api/v1/users/details`, "PATCH", req).then(
        ({ success, data }) => {
          if (success) {
            dispatch({
              type: "SET_SNACKBAR",
              payload: {
                type: "success",
                message: `Your details has been updated Successfully`,
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
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {Object.keys(request).map((field) => (
              <Grid item md={6} xs={12} key={field}>
                <TextField
                  fullWidth
                  label={camelToPascalCase(field)}
                  margin="dense"
                  required
                  variant="outlined"
                  value={request[field] || ""}
                  onChange={(e) => {
                    setRequest({
                      ...request,
                      [field]: e.currentTarget.value,
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
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default AccountDetails;
