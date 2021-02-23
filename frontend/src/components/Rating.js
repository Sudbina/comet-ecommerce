import React from 'react';

const Rating = ({ value, text, colour }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{
            color: colour,
            textShadow: '1px 1px rgba(0,0,0,0.4)',
          }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{
            color: colour,
            textShadow: '1px 1px rgba(0,0,0,0.4)',
          }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{
            color: colour,
            textShadow: '1px 1px rgba(0,0,0,0.4)',
          }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{
            color: colour,
            textShadow: '1px 1px rgba(0,0,0,0.4)',
          }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{
            color: colour,
            textShadow: '1px 1px rgba(0,0,0,0.4)',
          }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span style={{ fontSize: 13 }}> {text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  colour: '#edde1c',
};

export default Rating;
