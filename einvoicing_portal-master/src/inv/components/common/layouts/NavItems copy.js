import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { invokeAPIRequest } from '../../../Request'
import { GET_NAVIGATION_ITEMS } from '../../constants/Constants'
import { ADD_NAVIGATION_LINKS } from '../../actions/Action'
import {
  List,
  ListItem,
  Collapse
} from '@material-ui/core'
import { NavLink as NavigationLink } from 'react-router-dom'
import './css/layout.css'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const NavItems = () => {

  const navigationItems = useSelector(state => state.navigation)
  const roles = useSelector(state => state.user.roles)
  const dispatch = useDispatch()
  const [navItems, setNavItems] = useState([])
  const [itemIndex, setItemIndex] = useState(-1)

  useEffect(() => {
    const fetchNavItems = async () => {
      if (Object.keys(navigationItems).length === 0) { // there are no navigation items
        const navItems = await invokeAPIRequest(GET_NAVIGATION_ITEMS, {
          roles: roles.join(",")
        }, true);
        if (!navItems.hasError) { //save navigation items in Redux store
          dispatch({
            type: ADD_NAVIGATION_LINKS,
            payload: navItems.results
          })
          setNavItems(navItems.results)
        }
      } else {
        setNavItems(navigationItems)
      }
    }
    fetchNavItems()
  }, [])

  return (
    <div className="navItems">
      { navItems && (
        <List>
          {navItems.map((navItem) => navItem.childs && navItem.childs.length > 0 ? <ExpandableItem navItem={navItem} setItemIndex={setItemIndex} itemIndex={itemIndex} /> : <NonExpandableItem navItem={navItem} setItemIndex={setItemIndex} itemIndex={itemIndex} />)}
        </List>
      )}
    </div>
  )
}

const Icon = (props) => {
  const { icon } = props
  let iconName = icon.replace(/Icon$/, '')
  let resolved = require(`@material-ui/icons/${iconName}`).default
  if (resolved)
    return React.createElement(resolved);
}


const NonExpandableItem = (props) => {
  const { navItem, itemIndex, setItemIndex } = props

  return (
    <ListItem
      button
      key={navItem.itemId}
      component={NavigationLink}
      to={navItem.itemRoute}
      className="expandableItem"
      onClick={(e) => {
        setItemIndex(navItem.itemId)
      }}
      selected={navItem.itemId === itemIndex}
    >
      <div className="sidebar_nav">
        <div className="sidebar_item"><Icon icon={navItem.itemIcon} /></div>
        <div>{navItem.itemName}</div>
      </div>
    </ListItem>
  )
}
const ExpandableItem = (props) => {

  const { navItem, itemIndex, setItemIndex } = props
  const [isExpanded, setExpanded] = useState(true)


  return (
    <>
      <ListItem
        button
        key={navItem.itemId}
        onClick={(e) => {
          setExpanded(!isExpanded)
          setItemIndex(navItem.itemId)
        }}
        className="expandableItem"
        selected={navItem.itemId === itemIndex}
      >
        <div className="sidebar_nav">
          <div className="sidebar_item"><Icon icon={navItem.itemIcon} /></div>
          <div>{navItem.itemName}</div>
          <div style={{ marginLeft: '10px' }}>{isExpanded ? <ExpandLess /> : <ExpandMore />}</div>
        </div>
      </ListItem>
      <div>
        {navItem.childs.map((childItem) => (
          <NonExpandableItem
            key={childItem.itemId}
            navItem={childItem}
          />
        ))}
      </div>

    </>
  )
}

export default NavItems
