import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero">
        <div className="hero-banner">
          <h1>continue exploring</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
            doloremque, qui accusantium ut cupiditate vitae.
          </p>
          <Link to="/rooms" className="btn hero-btn scroll-link">
            explore rooms
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
