import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#41A2F9',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#41A2F9',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#41A2F9',
      },
      '&:hover fieldset': {
        borderColor: '#41A2F9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#41A2F9',
      },
    },
  },
})(TextField);

export default CssTextField;
