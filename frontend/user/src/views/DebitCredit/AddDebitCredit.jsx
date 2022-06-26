import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

import CustomModal from "../../components/CustomModal";

import fetchy from "../../utils/fetchy";

import { fetchDebitCreditData } from "../../actions";

function AddDebitCredit(props) {
  const { accountType, partyName } = props;

  const dispatch = useDispatch();

  const init = [
    {
      name: "Date",
      visible: true,
      state: "date",
    },
    {
      name: "Party Name",
      visible: !partyName,
      state: "partyName",
    },
    { name: "Total", visible: true, state: "total" },
    { name: "Notes", visible: true, state: "notes" },
  ];

  const itemsTemplate = {
    item: "",
    qty: 0,
    rate: 0,
  };

  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    date: moment().format("YYYY/MM/DD"),
    partyName,
    total: 0,
    notes: "",
  });
  const [items, setItems] = useState([itemsTemplate]);

  useEffect(() => {
    setInputData({
      ...inputData,
      total: items.reduce((a, e) => a + e.rate * e.qty, 0),
    });
  }, [items]);

  const handleClick = {
    toggleModal: () => {
      setOpen(!open);
    },
    addDebitCredit: () => {
      const req = { ...inputData, accountType, items };
      fetchy(`/api/v1/accounting/debitcredit`, "PUT", req).then(
        ({ success, data }) => {
          console.log(data);
          if (success) {
            dispatch({
              type: "SET_SNACKBAR",
              payload: {
                type: "success",
                message: `New ${accountType} details of ${inputData.partyName} has been created Successfully`,
              },
            });
            dispatch({
              type: `UPDATE_${accountType.toUpperCase()}_DATA`,
              payload: data,
            });
            handleClick.toggleModal();
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

  const handleChange = {
    item: (e, i, name) => {
      const temp = [...items];
      temp[i][name] = e.currentTarget.value;
      setItems(temp);
      setFocus(false);
    },
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick.toggleModal}>
        Add New {accountType} {partyName && `for ${partyName}`}
      </Button>
      <CustomModal
        toggleModal={handleClick.toggleModal}
        open={open}
        title={`Add ${accountType} ${partyName ? "for " + partyName : ""}`}
        btnText={`Add ${accountType} ${partyName ? "for " + partyName : ""}`}
        handleSubmit={handleClick.addDebitCredit}
      >
        <form noValidate autoComplete="off">
          {init.map((one, index) => (
            <React.Fragment key={index}>
              {one.visible && (
                <Grid container spacing={2} key={index} justify="center">
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="subtitle1"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {one.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Input
                      placeholder={one.name}
                      value={inputData[one.state]}
                      onChange={(e) => {
                        setInputData({
                          ...inputData,
                          [one.state]: e.currentTarget.value,
                        });
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}
            </React.Fragment>
          ))}
          <Grid container spacing={2} justify="center">
            <Grid item xs={12} sm={3}>
              <Typography
                variant="subtitle1"
                style={{ display: "flex", alignItems: "center" }}
              >
                Items
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
          </Grid>

          <Grid container spacing={2}>
            {items.map((data, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Input
                  placeholder="Item Name"
                  onChange={(e) => handleChange.item(e, i, "item")}
                  ref={(e) => focus && e && e.focus()}
                  fullWidth
                />
                <Input
                  placeholder="Quantity"
                  onChange={(e) => handleChange.item(e, i, "qty")}
                  fullWidth
                />
                <Input
                  placeholder="Rate"
                  onChange={(e) => handleChange.item(e, i, "rate")}
                  fullWidth
                />
              </Grid>
            ))}
            <Grid item xs={12} sm={4}>
              <IconButton
                aria-label="Add Items"
                style={{
                  position: "relative",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setItems([...items, itemsTemplate]);
                  setFocus(true);
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </CustomModal>
    </div>
  );
}

export default AddDebitCredit;
