import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

import CustomModal from "../../components/CustomModal";
import OrderForm from "./OrderForm";

// import { updateItems } from "../../actions";
import { camelToPascalCase } from "../../utils";

function AddOrder() {
  const dispatch = useDispatch();

  const init = {
    basic: {
      username: "",
      status: "",
      remarks: "",
      total: "",
      discount: "",
      extraCharge: "",
      grandTotal: "",
    },

    items: [{ itemCode: "", quantity: "" }],
    delivery: { condition: "", address: "", charge: "" },
    payment: {
      paid: false,
      method: "",
      detail: "",
    },
  };

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState(init.basic);
  const [delivery, setDelivery] = useState(init.delivery);
  const [payment, setPayment] = useState(init.payment);

  const handleClick = {
    toggleModal: () => {
      setOpen(!open);
    },
    addOrder: () => {
      const req = { ...inputData };
      const formData = new FormData();
      setInputData(init);

      setOpen(false);
      // const items = [];
      // setInputData({ ...inputData, items });
      // const req = { ...inputData, delivery, payment };
      // console.log(req);
      // dispatch(addOrder(req));
      // setInputData(init.singles);
      // setDelivery(init.delivery);
      // setPayment(init.payment);
      // const tagsArray = inputData.tags.split(" ");
      // const req = { ...inputData, tags: tagsArray };
      // const formData = new FormData();
      // // dispatch(updateItems({ type: "UPDATE_ITEMS", formData, req }));
      // setInputData(init);
      // setOpen(false);
    },
  };

  const handleChange = {
    basicInput: (e) => {
      const { name, value } = e.target;
      setInputData({ ...inputData, [name]: value });
    },
    delivery: (e) => {
      const { name, value } = e.target;
      setDelivery({ ...delivery, [name]: value });
      console.log(delivery);
    },
    payment: (e) => {
      const { name, value } = e.target;
      setPayment({ ...payment, [name]: value });
    },
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick.toggleModal}>
        Add New Order
      </Button>
      <CustomModal
        toggleModal={handleClick.toggleModal}
        open={open}
        title="Add New Order"
        handleSubmit={handleClick.addOrder}
      >
        <OrderForm
          itemLabels={Object.keys(init.basic).map((e) => ({
            name: e,
            pascal: camelToPascalCase(e),
          }))}
          handleChange={handleChange.basicInput}
          inputData={inputData}
        />

        <OrderForm
          itemLabels="delivery"
          singleLine
          handleChange={handleChange.delivery}
          inputData={delivery}
        />
        <OrderForm
          itemLabels="Payment"
          singleLine
          handleChange={handleChange.payment}
          inputData={payment}
        />
      </CustomModal>
    </div>
  );
}

export default AddOrder;
