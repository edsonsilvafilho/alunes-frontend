import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, redirectPath }) {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!isLoggedIn) {
    toast(`É necessário estar logado para acessar essa página`, {
      type: toast.TYPE.INFO,
      autoClose: 1000,
    });
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }
  return children;
}

PrivateRoute.defaultProps = {
  redirectPath: '',
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  redirectPath: PropTypes.string,
};
