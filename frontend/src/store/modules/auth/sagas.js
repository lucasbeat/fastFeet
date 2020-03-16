import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';

import { signInSucces } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  yield put(signInSucces(token, user));

  history.push('/deliveries');

  console.tron.log(response);
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
