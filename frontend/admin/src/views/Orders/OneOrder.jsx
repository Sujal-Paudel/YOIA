import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import CustomModal from "../../components/CustomModal";
import StyledChip from "./StyledChip";

import { idToTicketNo, camelToPascalCase } from "../../utils";
import { defaultDisplayImage, imageSrcRoute } from "../../assets/img";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  productImage: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  header: {
    // padding: theme.spacing(2),
  },
  truncateName: {
    marginTop: theme.spacing(1, 0),
    overflow: "hidden",
    position: "relative",
    display: " -webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
}));

const OneOrder = (props) => {
  const { row, open, toggleModal } = props;
  const { itemsData, clientsData } = useSelector((state) => state);

  const classes = useStyles();

  const DataDisplay = ({ object, filterArray }) => {
    if (object === undefined) return <></>;

    const label = filterArray
      ? Object.keys(object).filter((e) => filterArray.includes(e))
      : Object.keys(object);

    return label.map((one) => (
      <Grid container spacing={2} key={one}>
        <Grid item xs={12} sm={3}>
          <Typography
            variant="subtitle1"
            style={{ display: "flex", alignItems: "center" }}
          >
            {camelToPascalCase(one)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            style={{ display: "flex", alignItems: "center" }}
          >
            {one === "status" ? (
              <StyledChip
                size="small"
                row={row}
                status={object[one]}
                label={object[one]}
              />
            ) : (
              object[one]
            )}
          </Typography>
        </Grid>
      </Grid>
    ));
  };

  return (
    <CustomModal
      toggleModal={toggleModal}
      open={!!open}
      title={`Data Display of ${idToTicketNo(row._id)}`}
    >
      <form noValidate autoComplete="off">
        {row.newUserDetails ? (
          <>
            <Typography variant="h6">New User</Typography>
            <DataDisplay object={row.newUserDetails} />
            <hr />
          </>
        ) : (
          <>
            <DataDisplay
              object={Object.values(clientsData).find(
                (e) => e.username === row.username
              )}
              filterArray={[
                "username",
                "fullName",
                "email",
                "phone",
                "address",
              ]}
            />
            <hr />
          </>
        )}

        <Typography variant="h6">Delivery</Typography>
        <DataDisplay object={row.delivery} />
        <hr />
        <DataDisplay object={{ status: row.status }} />
        <DataDisplay
          object={{ total: row.total, grandTotal: row.grandTotal }}
        />
        <DataDisplay object={{ details: row.details }} />

        <Grid container spacing={2} style={{ marginBottom: 16 }}>
          {row.items.map((item, i) => {
            const itemImage = Object.values(itemsData).find(
              (temp) => temp.itemCode === item.itemCode
            );
            return (
              <Grid item xs={12} sm={4} key={i}>
                <div className={classes.flexContainer}>
                  <img
                    src={
                      itemImage.length
                        ? `${imageSrcRoute}/${itemImage[0].image}`
                        : defaultDisplayImage
                    }
                    alt={item.itemName}
                    onError={(e) => (e.target.src = defaultDisplayImage)}
                    className={classes.productImage}
                  />
                </div>

                <Typography variant="body2" className={classes.truncateName}>
                  {item.itemName}
                </Typography>
                <Typography variant="caption">
                  Qty: Rs. {item.quantity}
                </Typography>
                <br />
                <Typography variant="caption">Rate: Rs. {item.rate}</Typography>
                <Typography variant="caption">
                  <br />
                  Total: Rs. {item.quantity * item.rate}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </form>
    </CustomModal>
  );
};

export default OneOrder;
