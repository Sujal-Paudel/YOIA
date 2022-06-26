import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import CustomModal from "../../components/CustomModal";

import fetchy from "../../utils/fetchy";
import { camelToPascalCase } from "../../utils";

function AddLedger() {
  const dispatch = useDispatch();

  const init = {
    date: moment().format("YYYY/MM/DD"),
    saleAmount: "",
    withdrawAmount: "",
    loanAmount: "",
    profitPercent: 10,
    profitAmount: "",
    totalAmount: "",
  };

  // const itemLabels = Object.keys(init).map((e) => ({
  //   name: e,
  //   pascal: camelToPascalCase(e),
  // }));

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState(init);

  useEffect(() => {
    const totalAmount =
      inputData.saleAmount - +inputData.withdrawAmount - +inputData.loanAmount;

    setInputData({
      ...inputData,
      totalAmount,
      profitAmount:
        ((inputData.saleAmount - +inputData.loanAmount) *
          inputData.profitPercent) /
        100,
    });
  }, [
    inputData.saleAmount,
    inputData.withdrawAmount,
    inputData.loanAmount,
    inputData.profitPercent,
  ]);

  const handleClick = {
    toggleModal: () => {
      setOpen(!open);
    },
    addLedger: () => {
      const req = inputData;
      fetchy(`/api/v1/accounting/ledger`, "PUT", req).then(
        ({ success, data }) => {
          console.log(data);
          if (success) {
            dispatch({
              type: "SET_SNACKBAR",
              payload: {
                type: "success",
                message: `New ledger entry has been created Successfully`,
              },
            });
            dispatch({
              type: "UPDATE_LEDGER_DATA",
              payload: data,
            });
            handleClick.toggleModal();
            setInputData(init);
          } else {
            dispatch({
              type: "SET_SNACKBAR",
              payload: {
                type: "error",
                message: `Unsuccessful Attempt. Please Try again. If the problem persist please contact the Mahaan Express team`,
              },
            });
          }
        }
      );
    },
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick.toggleModal}>
        Add New Ledger
      </Button>
      <CustomModal
        toggleModal={handleClick.toggleModal}
        open={open}
        title="Add Ledger"
        btnText="Add Ledger"
        handleSubmit={handleClick.addLedger}
      >
        <form noValidate autoComplete="off">
          {Object.keys(init).map((one, index) => (
            <Grid container spacing={2} key={index} justify="center">
              <Grid item xs={12} sm={3}>
                <Typography
                  variant="subtitle1"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {camelToPascalCase(one)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Input
                  placeholder={one}
                  value={inputData[one]}
                  onChange={(e) => {
                    setInputData({
                      ...inputData,
                      [one]: e.currentTarget.value,
                    });
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            // <input
            //   placeholder={one}
            //   defaultValue={init[one]}
            //   onChange={(e) => {
            //     setInputData({ ...inputData, [one]: e.currentTarget.value });
            //   }}
            // />
          ))}
        </form>
      </CustomModal>
    </div>
  );
}

export default AddLedger;
