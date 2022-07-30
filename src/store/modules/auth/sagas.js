import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import * as actions from './actions';
import axios from '../../../services/axios';
import * as types from '../types';

function* LoginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.LoginSuccess({ ...response.data }));
    toast.success('Usuário logado com sucesso.');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    payload.navigate(payload.prevPath, { replace: true });
  } catch (err) {
    toast.error('Usuário ou senha inválidos');
    yield put(actions.LoginFailure());
  }
}

function LogoutRequest({ payload }) {
  axios.defaults.headers.Authorization = '';
  toast.success('Usuário deslogado com sucesso.', {
    autoClose: 600,
    pauseOnHover: false,
    position: 'bottom-center',
  });
  payload.navigate('/', { replace: true });
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, LoginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.LOGOUT_REQUEST, LogoutRequest),
]);
