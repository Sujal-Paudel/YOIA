import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import ItemCard from "../../components/ItemCard";

import { fetchSearchData } from "../../actions";
import { convertArrayToObject } from "../../utils";
import { filterFolderItems } from "../../utils/variables";

import styles from "./index.styles";
import NotFoundImg from "../../assets/img/notFound.png";

const useStyles = makeStyles(styles);

function Category() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { itemsData, searchData } = useSelector((state) => state);
  const classes = useStyles();

  const mergedItems = {
    ...convertArrayToObject(
      Object.values(itemsData).filter((e) =>
        filterFolderItems[query].includes(e.category)
      ),
      "_id"
    ),
    ...convertArrayToObject(searchData, "_id"),
  };

  useEffect(() => {
    dispatch(fetchSearchData({ query }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          color="textPrimary"
          style={{ textDecoration: "underline" }}
        >
          Category Items for "{query}"
        </Typography>
      </Container>
      {Object.keys(mergedItems).length ? (
        <Container maxWidth="lg">
          <div className={classes.searchResults}>
            {Object.values(mergedItems).map((item) => (
              <div key={item._id} className={classes.itemCard}>
                <ItemCard item={item} allProducts />
              </div>
            ))}
          </div>
        </Container>
      ) : (
        <Container maxWidth="xs">
          <div className={classes.noResult}>
            <img
              src={NotFoundImg}
              width="50%"
              height="50%"
              alt="Search Not Found"
            />
            <Typography variant="subtitle1" color="textSecondary">
              Oops Sorry! We couldn't find the Items you were looking for.
              Please search for a different Item
            </Typography>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Category;
