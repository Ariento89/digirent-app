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

function* loginGoogle({ payload }) {
  const { callback, query } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.googleAuthorization, query);
    const meResponse = yield call(meService.me2, response.data.access_token);

    yield put(
      actions.save({
        type: types.LOGIN_GOOGLE,
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
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* loginFacebook({ payload }) {
  const { callback, query } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.facebookAuthorization, query);
    const meResponse = yield call(meService.me2, response.data.access_token);

    yield put(
      actions.save({
        type: types.LOGIN_FACEBOOK,
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
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

function* loginApple({ payload }) {
  const { callback, query } = payload;
  callback({ status: request.REQUESTING });

  try {
    const response = yield call(service.appleAuthorization, query);
    const meResponse = yield call(meService.me2, response.data.access_token);

    yield put(
      actions.save({
        type: types.LOGIN_APPLE,
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
  } catch (e) {
    callback({ status: request.ERROR, errors: e.errors });
  }
}

/* WATCHERS */
const loginWatcherSaga = function* loginWatcherSaga() {
  yield takeLatest(types.LOGIN, login);
};

const loginGoogleWatcherSaga = function* loginGoogleWatcherSaga() {
  yield takeLatest(types.LOGIN_GOOGLE, loginGoogle)
}

const loginFacebookWatcherSaga = function* loginFacebookWatcherSaga() {
  yield takeLatest(types.LOGIN_FACEBOOK, loginFacebook)
}

const loginAppleWatcherSaga = function* loginAppleWatcherSaga() {
  yield takeLatest(types.LOGIN_APPLE, loginApple)
}

export default [loginWatcherSaga(), loginGoogleWatcherSaga(), loginFacebookWatcherSaga(), loginAppleWatcherSaga()];
