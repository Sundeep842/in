import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './layout.css'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_ACTION , TOGGLE_MENU } from '../../../actions/Action'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {
  Badge,
  Avatar,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Hidden,
  IconButton
} from '@material-ui/core'
import ProfileLogo from '../../../images/avatar.jpg'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import logo from '../../../images/logo.png'
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import { useLoginSlice }  from '../authentication/slice'// inject login slice to get _loginSlice state 
import {
  selectUser
}  from '../authentication/slice/selectors'
import {
  useLayoutSlice
} from './slice'
import {
  selectMenuToggle
} from './slice/selectors'


const TopBar = (props) => {
  const { onMobielViewOpen} = props
  let navigate = useNavigate();
  useLoginSlice() // initialize to push initial state / upated state of login slice
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null)
  const [toggle , setToggle] = useState(true)
  const { actions }  =  useLayoutSlice()
  const toggled =  useSelector(selectMenuToggle)
  

  const handleLogout = () => {
    localStorage.removeItem('appUser')
    window.location.href = "/"
  }

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null)
  }

  const handleMobileMenuClick = (event) => {
    setMobileAnchorEl(event.currentTarget)
  }

  const handleToggleClick = () => {
      setToggle(!toggle) // change toggle 
      dispatch(actions.toggleMenu(!toggled))
  }

  const mobileMenuItems = (
    <Menu
      anchorEl={mobileAnchorEl}
      keepMounted
      open={Boolean(mobileAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton>
          <Badge badgeContent={7} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar color="secondary" position="fixed">
        <Toolbar className="top_toolbar">
          <Hidden mdDown>
            <div className="top_bar">
                <div className="top_bar_left">
                      <span className={toggle ? 'toggleRotate' : ''}>
                        <IconButton onClick={handleToggleClick}>
                            <MenuOpenOutlinedIcon/>
                        </IconButton>
                      </span>
                      <IconButton className="todo_list"
                        onClick={() => {
                          navigate(`/app/${user.roles[0]}/todo`,{replace:false})
                        }}
                      >
                        <AssignmentTurnedInOutlinedIcon/>
                      </IconButton>
                </div>
                <img src={logo} alt="Logo" className="top_bar_logo"/>
                <div className="top_bar_right">
                  <div>
                    <IconButton>
                      <Badge badgeContent={7} color="primary">
                          <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </div>
                  <div>
                        <Avatar alt={user.userId} src={ProfileLogo} onClick={(e) => handleAvatarClick(e)} />
                        <Menu
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                    <div className="top_bar_right_name">
                      <span>shashi kumar</span> <br/>
                      <span className="user_role">Admin</span>
                    </div>
                </div>
            </div>
          </Hidden>

          <Hidden lgUp>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                onMobielViewOpen()
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={(e) => {
                handleMobileMenuClick(e)
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Hidden>
          {mobileMenuItems}
        </Toolbar>
      </AppBar>

    </>
  )
}

export default TopBar
