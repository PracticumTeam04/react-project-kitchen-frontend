import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ appName }) => (
  <div className="banner">
    <div className="container">
      <h1 className="logo-font">{appName}</h1>
      <p>Место, где готовится новый опыт</p>
    </div>
  </div>
);

export default Banner;

Banner.propTypes = {
  appName: PropTypes.string.isRequired,
};
