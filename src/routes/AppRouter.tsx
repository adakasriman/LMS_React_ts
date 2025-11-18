import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Layouts
import WithAuthLayout from '@layouts/WithAuthLayout';
import WithoutAuthLayout from '@layouts/WithoutAuthLayout';

// Lazy-loaded pages
const DashboardPage = lazy(() => import('@features/dashboard/pages/dashboard'));
const LoginPage = lazy(() => import('@features/auth/pages/LoginPage/LoginPage'));
const ForgotPasswordPage = lazy(
  () => import('@features/auth/pages/ForgotPasswordPage/ForgotPasswordPage'),
);
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));
const AllLoans = lazy(() => import('@features/all_loans/pages/AllLoans'));
const CommonComponents = lazy(() => import('@features/common_components/pages/CommonComponents'));

// Optional: a small loader UI
const Loader: React.FC = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.2rem',
      fontWeight: 500,
    }}
  >
    Loading...
  </div>
);

const AppRouter: React.FC = () => {
  return (
    // Suspense wraps lazy-loaded routes
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route element={<WithoutAuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password/:type" element={<ForgotPasswordPage />} />
            {/* forgot/ reset */}
          </Route>
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<WithAuthLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/all-loans" element={<AllLoans />} />
            <Route path="/alm/assets" element={<AllLoans />} />
            <Route path="/common-components" element={<CommonComponents />} />
            <Route path="/forgot-password/:type" element={<ForgotPasswordPage />} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
