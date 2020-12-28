import axios from 'axios';
import { actions, key as AUTH_KEY } from 'ducks/authentication';
import { isArray, isString } from 'lodash';
import { API_TIMEOUT, API_URL, NO_VERIFICATION_NEEDED } from 'services/index';

export default function configureAxios(store) {
  axios.defaults.baseURL = API_URL;
  axios.defaults.timeout = API_TIMEOUT;

  // add a request interceptor to all the axios requests
  // that are going to be made in the site. The purpose
  // of this interceptor is to verify if the access token
  // is still valid and renew it if needed and possible
  axios.interceptors.request.use(
    // eslint-disable-next-line func-names
    (config) => {
      // // if there's no verification needed, just exit immediately
      if (NO_VERIFICATION_NEEDED === config.params) {
        return config;
      }

      // since there's no `connect` HOC, this is how we
      // access the store (or reducer)
      const { accessToken } = store?.getState()?.[AUTH_KEY];

      // Get access token from store for every api request
      // eslint-disable-next-line no-param-reassign
      config.headers.authorization = accessToken ? `Bearer ${accessToken}` : null;

      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(null, (error) => {
    const modifiedError = { ...error };

    if (error.isAxiosError) {
      if (
        ['Could not validate credentials', 'Not authenticated'].includes(
          error?.response?.data?.detail,
        )
      ) {
        store.dispatch(actions.logout({ sessionTimedOut: true }));
      } else if (error.response.data?.detail && isString(error.response.data?.detail)) {
        modifiedError.errors = [error.response.data.detail];
      } else if (error.response.data?.detail && isArray(error.response.data?.detail)) {
        modifiedError.errors = error.response.data.detail?.map(({ msg }) => msg);
      } else if (error.response.data?.details && isArray(error.response.data?.details)) {
        modifiedError.errors = error.response.data.details?.map(({ msg }) => msg);
      }
    }

    return Promise.reject(modifiedError);
  });
}
