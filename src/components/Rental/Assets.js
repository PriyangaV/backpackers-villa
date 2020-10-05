import React from 'react';

import {
  FaAsterisk,
  FaDesktop,
  FaCubes,
  FaShower,
  FaUmbrellaBeach,
  FaGlassCheers,
  FaCocktail,
  FaClock
} from 'react-icons/fa';

const Assets = () => {
  return (
    <div className="rental-assets">
      <h3 className="assets">Amenities</h3>
      <div className="asset-details">
        <span className="asset-icon">
          <FaAsterisk />
          Air Conditioning
        </span>
        <span className="asset-icon">
          <FaDesktop />
          Free Wifi
        </span>
        <span className="asset-icon">
          <FaClock />
          Wake-up call
        </span>
        <span className="asset-icon">
          <FaCubes />
          Fitness center
        </span>
        <span className="asset-icon">
          <FaGlassCheers />
          Mini bar
        </span>
        <span className="asset-icon">
          <FaCocktail />
          Restaurant
        </span>
        <span className="asset-icon">
          <FaUmbrellaBeach />
          Beach View
        </span>
        <span className="asset-icon">
          <FaShower />
          Hot/Cold Shower & Bathtub
        </span>
      </div>
    </div>
  );
};

export default Assets;
