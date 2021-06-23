import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const CustomRadioBtn = withStyles({
  root: {
    color: '#41A2C9',
    '&$checked': {
      color: '#41A2F9',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default CustomRadioBtn;
