import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Alune from '../pages/Alune';
import Alunes from '../pages/Alunes';
import Register from '../pages/Register';
import Fotos from '../pages/Fotos';
import Page404 from '../pages/Page404';
import PrivateRoute from './PrivateRoute';

export default function myRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Alunes />} />
      <Route
        exact
        path="/alune"
        element={
          <PrivateRoute redirectPath="/login">
            <Alune />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/alune/:id/edit"
        element={
          <PrivateRoute redirectPath="/login">
            <Alune />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/fotos/:id"
        element={
          <PrivateRoute redirectPath="/login">
            <Fotos />
          </PrivateRoute>
        }
      />
      <Route exact path="/login" element={<Login />} />

      <Route exact path="/register" element={<Register />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
