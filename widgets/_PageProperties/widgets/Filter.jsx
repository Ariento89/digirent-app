import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const options = ['Sort by', 'Recommended', 'Most recent', 'Lowest price', 'Highest price'];
const sortAPIOptions = [
  {},
  { sort_by: 'date', sort_order: 'desc' },
  { sort_by: 'price', sort_order: 'asc' },
  { sort_by: 'price', sort_order: 'desc' },
];

export default function SplitButton({ onSortChange }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    onSortChange(sortAPIOptions[index - 1]);
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center" style={{ zIndex: 2 }}>
      <Grid item xs={12}>
        <Button
          ref={anchorRef}
          color="primary"
          variant='outlined'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          style={{
            fontFamily: '"Proxima Nova", sans-serif',
            textTransform: 'initial',
            fontWeight: 300,
            borderRadius: 20,
            fontSize: 16
          }}
        >
          {options[selectedIndex]}
          <ArrowDropDownIcon />
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} style={{ zIndex: 2 }} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        style={{
                          fontSize: '0.875rem',
                          minHeight: 'auto',
                          fontWeight: 300,
                          lineHeight: 1.43,
                          fontFamily: '"Proxima Nova", sans-serif'
                        }}
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}