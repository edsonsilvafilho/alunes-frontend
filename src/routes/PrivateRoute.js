import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children, redirectPath }) {
  const isLogged = false;
  if (!isLogged) {
    return <Navigate to={redirectPath} replace />;
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
