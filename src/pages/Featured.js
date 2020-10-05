import React from 'react';
import {
  FaGlassCheers,
  FaHotel,
  FaSwimmingPool,
  FaUsers
} from 'react-icons/fa';

const Featured = () => {
  return (
    <div className="home-featured">
      <div className="rooms">
        <FaHotel />
        <p className="count">120</p>
        <p>Rooms</p>
      </div>
      <div className="users">
        <FaUsers />
        <p className="count">430</p>
        <p>Staffs</p>
      </div>
      <div className="bars">
        <FaGlassCheers />
        <p className="count">4</p>
        <p>Bars</p>
      </div>
      <div className="pools">
        <FaSwimmingPool />
        <p className="count">3</p>
        <p>Pools</p>
      </div>
    </div>
  );
};

export default Featured;
