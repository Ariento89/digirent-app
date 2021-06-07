import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '15px',
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const PrettoSlider = withStyles({
  root: {
    color: '#41A2F9',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const CustomSlider = ({ getAriaValueText, onChangeCommitted, onChange, value, min, max }) => {
  const classes = useStyles();

  return (
    <PrettoSlider
      className={classes.root}
      key={`slider-${getAriaValueText}`}
      min={min}
      max={max}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
      value={value}
      getAriaValueText={getAriaValueText}
    />
  );
};

export default CustomSlider;
