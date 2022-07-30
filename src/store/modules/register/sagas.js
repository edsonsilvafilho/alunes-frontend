import { call, put, all, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import * as actions from './actions';
import { LoginFailure } from '../auth/actions';
import axios from '../../../services/axios';
import * as types from '../types';

function* registerRequest({ payload }) {
  const { id, nome, email, password, rePassword, redirectPath, navigate } =
    payload;

  let formErrors = false;
  if (nome.length < 3 || nome.length > 255) {
    formErrors = true;
    toast.error('Nome deve ter entre 3 e 255 caracteres');
  }
  if (!id) {
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('A senha precisa ter entre 6 e 50 caracteres.');
    }

    if (!password || password !== rePassword) {
      formErrors = true;
      toast.error('As senhas devem ser iguais');
    }
  }
  if (!isEmail(email)) {
    formErrors = true;
    toast.error('Email inválido');
  }

  if (formErrors) return;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        nome,
        email,
        password: password || undefined,
      });
      yield put(actions.RegisterUpdateSuccess({ nome, email, password, id }));
      toast.success('Conta alterada com sucesso.');
    } else {
      yield call(axios.post, '/users', {
        nome,
        email,
        password,
      });
      yield put(actions.RegisterCreateSuccess());
      toast.success('Conta criada com sucesso.');
      navigate(redirectPath, { replace: true });
    }
  } catch (err) {
    const status = get(err, 'response.status', 0);
    const errors = get(err, 'response.data.errors', []);
    if (status === 400) {
      errors.map((error) => toast.error(error));
    } else if (status === 401) {
      toast.error('Você precisa efetuar o login novamente');
      yield put(LoginFailure());
      navigate('/login', { replace: true });
    } else {
      console.log(err);
    }

    yield put(actions.RegisterFailure());
  }
}

export default all([takeLatest(types.REGISTER_REQUEST, registerRequest)]);
