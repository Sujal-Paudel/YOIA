import React, { useRef } from "react";
import { useSelector } from "react-redux";

//components
import Slider from "../Slider";

import { imageSrcRoute } from "../../assets/img";

const Banner = () => {
  const bannerRef = useRef();
  const { configData } = useSelector((state) => state);

  const images = configData.bannerImages || [];

  const Slide = ({ image }) => {
    const styles = {
      backgroundImage: `url(${image})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
      //slides
      display: "inline-block",
      height: "100%",
      width: "100%",
    };
    return <div ref={bannerRef} style={styles}></div>;
  };

  return (
    <Slider length={images.length} domRef={bannerRef} auto>
      {images.map((image, i) => (
        <Slide key={i} image={`${imageSrcRoute}/${image}`} />
      ))}
    </Slider>
  );
};
export default Banner;
