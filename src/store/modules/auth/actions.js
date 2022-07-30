import * as types from '../types';

export function LoginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}
export function LoginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}
export function LoginFailure(payload) {
  return {
    type: types.LOGIN_FAILTURE,
    payload,
  };
}

export function LogoutRequest(payload) {
  return {
    type: types.LOGOUT_REQUEST,
    payload,
  };
}
