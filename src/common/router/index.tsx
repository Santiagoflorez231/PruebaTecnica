import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ScrollToTop from '@/common/ui/atoms/ScrollToTop';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Home = lazy(() => import('@/modules/home/Home'));
const Products = lazy(() => import('@/modules/products/Products'));
const Login = lazy(() => import('@/modules/auth/Login'));
const NotFound = lazy(() => import('@/modules/error/NotFound'));

const ModernLayout = lazy(() => import('@/layouts/ModernLayout'));

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ModernLayout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<Products />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;