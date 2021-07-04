import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '15px' + ' !important',
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
    color: '#41A2F9' + ' !important',
    height: 8 + 'px !important',
  },
  thumb: {
    height: 24 + 'px !important',
    width: 24 + 'px !important',
    backgroundColor: '#fff' + ' !important',
    border: '2px solid currentColor' + ' !important',
    marginTop: -8 + 'px !important',
    marginLeft: -12 + 'px !important',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit' + ' !important',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)' + ' !important',
  },
  track: {
    height: 8 + 'px !important',
    borderRadius: 4 + 'px !important',
  },
  rail: {
    height: 8 + 'px !important',
    borderRadius: 4 + 'px !important',
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
