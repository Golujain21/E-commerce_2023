import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
const HeroBanner = () => {
  return (
    <div className="position-relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div onClick={clickHandler} className="right-Arrow bg-dark">
            <BiArrowBack className="text-sm md:text-lg bg-dark" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div onClick={clickHandler} className="left-Arrow  bg-dark">
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        <div>
          <img
            src="/slide-1.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="">Shop now</div>
        </div>

        <div>
          <img
            src="/slide-2.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="">Shop now</div>
        </div>

        <div>
          <img
            src="/slide-3.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div className="">Shop now</div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
