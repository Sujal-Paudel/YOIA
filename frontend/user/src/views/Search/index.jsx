import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

//components
import ItemCard from "../../components/ItemCard";

import styles from "./index.styles";

import { fetchSearchData } from "../../actions";
import NotFoundImg from "../../assets/img/notFound.png";
const useStyles = makeStyles(styles);

function Search() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state);
  const classes = useStyles();

  console.log(searchData);
  useEffect(() => {
    dispatch(fetchSearchData({ query }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          color="textPrimary"
          style={{ textDecoration: "underline" }}
        >
          Search Result for "{query}": {searchData.length} items found
        </Typography>
      </Container>
      {searchData.length ? (
        <Container maxWidth="lg">
          <div className={classes.searchResults}>
            {Object.values(searchData).map((item) => (
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

export default Search;
