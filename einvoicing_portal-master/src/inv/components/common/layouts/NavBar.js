import React, { Fragment } from 'react'
import {
    Drawer,
    Hidden,
    makeStyles
} from '@material-ui/core'
import NavItems from './NavItems';
import './layout.css'

const useStyles = makeStyles((theme) => ({
    root: {
    },
    desktop_drawer: {
        //width: 10,
        top: 64,
        height: 'calc(100% - 64px)'
    },
    drawer_list_item: {
        display: 'flex',
    },
    active: {
        color: theme.palette.primary.main,
        '& $title': {
            fontWeight: theme.typography.fontWeight
        },
    },
    button: {
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightMedium,
        justifyContent: 'flex-start',
        letterSpacing: 0,
        padding: '10px 8px',
        textTransform: 'none',
        width: '100%'
    },
    title: {
        marginRight: 'auto'
    }
}));

const NavBar = (props) => {
    const { isMobileView, closeMobileView } = props
    const classes = useStyles();

    return (
        <Fragment>
            <Hidden lgUp
            >
                <Drawer
                    open={isMobileView}
                    anchor='left'
                    variant="temporary"
                    classes={{ paper: classes.mobileDrawer }}
                    onClose={() => {
                        closeMobileView();
                    }}
                    className="navbar_side_bar"
                >
                    <NavItems />

                </Drawer>
            </Hidden>

            <Hidden mdDown >
                <Drawer
                    open
                    anchor='left'
                    classes={{ paper: classes.desktop_drawer }}
                    variant="persistent"
                    className="navbar_side_bar"
                >
                    <NavItems />
                </Drawer>
            </Hidden>
        </Fragment>
    )
}

export default NavBar
