import React from 'react';
import PropTypes from 'prop-types';
import styles from './LikeButton.module.css';

const LikeButton = ({ count, isFavorited, onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick(event);
  };
  return (
    <button
      type="button"
      className={`${styles.button} ${
        isFavorited ? styles.button_active : ''
      }`}
      onClick={handleClick}
    >
      {count}
    </button>
  );
};

export default LikeButton;

LikeButton.propTypes = {
  count: PropTypes.number.isRequired,
  isFavorited: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
