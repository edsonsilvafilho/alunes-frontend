import React from 'react';
import { FaHome, FaUserAlt, FaSignInAlt, FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutRequest } from '../../store/modules/auth/actions';

import { Nav } from './styled';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(LogoutRequest({ navigate }));
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {!isLoggedIn ? (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      ) : (
        <Link to="/logout" onClick={handleLogout}>
          <FaPowerOff size={24} />
        </Link>
      )}
    </Nav>
  );
}
