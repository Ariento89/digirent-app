import { withStyles } from '@material-ui/core/styles';
import TabList from '@material-ui/lab/TabList';
import Tab from '@material-ui/core/Tab';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8' + ' !important',
  },
  indicator: {
    backgroundColor: '#1890ff' + ' !important',
  },
})(TabList);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none' + ' !important',
    minWidth: 72 + ' !important',
    fontWeight: theme.typography.fontWeightRegular + ' !important',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',') + ' !important',
    '&:hover': {
      color: '#40a9ff' + ' !important',
      opacity: 1 + ' !important',
    },
    '&$selected': {
      color: '#1890ff' + ' !important',
      fontWeight: theme.typography.fontWeightMedium + ' !important',
    },
    '&:focus': {
      color: '#40a9ff' + ' !important',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export { AntTab, AntTabs };
