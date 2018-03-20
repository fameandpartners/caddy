import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  imageData: PropTypes.string,
  defaultImageData: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const defaultProps = {
  imageData: '',
  defaultImageData: '',
};

const CanvasImage = ({ imageData, defaultImageData, width, height }) => {
  const imgData = imageData || defaultImageData;
  return (
    <img
      alt="Caddy item"
      src={imgData}
      style={{ objectFit: 'contain' }}
      className={classnames({ hidden: !imgData })}
      width={width}
      height={height}
    />
  );
};

CanvasImage.propTypes = propTypes;
CanvasImage.defaultProps = defaultProps;

export default CanvasImage;
