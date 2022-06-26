import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";

import Pagination from "../../components/Pagination";
import Banner from "../../components/Banner";
import CategoryButtons from "./CategoryButtons";
import ItemSlider from "../../components/ItemSlider";
import ItemCard from "../../components/ItemCard";
import FilterFolder from "../../components/FilterFolder";

import styles from "./index.styles";

const useStyles = makeStyles(styles);

function Home() {
  const { itemsData, configData } = useSelector((state) => state);
  const classes = useStyles();
  const refs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const [page, setPage] = useState(1);

  const pageOffset = 30; // Number of items to be displayed at a time
  const itemsArray = Object.values(itemsData) || [];

  if (!configData._id) return <></>;

  const itemsDataDisplay = {
    Featured: itemsArray.filter(
      (e) => configData.featured.includes(e.itemCode) && e
    ),
    "Best Value": itemsArray.filter(
      (e) => configData.bestValue.includes(e.itemCode) && e
    ),
    Popular: itemsArray.filter(
      (e) => configData.popular.includes(e.itemCode) && e
    ),
  };

  const categoryTitle = [...Object.keys(itemsDataDisplay), "All Products"];

  const scrollToElement = (index) => {
    window.scrollTo({
      top: refs.current[index].current.offsetTop - 50,
      behavior: "smooth",
    });
  };

  const handleClick = {
    nextPage: (pageNum) => {
      setPage(pageNum);
      scrollToElement(3);
    },
  };

  console.log(itemsArray);

  return (
    <div>
      <Banner />
      <Container maxWidth="lg" className={classes.root}>
        <Typography variant="h5" className={classes.categoryTitle}>
          Browse by Category
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "40%", marginTop: 8 }} />
          </div>
        </Typography>

        <FilterFolder />
        <Hidden smDown>
          <Grid
            container
            spacing={4}
            justify="space-between"
            style={{ marginTop: 32 }}
          >
            {categoryTitle.map((title, i) => (
              <CategoryButtons
                title={title}
                key={i}
                onClick={() => scrollToElement(i)}
              />
            ))}
          </Grid>
        </Hidden>
        {categoryTitle.map((title, i) => (
          <React.Fragment key={i}>
            <Typography
              variant="h5"
              className={classes.categoryTitle}
              ref={refs.current[i]}
            >
              {title}
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Divider style={{ width: "40%" }} />
            </div>
            {title === "All Products" ? (
              <>
                <div className={classes.allProducts}>
                  {itemsArray
                    .slice(
                      (page - 1) * pageOffset,
                      (page - 1) * pageOffset + pageOffset
                    )
                    .map((item) => (
                      <div key={item._id} className={classes.itemCard}>
                        <ItemCard item={item} allProducts />
                      </div>
                    ))}
                </div>

                <Pagination
                  current={page}
                  total={itemsArray.length}
                  offset={pageOffset}
                  setCurrent={handleClick.nextPage}
                />
              </>
            ) : (
              <ItemSlider data={Object.values(itemsDataDisplay[title])} />
            )}
          </React.Fragment>
        ))}
      </Container>
    </div>
  );
}

export default Home;
