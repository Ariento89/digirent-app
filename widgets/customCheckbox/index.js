import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckBox = withStyles({
  root: {
    color: '#41A2C9',
    '&$checked': {
      color: '#41A2F9',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default CustomCheckBox;
