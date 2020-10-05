import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import ImgComp from './ImgComp';
import slide1 from './assets/slide-1.jpeg';
import slide2 from './assets/slide-2.jpeg';
import slide3 from './assets/slide-3.jpeg';
import slide4 from './assets/slide-4.jpeg';
import slide5 from './assets/slide-5.jpeg';

const Slider = () => {
  // let's create an array for component to show inside the slider

  // let's add components to the array
  // let sliderArray = [1, 2, 3, 4, 5];

  let sliderArray = [
    <ImgComp src={slide1} />,
    <ImgComp src={slide2} />,
    <ImgComp src={slide3} />,
    <ImgComp src={slide4} />,
    <ImgComp src={slide5} />
  ];
  const [x, setX] = useState(0);
  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderArray.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    // sliderArray.length was used, so that the input can be dynamic
    x === -100 * (sliderArray.length - 1) ? setX(0) : setX(x - 100);
  };
  return (
    <div className="hero-slider">
      {sliderArray.map((item, index) => {
        return (
          <div
            key={index}
            className="slide"
            style={{ transform: `translateX(${x}%)` }}
          >
            {item}
            <button className="goLeft" onClick={goLeft}>
              <FaChevronLeft />
            </button>
            <button className="goRight" onClick={goRight}>
              <FaChevronRight />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
