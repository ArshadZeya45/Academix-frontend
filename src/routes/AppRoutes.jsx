import { Route, Routes } from "react-router-dom";
import Home from "../features/home/pages/Home";
import Signup from "../features/auth/pages/Signup";
import Login from "../features/auth/pages/Login";
import PublicLayout from "../components/layout/PublicLayout";
import AuthLayout from "../components/layout/AuthLayout";
import PublicRoutes from "./PublicRoutes";
import CompleteSignup from "../features/auth/pages/CompleteSignup";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route
          path="/auth/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
        <Route
          path="/auth/verify-email"
          element={
            <PublicRoutes>
              <CompleteSignup />
            </PublicRoutes>
          }
        />
        <Route
          path="/auth/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/auth/forgot-password"
          element={
            <PublicRoutes>
              <ForgotPassword />
            </PublicRoutes>
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <PublicRoutes>
              <ResetPassword />
            </PublicRoutes>
          }
        />
      </Route>

      <Route path="/admin-dashboard" />
    </Routes>
  );
};
export default AppRoutes;
