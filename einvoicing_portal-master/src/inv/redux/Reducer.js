import {
    LOGIN_ACTION,
    LOGOUT_ACTION,
    REFRESH_TOKEN,
    ADD_NAVIGATION_LINKS,
    CHANGE_THEME
} from '../actions/Action'

const initialState = {
    user: {
        userId: null,
        securityToken: null,
        partnerId: null,
        partnerName: null,
        roles: []
    },
    navigation: {},
    theme: {}
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            return {
                ...state,
                user: action.payload,
            }
        case LOGOUT_ACTION:
            return initialState

        case REFRESH_TOKEN:
            return {
                ...state,
                user: action.payload,
            }
        case ADD_NAVIGATION_LINKS:
            return {
                ...state,
                navigation: action.payload,
            }

        case CHANGE_THEME:
            return {
                ...state,
                theme: action.payload,
            }

        default:
            return state;
    }
};

export default Reducer;
