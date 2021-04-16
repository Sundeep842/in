import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { invokeAPIRequest } from './Request'
import { ROLE_ACCESS_CHECK } from './inv/constants/Constants'
import ErrorBoundary from './inv/util/error/ErrorBoundary'
import { useNavigate } from 'react-router-dom'
import { Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
    const navigate = useNavigate()
    // check authentication of the component
    const auth = useSelector(state => state._loginSlice.user.securityToken)
    const roles = useSelector(state => state._loginSlice.user.roles)
    const { path } = props

    if (!auth) { // if no token redirect to login one more time
    //  navigate("/", { replace: true })
    }

    useEffect(async () => { // get component access check  with current user role
        try {
          /*  const pathCanAccess = await invokeAPIRequest(ROLE_ACCESS_CHECK, {
                pathName: path,
                roles: roles
            }, true)
            if (!pathCanAccess) { // current component path is not accessible by the user .. DEV :: Redirect to login page -- (need discussion on this point)
                //navigate("/", { replace: true })
                console.log('pathCanAccess')
            }*/
        } catch (error) {
           navigate("/", { replace: true })
           console.log(error)
        }

    }, [])

    return (
        <ErrorBoundary>
            <Route
                {...props}
                element={<Component />}
            />
        </ErrorBoundary>
    );

}
export default PrivateRoute
