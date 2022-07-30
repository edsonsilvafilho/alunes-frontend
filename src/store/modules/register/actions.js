import * as types from '../types';

export function RegisterRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}
export function RegisterFailure(payload) {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
}
export function RegisterUpdateSuccess(payload) {
  return {
    type: types.REGISTER_UPDATE_SUCCESS,
    payload,
  };
}
export function RegisterCreateSuccess(payload) {
  return {
    type: types.REGISTER_CREATE_SUCCESS,
    payload,
  };
}
