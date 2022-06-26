import fetchy from "../utils/fetchy";
import { convertArrayToObject } from "../utils";

// const fetchUserProfile = () => {
//   return (dispatch) => {
//     fetchy(`/api/v1/admin/users/details`, "POST").then(({ success, data }) => {
//       if (success) {
//         console.log(data);
//         dispatch({
//           type: "userProfile",
//           payload: data,
//         });
//       }
//     });
//   };
// };

const fetchItemsData = ({ type, data }) => {
  return (dispatch) => {
    fetchy(`/api/v1/admin/items`, "POST", data).then(({ success, data }) => {
      console.log(data);
      if (success) {
        dispatch({
          type,
          payload: convertArrayToObject(data, "_id"),
        });
      }
    });
  };
};

const fetchOrdersData = ({ filter }) => {
  return (dispatch) => {
    fetchy(`/api/v1/admin/orders`, "POST", {
      ...filter,
      orderFor: [],
    }).then(({ success, data }) => {
      console.log(data);
      if (success) {
        dispatch({
          type: "POPULATE_ORDERS",
          payload: convertArrayToObject(data, "_id"),
        });
      }
    });
  };
};

const addItem = ({ formData, req, cb }) => {
  return (dispatch) => {
    fetch("/api/v1/uploads/image-files", {
      method: "PUT",
      body: formData,
    })
      .then((e) => e.json())
      .then((res) => {
        //**TODO:ohmmee** overwritten for blank item submit */
        // if (res.success) {
        //   req.image.forEach((img, i) => {
        //     req.image[i] = res.fileName[i];
        //   });
        //   fetchy(.........
        if (res.success || true) {
          req.image &&
            req.image.forEach((img, i) => {
              req.image[i] = res.fileName[i];
            });
          fetchy(`/api/v1/admin/items`, "PUT", req).then((res) => {
            if (res.success) {
              cb();
              dispatch({
                type: "ADD_ITEM",
                payload: res.data,
              });
              dispatch({
                type: "SET_SNACKBAR",
                payload: {
                  type: "success",
                  message: `${req.itemName} has been added to the database`,
                },
              });
            } else {
              dispatch({
                type: "SET_SNACKBAR",
                payload: {
                  type: "error",
                  message: "Sorry! Something is Wrong, Please Try again",
                },
              });
            }
          });
        } else {
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "error",
              message: "Uploading Failed! Please Check if you've forgotten to add images",
            },
          });
        }
      });
  };
};

const updateItem = ({ formData, updated, cb }) => {
  return (dispatch) => {
    console.log(updated);
    formData.has(0)
      ? fetch("/api/v1/uploads/image-files", {
          method: "PUT",
          body: formData,
        })
          .then((e) => e.json())
          .then((res) => {
            if (res.success || true) {
              updated.image = updated.image
                ? [...updated.image, ...res.fileName]
                : (updated.image = [...res.fileName]);
              dispatch(patchItems(updated, cb));
            }
          })
      : dispatch(patchItems(updated, cb));
  };
};
const patchItems = (updated, cb) => {
  return (dispatch) =>
    fetchy(`/api/v1/admin/items`, "PATCH", updated).then((res) => {
      if (res.success) {
        cb();
        dispatch({
          type: "UPDATE_ITEMS",
          payload: updated,
        });
        dispatch({
          type: "SET_SNACKBAR",
          payload: {
            type: "success",
            message: `Item Updated Successfully`,
          },
        });
      } else {
        dispatch({
          type: "SET_SNACKBAR",
          payload: {
            type: "error",
            message:
              "Process Failed! Please Try again. If the problem persists, please contact the IT team",
          },
        });
      }
    });
};
const addOrder = ({ req }) => {
  return (dispatch) => {
    fetchy(`/api/v1/admin/order`, "PUT", req).then((success) => {
      if (success) {
        dispatch({
          type: "ADD_ORDER",
          payload: req,
        });
      }
    });
  };
};

const updateInventory = ({ data }) => {
  return (dispatch) => {
    console.log(data);
    fetchy(`/api/v1/admin/inventory`, "PATCH", data).then((success) => {
      if (success) {
        dispatch({
          type: "UPDATE_INVENTORY",
          payload: data,
        });
      }
    });
  };
};

const fetchConfigData = ({ type }) => {
  return (dispatch) => {
    fetchy(`/api/v1/admin/display`, "POST", {
      configName: "itemsDisplay",
    }).then(({ success, data }) => {
      if (success) {
        dispatch({
          type,
          payload: data,
        });
      }
    });
  };
};

const fetchClientsData = ({ type, data }) => {
  return (dispatch) => {
    fetchy(`/api/v1/admin/clients`, "POST", data).then(({ success, data }) => {
      if (success) {
        dispatch({
          type,
          payload: convertArrayToObject(data, "_id"),
        });
      }
    });
  };
};

const updateConfig = (update, name, type) => {
  return (dispatch) => {
    fetchy(`/api/v1/admin/display`, "PATCH", {
      configName: "itemsDisplay",
      data: { [name]: update },
    }).then(({ success, data }) => {
      if (success) {
        dispatch({
          type,
          payload: update,
        });
        dispatch({
          type: "SET_SNACKBAR",
          payload: {
            type: "success",
            message: `${name} updated successfully!!`,
          },
        });
      } else {
        dispatch({
          type: "SET_SNACKBAR",
          payload: {
            type: "error",
            message:
              "Process Failed! Please Try again. If the problem persists, please contact the IT team",
          },
        });
      }
    });
  };
};

const addBanner = ({ formData, bannerImages }) => {
  return (dispatch) => {
    fetch("/api/v1/uploads/image-files", {
      method: "PUT",
      body: formData,
    })
      .then((e) => e.json())
      .then((res) => {
        if (res.success) {
          dispatch(
            updateConfig(
              [...bannerImages, res.fileName[0]],
              "bannerImages",
              "UPDATE_BANNER"
            )
          );
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "success",
              message: "New Banner Added Successfully!!",
            },
          });
        } else {
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "error",
              message:
                "Uploading Failed! Please Try again. If the problem persists, please contact the IT team",
            },
          });
        }
      });
  };
};

const addClient = (req, cb) => {
  return (dispatch) => {
    fetchy(`/api/v1/admin/clients`, "PUT", req).then((success) => {
      if (success) {
        console.log(success);
        dispatch({
          type: "ADD_CLIENT",
          payload: success.data,
        });
        cb && cb();
      }
    });
  };
};

export {
  // fetchUserProfile,
  fetchItemsData,
  fetchOrdersData,
  addItem,
  updateItem,
  addOrder,
  updateInventory,
  fetchConfigData,
  fetchClientsData,
  updateConfig,
  addBanner,
  addClient,
};
