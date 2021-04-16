import React, { useState } from 'react'
import TopBar from './TopBar'
import NavBar from './NavBar'
import {
  makeStyles,
  IconButton,
  Divider
} from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import './layout.css'
import BreadCrumb from '../../common/BreadCrumb'
import PaletteIcon from '@material-ui/icons/Palette';
import { useDispatch , useSelector } from 'react-redux'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ChatDialog from '../../../images/chatbox.png'
import { useLayoutSlice } from './slice'
import {
  selectMenuToggle
} from './slice/selectors'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 110
    },
    transition: '0.5s'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  theme_back_color: {
    background: theme.palette.primary.main,
    "& svg path": {
      fill: `white !important`
    },
  }

}))


const warmThemes = [
  {
    name: 'PurpleTheme',
    color_code: '#922c88'
  },
  {
    name: 'OrangeTheme',
    color_code: '#ed7117'
  },
  {
    name: 'BlueNavyTheme',
    color_code: '#00365a'
  },
  {
    name: 'GreenMomoTheme',
    color_code: '#576a3d'
  },
  {
    name: 'GreenLimeTheme',
    color_code: '#6fb327'
  },
  {
    name: "theme",
    color_code: "#008ecc"
  }
]

const coolThemes = [
  {
    name: 'Gold',
    color_code: '#FFD700'
  },
  {
    name: 'Khaki',
    color_code: '#F0E68C'
  },
  {
    name: 'LemonChiffon',
    color_code: '#FFFACD'
  },
  {
    name: 'Silver',
    color_code: '#C0C0C0'
  },
  {
    name: 'WhiteSmoke',
    color_code: '#F5F5F5'
  }
]

const Layout = () => {
  const classes = useStyles()
  const [isMobileView, setIsMobileView] = useState(false)
  const [showTheme, setShowTheme] = useState(false)
  const dispatch = useDispatch()
  const { actions } = useLayoutSlice()
  const [showChatBox, setShowChatBox] = useState(false)
  const toggleMenu = useSelector(selectMenuToggle)
  //const toggleMenu = false
 


  const changeTheme = (theme) => {
    dispatch(actions.changeTheme(theme))
  }

  return (
    <div className="layout">
      <TopBar
        onMobielViewOpen={() => {
          setIsMobileView(true)
        }}
      />
      <NavBar
        isMobileView={isMobileView}
        closeMobileView={() => {
          setIsMobileView(false)
        }}
      />
      <div className={toggleMenu ? `${classes.wrapper} dynamicWrapper` : `${classes.wrapper}`}>
        <div className="contentContainer">
          <div className={toggleMenu ? `content dynamicContent` : `content`}>
            <BreadCrumb />
            <div className="child_component">
              <Outlet />
            </div>
            <div className="app_copyright">Copyright @ tecnics India </div>
            <div className={`theme_selector ${classes.theme_back_color}`}>
              <IconButton
                onClick={() => {
                  setShowTheme(!showTheme)
                  if (showChatBox)
                    setShowChatBox(!showChatBox)
                }}
              >
                <PaletteIcon />
              </IconButton>
            </div>
            <div className={showTheme ? `theme_selector_shown theme_show` : `theme_selector_shown theme_hidden`}>
              <p className="theme_name">Warm Themes</p>
              <div className="theme_colors" >
                {warmThemes.map((theme, index) => (
                  <div className="theme_color" key={index} onClick={() => changeTheme(theme)} style={{ backgroundColor: `${theme.color_code}` }}>
                  </div>
                ))}
              </div>
              <Divider style={{ marginBottom: '11px' }} />
              <p className="theme_name">Cool Themes</p>
              <div className="theme_colors" >
                {coolThemes.map((theme, index) => (
                  <div className="theme_color" key={index} onClick={() => changeTheme(theme)} style={{ backgroundColor: `${theme.color_code}` }}>
                  </div>
                ))}
              </div>
            </div>
            <div aria-label="chatbox" className={`chat_box  ${classes.theme_back_color}`}>
              <IconButton
                onClick={() => {
                  setShowChatBox(!showChatBox);
                  if (showTheme)
                    setShowTheme(!showTheme)
                }}
              >
                <ChatBubbleOutlineOutlinedIcon />
              </IconButton>
            </div>
            <div aria-label="chatbox_dialog" className={showChatBox ? "chat_box_dialog chat_show" : "chat_box_dialog chat_hide"}>
              <div aria-label="chat box content">
                <img src={ChatDialog} alt="chat dialog" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
export default Layout
