import { actions, types } from 'ducks/authentication';
import { actions as meActions, types as meTypes } from 'ducks/me';
import { call, put, takeLatest } from 'redux-saga/effects';
import { service } from 'services/authentication';
import { service as meService } from 'services/me';
import { request } from 'shared/types';

/* WORKERS */
function* login({ payload }) {
  const { callback, role, ...data } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.login, data);
    const meResponse = yield call(meService.me2, response.data.access_token);

    if (meResponse.data.role === role) {
      yield put(
        actions.save({
          type: types.LOGIN,
          accessToken: response.data.access_token,
          tokenType: response.data.token_type,
        }),
      );

      yield put(
        meActions.save({
          type: meTypes.GET_ME,
          me: meResponse.data,
        }),
      );

      callback({ status: request.SUCCESS, response: response.data });
    } else {
      yield put(actions.logout());

      callback({
        status: request.ERROR,
        errors: ['It seems that you selected an incorrect role to login.'],
      });
    }
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const loginWatcherSaga = function* loginWatcherSaga() {
  yield takeLatest(types.LOGIN, login);
};

export default [loginWatcherSaga()];
