import { createStore , compose} from 'redux'
import Reducer from './Reducer'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveStateToLocalStorage = (state) => { 
    try { 
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state',serializedState)
    } catch (error) {
        console.error(error)
    }
}

const loadStateFromLocalStorage = () => { 
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null)
        return undefined;
    
        return JSON.parse(serializedState)
    } catch (error) { 
        console.error(error)
    }
}

const persistedReducer = loadStateFromLocalStorage()

const Store = createStore(Reducer, persistedReducer  ,storeEnhancers());

Store.subscribe(() => saveStateToLocalStorage(Store.getState()))

export default Store