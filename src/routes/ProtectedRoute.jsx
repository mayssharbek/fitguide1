import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 1. إذا ما في توكن
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2. إذا المستخدم غير verified
  if (user && user.email_verified_at === null) {
    return <Navigate to="/auth/emailverification" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;