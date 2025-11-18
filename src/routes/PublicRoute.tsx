// src/routes/PublicRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppSelector } from '@app/hooks';
import { useAppDispatch } from '@app/hooks';
import { logoutUser } from '@features/auth/authSlice';
import { persistor } from '@app/store';

const PublicRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state: any) => state.auth?.isLoggedIn);
  const token = Cookies.get('token');
  if (!token) {
    Cookies.remove('token');
    dispatch(logoutUser());
    persistor.purge();
  }

  // If already logged in or token exists, redirect to dashboard
  if (isLoggedIn || token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access to login/register pages
  return <Outlet />;
};

export default PublicRoute;
