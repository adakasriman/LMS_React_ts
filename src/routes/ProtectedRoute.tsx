// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { logoutUser } from '@features/auth/authSlice';
import { persistor } from '@app/store';

const ProtectedRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state: any) => state.auth?.isLoggedIn);
  const token = Cookies.get('token');
  const hasAccess = isLoggedIn || Boolean(token);
  if (!token) {
    Cookies.remove('token');
    dispatch(logoutUser());
    persistor.purge();
  }
  return hasAccess ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
