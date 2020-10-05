import React from 'react';

const Reviews = () => {
  return (
    <article className="reviews">
      <h3>Top Reviews</h3>
      <div className="reviews-container">
        <div className="user-icon">
          <img src="http://www.gravatar.com/avatar/?d=mp" alt="user" />
        </div>
        <div className="description">
          <p className="meta">
            <strong>John</strong> - <em>03 June 2020</em>
          </p>
          <p>
            Room was very clean. Staff was great. Wine hour was a plus. Best
            trip EVER!
          </p>
        </div>
      </div>
      <div className="reviews-container">
        <div className="user-icon">
          <img src="http://www.gravatar.com/avatar/?d=mp" alt="user" />
        </div>
        <div className="description">
          <p className="meta">
            <strong>Peter</strong> - <em>15 May 2020</em>
          </p>
          <p>When you look outside from the windows its breath taking!</p>
        </div>
      </div>
      <div className="reviews-container">
        <div className="user-icon">
          <img src="http://www.gravatar.com/avatar/?d=mp" alt="user" />
        </div>
        <div className="description">
          <p className="meta">
            <strong>Bob</strong> - <em>22 Mar 2020</em>
          </p>
          <p>We had great experience while our stay!</p>
        </div>
      </div>
    </article>
  );
};

export default Reviews;
