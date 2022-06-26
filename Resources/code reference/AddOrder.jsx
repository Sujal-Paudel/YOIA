import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import fetchy from "../../utils/fetchy";

import "./AddOrder.scss";

function AddOrder() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isInHouse } = useSelector((state) => state);

  const template = {
    clothesEntries: {
      type: "",
      detail: "",
      purpose: "wash",
    },
  };

  const [focus, setFocus] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [clothesEntries, setClothesEntries] = useState([
    template.clothesEntries,
  ]);

  const handleChange = {
    numOfClothes: (num) => {
      if (num > 50) {
        alert("Whoa!");
        return;
      }
      if (num < clothesEntries.length) {
        setClothesEntries(clothesEntries.slice(0, num));
      } else {
        for (let i = clothesEntries.length; i < num; i++) {
          clothesEntries.push({ ...template.clothesEntries });
        }
        setClothesEntries([...clothesEntries]);
        setFocus(true);
      }
    },
    type: (e, index) => {
      clothesEntries[index].type = e.currentTarget.value;
      setClothesEntries([...clothesEntries]);
    },
    detail: (e, index) => {
      clothesEntries[index].detail = e.currentTarget.value;
      setClothesEntries([...clothesEntries]);
    },
    purpose: (e, index) => {
      clothesEntries[index].purpose = e.currentTarget.value;
      setClothesEntries([...clothesEntries]);
    },
  };

  function submitOrder() {
    const req = {
      clothes: clothesEntries,
    };
    username && (req.username = username);
    phone && (req.phone = phone);
    isInHouse && (req.delivery.condition = "no");

    fetchy(`/api/v1/admin/orders`, "PUT", req).then(({ success, data }) => {
      if (success) {
        dispatch({
          type: "UPDATE_ORDERS",
          payload: { [data._id]: data },
        });
        history.replace(`/orders/${data._id}`);
      }
    });
  }

  return (
    <div className="addOrder">
      <h3 className="addOrder__title">Add Orders</h3>
      <hr />
      <input
        autoFocus
        className="addOrder__username"
        placeholder="Enter phone"
        value={phone}
        onChange={(e) => {
          setUsername("");
          setPhone(e.currentTarget.value);
        }}
      />
      OR if they have an account
      <input
        className="addOrder__username"
        placeholder="Enter username"
        value={username}
        onChange={(e) => {
          setPhone("");
          setUsername(e.currentTarget.value);
        }}
      />
      <div className="addOrder__numOfCloths">
        <p>Number of Clothes they have:</p>
        <input
          className="addOrder__number"
          value={clothesEntries.length || ""}
          onChange={(e) => handleChange.numOfClothes(e.currentTarget.value)}
        />
        <button
          className="addOrder__incbtn"
          onClick={() => handleChange.numOfClothes(clothesEntries.length + 1)}
        >
          +
        </button>
      </div>
      <div style={{ overflow: "auto" }}>
        <div className="table">
          <div className="table__header-container">
            <p className="table__header-title">Type</p>
            <p className="table__header-title">Detail</p>
            <p className="table__header-title">Purpose</p>
          </div>
          <div className="table__body-container">
            {clothesEntries.map((entry, index) => (
              <div className="table__body" key={index}>
                <div className="table__body-item">
                  <input
                    ref={(e) => focus && !entry.type && e && e.focus()}
                    className="table__input"
                    placeholder="Item Name"
                    value={entry.type}
                    onChange={(e) => handleChange.type(e, index)}
                  />
                </div>
                <div className="table__body-item">
                  <input
                    className="table__input"
                    placeholder="Color, Condition"
                    value={entry.detail}
                    onChange={(e) => handleChange.detail(e, index)}
                  />
                </div>
                <div className="table__body-item">
                  <input
                    className="table__input"
                    placeholder="Eg: Wash, Dry Clean"
                    value={entry.purpose}
                    onChange={(e) => handleChange.purpose(e, index)}
                  />
                </div>
              </div>
            ))}
            <button
              className="addOrder__incbtn"
              onClick={() =>
                handleChange.numOfClothes(clothesEntries.length + 1)
              }
            >
              + add
            </button>
          </div>
        </div>
        <div className="addOrder_submit">
          <button className="_button_round" onClick={submitOrder}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOrder;
