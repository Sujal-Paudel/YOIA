import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

// import styles from "./index.styles";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    cursor: "pointer",
    "&>p": {
      padding: theme.spacing(1),
    },
    "&>p:hover": {
      textDecoration: "underline",
    },
    "&>button": {
      border: "none",
      background: "transparent",
      padding: theme.spacing(0, 1),
      cursor: "pointer",
      outline: "none",
    },
  },
  activePage: {
    background: theme.color.main,
    borderRadius: 5,
  },
}));

//@params {number} length ==> The total length of items
//@params {number} current ==> Current Page Number
//@params {number} [offset=30] ==> Items on each page
//@params {function}  setCurrent ==> Function to change the current state
const Pagination = (props) => {
  const { total, current, offset, setCurrent } = props;
  const classes = useStyles();
  const [pageView, setPageView] = React.useState([]);

  React.useEffect(() => {
    const length = Math.ceil(total / offset);
    let temp = [];
    if (length < 10) {
      for (let i = 1; i <= length; i++) {
        temp.push(i);
      }
      setPageView(temp);
    } else if (current < 5 || current > length - 1)
      setPageView([1, 2, 3, 4, 5, "e", length - 1, length]);
    else if (current >= length - 3) {
      setPageView([1, 2, 3, "e", length - 3, length - 2, length - 1, length]);
    } else if (current + 1 <= length - 1) {
      setPageView([
        1,
        2,
        "e",
        current - 1,
        current,
        current + 1,
        "e",
        length - 1,
        length,
      ]);
    }
  }, [props]);

  return (
    <div className={classes.pagination}>
      <button
        disabled={current === 1}
        onClick={() => {
          setCurrent(current - 1);
        }}
      >
        Prev
      </button>
      {pageView.map((p, index) => {
        return p === "e" ? (
          <p key={index}>......</p>
        ) : (
          <p
            key={index}
            onClick={() => setCurrent(p)}
            className={clsx({ [classes.activePage]: p === current })}
          >
            {p}
          </p>
        );
      })}
      <button
        disabled={current === Math.ceil(total / offset)}
        onClick={() => {
          setCurrent(current + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
