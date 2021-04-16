import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { invokeAPIGetRequest, invokeAPIRequest } from '../../../../Request'
import { GET_NAVIGATION_ITEMS } from '../../../constants/Constants'
import { ADD_NAVIGATION_LINKS } from '../../../actions/Action'
import PerfectScrollbar from 'react-perfect-scrollbar'
import './layout.css'
import {
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { NavLink as NavigationLink } from 'react-router-dom'
import images from '../../../images/icons.json'
import {
  selectMenuToggle
} from './slice/selectors'


const NavItems = () => {
  const navigationItems = useSelector(state => state.navigation)
  const roles = useSelector(state => state._loginSlice.user.roles)
  const dispatch = useDispatch()
  const [navItems, setNavItems] = useState([])
  const [itemIndex, setItemIndex] = useState(-1)
  const toggleMenu = useSelector(selectMenuToggle)
  //const toggleMenu = false
 
  useEffect(() => {
    const fetchNavItems = async () => {
      let request = { "roles": [] };
      request.roles.push(roles.join(","))
      if (navigationItems === undefined || Object.keys(navigationItems).length === 0) { // there are no navigation items
        const _navItems = await invokeAPIRequest(GET_NAVIGATION_ITEMS, request, true);
        if (!_navItems.hasError) { //save navigation items in Redux store
          dispatch({
            type: ADD_NAVIGATION_LINKS,
            payload: _navItems.results
          })
          setNavItems(_navItems.results)
        }
      } else {
        setNavItems(navigationItems)
      }
    }
    fetchNavItems()
  }, [])

  const canHighlight = (navItem) => {
    if (navItem.childs.length > 0) {
      navItem.childs.map((_navItem) => {
        return  _navItem.itemId === itemIndex
      })
    }
  }

  return (
    <div className="sidebar">
      <div className={toggleMenu ? `main_menu dynamicMenu` : `main_menu`}>
        <PerfectScrollbar>
          <List className="list_main nav_item" component="ul">
            {navItems.map((navItem) => (
              <>
                {navItem.childs.length > 0 ? (
                  <ListItem
                    button
                    key={navItem.itemId}
                    onClick={() => { setItemIndex(navItem.itemId) }}
                    className="list_item"
                    component="a"
                    selected={canHighlight(navItem)}
                    activeClassName="Mui-selected active"
                  >
                    <SVGIcon icon={navItem.itemIcon} />
                    <ListItemText>{navItem.itemName}</ListItemText>
                  </ListItem>
                ) : (
                    <ListItem
                      button
                      key={navItem.itemId}
                      onClick={() => { setItemIndex(navItem.itemId) }}
                      component={NavigationLink}
                      to={navItem.itemRoute}
                      selected={navItem.itemId === itemIndex}
                      className="list_item"
                      activeClassName="Mui-selected active"
                    >
                      <SVGIcon icon={navItem.itemIcon} />
                      <ListItemText>{navItem.itemName}</ListItemText>
                    </ListItem>
                  )}
              </>
            ))}
          </List>
        </PerfectScrollbar>
      </div>
      {
        navItems.map((navItem) => (
          <PerfectScrollbar>
            <div id="sub_items" className={navItem.childs.length > 0 && itemIndex === navItem.itemId ? "sub_menu show_item" : "sub_menu hide_item"} >
              <List className="list_main" component="ul">
                {navItem.childs.map((_navItem) => (
                  <ListItem
                    button
                    key={_navItem.itemId}
                    component={NavigationLink}
                    to={_navItem.itemRoute}
                    className="nav_item sub_nav_item sub_menu_item"
                    onClick={() => {
                      setItemIndex(_navItem.itemId)
                    }}
                    activeClassName="Mui-selected active"
                  >
                    <SVGIcon icon={_navItem.itemIcon} />
                    <ListItemText>{_navItem.itemName}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </div>
          </PerfectScrollbar>
        ))
      }
    </div >
  )
}

const SVGIcon = (props) => {
  const { icon } = props
  return <span dangerouslySetInnerHTML={{ __html: images[icon] }} /> // return svg format of icon
}

export default NavItems
