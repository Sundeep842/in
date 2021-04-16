import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import _ from 'lodash'


const _theme =   JSON.parse(localStorage.getItem('theme'))

const getThemeColor = () => { // get current theme from redux state
  let isEmptyObject  = _.isEmpty(_theme)
  if(isEmptyObject)
      return '#008ecc' // if no theme ... this is default
  return _theme.color_code
}

const theme = createMuiTheme({
  overrides: {
    MuiCircularProgress : {
      root : {
        height : '50px !important',
        width: '50px !important'
      }
    },
    MuiTabs : {
      indicator : {
        backgroundColor: `${getThemeColor()} !important`,
        top: '0px'
      }
    },
    MuiTab : {
      wrapper : {
        textTransform:'none !important',
        "& svg path" : {
           fill: `${getThemeColor()} !important`
         }
      },
      
    },
    MuiBackdrop : {
      root : {
        backgroundColor : 'unset !important'
      }
    },
    MuiListItem: {
      root: {
        "&$selected": {
          color: `${getThemeColor()} !important`,
          backgroundColor : '#fff !important'
        },
        "&$selected svg" : {
            fill: `${getThemeColor()} !important`
        },
        "&:hover svg path" : {
           fill: `${getThemeColor()} !important`
        },
        "&:hover": {
          color: `${getThemeColor()} !important`,
          backgroundColor : '#fff !important'
        },
        "&$selected:before" :{
          content: "",
          background: `${getThemeColor()}`,
          position: 'absolute',
          width: '4px',
          height: '80%',
          top: '50%',
          transform: 'translateY(-50%)',
          left: 0,
          borderRadius : '50px',
          transition: 'all 0.3s ease-in !important'
        },
      },
    },
    MuiDialogTitle : {
      root: {
        background : `${getThemeColor()} !important`,
        padding: '8px 24px !important'
      }
    },
    MuiButton : {
        label : {
          textTransform : 'none !important'
        }
    },
    selected: {},
  },
  palette: {
    background: {
      dark: '#fff'
    },
    primary: {
      main: `${getThemeColor()}`
    },
    secondary: {
      main: '#fff'
    },
    text: {
      primary: colors.common.black,
      secondary: colors.common.black
    }
  },
  shadows,
  typography: {
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
    ].join(','),
    fontSize: 12,
    fontWeight: 400
  }
});

export default theme;
