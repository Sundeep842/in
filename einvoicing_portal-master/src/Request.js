
import { TOKEN_REFRESH_API_END_URL } from './inv/constants/Constants'
import { REFRESH_TOKEN } from './inv/actions/Action'
import axios from 'axios'
import { store } from './inv/store/configureStore'

const AXIOS_API = axios.create();


/**
 * Intercept the api response and check the Authentication 401 / 403 , get new api token
 */
AXIOS_API.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return new Promise((resolve, reject) => {
    const status = error.response.status;
    if (status !== 401 || status !== 403) { // it's not authorization issue lets not hanlde anything
      reject(error);
    }
    const originalRequest = error.config;
    if ((status === 401  || status === 403) && !originalRequest._retry) { // need to update token with this request
      originalRequest._retry = true;
      const user = store.getState().user;
      refreshToken(user.securityToken)
        .then((response) => {
          user.securityToken = response.results.securityToken
          store.dispatch({ // update the latest security token
            type: REFRESH_TOKEN,
            payload: user
          })
          const config = error.config;
          config.headers['Authorization'] = `Bearer ${response.results.securityToken}`;
          resolve(axios.request(config));
        })
        .catch((error) => {
          reject(error);
        })
    }
  });
});

/**
 * Get the new JWT Token by passing current securitytoken
 * @param {string} existing securitytoken
 */
const refreshToken = async (_securityToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const params = {
    securityToken: _securityToken
  }

  return new Promise((resolve, reject) => {
    AXIOS_API
      .post(TOKEN_REFRESH_API_END_URL, params, options)
      .then((response) => {
        var data = response.data;
        if (data.hasError)
          reject(data)
        else
          resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


/**
 * a common api endpoint request
 * @param {String} url - endpoint URL
 * @param {Object} params - contains object params
 * @param {Boolean} needAuthorization - true / false
 */
export const invokeAPIRequest = async (url, params, needAuthorization, method) => {

  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  if (needAuthorization === true) {
    //const securityToken = useSelector(state => state._loginSlice.user.securityToken)
    const securityToken = store.getState()._loginSlice.user.securityToken
    options.headers["Authorization"] = "Bearer " + securityToken
    options.headers["Access-Control-Allow-Origin"] = "*"
  }
  try {
   
    let response;

    switch (method) {
      case "get": {
        response = await AXIOS_API.get(url, params, options)
        break;
      }
      case "put": {
        response = await AXIOS_API.put(url, params, options)
        break;
      }
      default: {
        response = await AXIOS_API.post(url, params, options)
        break;
      }
    }
    if (response.data.hasError === true)
      throw response.data.errors
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * a common api endpoint request
 * @param {String} url - endpoint URL
 * @param {Object} params - contains object params
 * @param {Boolean} needAuthorization - true / false
 */
export const invokeAPIGetRequest = async (url, needAuthorization) => {

  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  if (needAuthorization === true) {
    const securityToken = store.getState()._loginSlice.user.securityToken
    options.headers["Authorization"] = "Bearer " + securityToken
    options.headers["Access-Control-Allow-Origin"] = "*"
  }
  try {
    let response = await AXIOS_API.get(url, options)
    if (response.data.hasError === true)
      throw response.data.error
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * a common api endpoint request
 * @param {String} url - endpoint URL
 * @param {Object} params - contains object params
 * @param {Boolean} needAuthorization - true / false
 */
export const invokeGetRequest = async (url, params, needAuthorization) => {

  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  if (needAuthorization === true) {
    const securityToken = store.getState()._loginSlice.user.securityToken
    options.headers["Authorization"] = "Bearer " + securityToken
    options.headers["Access-Control-Allow-Origin"] = "*"
  }
  try {
    let response = await AXIOS_API.get(url, params, options)
    if (response.data.hasError === true)
      throw response.data.error
    return response.data
  } catch (error) {
    throw error
  }
}
