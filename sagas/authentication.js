import { types, actions } from 'ducks/authentication';
import { call, takeLatest, put } from 'redux-saga/effects';
import { service } from 'services/authentication';
import { service as meService } from 'services/me';
import { types as meTypes, actions as meActions } from 'ducks/me';
import { request } from 'shared/types';

/* WORKERS */
function* login({ payload }) {
  const { callback, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.login, data);
    yield put(
      actions.save({
        type: types.LOGIN,
        accessToken: response.data.access_token,
        tokenType: response.data.token_type,
      }),
    );

    const meResponse = yield call(meService.me);
    yield put(
      meActions.save({
        type: meTypes.GET_ME,
        me: meResponse.data,
      }),
    );

    callback({ status: request.SUCCESS, response: response.data });
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const loginWatcherSaga = function* loginWatcherSaga() {
  yield takeLatest(types.LOGIN, login);
};

export default [loginWatcherSaga()];
