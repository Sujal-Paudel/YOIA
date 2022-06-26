import React, { useState, useEffect } from "react";
import ArrowLeftOutlinedIcon from "@material-ui/icons/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@material-ui/icons/ArrowRightOutlined";
import { makeStyles } from "@material-ui/core/styles";

//styles
import styles from "./index.styles";
import { DesktopWindowsRounded } from "@material-ui/icons";

const useStyles = makeStyles(styles);
/*
@param {number} length => length of slides/image
@param {string} domRef=> Give a ref to your slides to track its width through DOM
@param {string} sliderWrapperWidth => Width (%): that you want your slides width to be . default=100%
*/
const Slider = (props) => {
  const {
    children,
    length,
    domRef,
    auto,
    sliderWrapperWidth,
    sliderHeight,
    items,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [translateValue, setTranslateValue] = useState(0);
  const styledProps = {
    translateValue,
    sliderWrapperWidth,
    sliderHeight,
    items,
  };
  const classes = useStyles(styledProps);

  const sliderOffset = window.innerWidth >= 1280 ? 5 : 3; // needs reloading

  const slideWidth = () => {
    return domRef.current.clientWidth;
  };

  const goToPrevSlide = () => {
    if (currentIndex === 1) {
      return;
    }
    setCurrentIndex(currentIndex - 1);
    setTranslateValue(translateValue + slideWidth());
  };
  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % length);
    setTranslateValue(currentIndex * -slideWidth());
    console.log(currentIndex);
  };
  useEffect(() => {
    if (length > 1 && auto) {
      const timer = setTimeout(() => {
        goToNextSlide();
      }, 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className={classes.slider}>
      <div className={classes.sliderWrapper}>{children}</div>
      {length > 1 && currentIndex <= length - sliderOffset && (
        <div
          className={`${classes.arrow} ${classes.nextArrow}`}
          onClick={goToNextSlide}
        >
          <ArrowRightOutlinedIcon fontSize="large" />
        </div>
      )}
      {currentIndex > 1 && (
        <div
          className={`${classes.arrow} ${classes.backArrow}`}
          onClick={goToPrevSlide}
        >
          <ArrowLeftOutlinedIcon fontSize="large" />
        </div>
      )}
    </div>
  );
};
export default Slider;
