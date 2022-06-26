import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Hidden from "@material-ui/core/Hidden";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

//components
import Slider from "../Slider";
import ItemCard from "../ItemCard";
//styles
import styles from "./index.styles";

const useStyles = makeStyles(styles);

const ItemSlider = (props) => {
  const { data } = props;
  const classes = useStyles();
  const history = useHistory();
  const itemsRef = useRef(null);

  return (
    <React.Fragment>
      <Hidden smDown>
        <Slider
          domRef={itemsRef}
          length={data.length}
          sliderWrapperWidth="16%"
          sliderHeight="370px"
          items
        >
          {data.map((item) => {
            return (
              <div key={item._id} className={classes.slide} ref={itemsRef}>
                <ItemCard item={item} />
              </div>
            );
          })}
        </Slider>
      </Hidden>
      <Hidden mdUp>
        <div className={classes.tileRoot}>
          <GridList
            className={classes.tileGridList}
            cols={window.innerWidth < 600 ? 2 : 2.5}
          >
            {data.map((item) => (
              <GridListTile
                key={item._id}
                onClick={() => history.push(`/item/${item._id}`)}
                style={{
                  height: 300,
                  margin: 4,
                }}
                classes={{ root: classes.gridListRoot }}
              >
                <ItemCard item={item} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </Hidden>
    </React.Fragment>
  );
};
export default ItemSlider;
