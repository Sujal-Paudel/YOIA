import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Grid } from "@material-ui/core";

import CustomModal from "../../components/CustomModal";
import ClientForm from "./ClientForm";

import { addClient } from "../../actions";
import { camelToPascalCase } from "../../utils";

function AddClient() {
  const dispatch = useDispatch();

  const init = {
    fullName: "",
    phone: "",
    email: "",
    address: "",
  };

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState(init);
  const [sendSMS, setSendSMS] = useState(true);

  const handleClick = {
    toggleModal: () => {
      setOpen(!open);
    },
    addClient: () => {
      const req = { ...inputData, sendSMS };
      console.log(req);
      dispatch(
        addClient(req, () => {
          setInputData(init);
          setSendSMS(true);
          setOpen(false);
        })
      );
    },
  };

  const handleChange = {
    basicInput: (e) => {
      const { name, value } = e.currentTarget;
      setInputData({ ...inputData, [name]: value });
    },
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick.toggleModal}>
        Add New Client
      </Button>
      <CustomModal
        toggleModal={handleClick.toggleModal}
        open={open}
        title="Add New Client"
        handleSubmit={handleClick.addClient}
      >
        <ClientForm
          itemLabels={Object.keys(init).map((e) => ({
            name: e,
            pascal: camelToPascalCase(e),
          }))}
          handleChange={handleChange.basicInput}
          inputData={inputData}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <label>Send SMS</label>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Checkbox checked={sendSMS} onChange={() => setSendSMS(!sendSMS)} />
          </Grid>
        </Grid>
      </CustomModal>
    </div>
  );
}

export default AddClient;
