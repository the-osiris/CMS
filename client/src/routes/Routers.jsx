import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/Loader/Loading";

const Home = lazy(() => import("../pages/Admin/Home"));
const Login = lazy(() => import("../pages/User/Login"));
const Error = lazy(() => import("../pages/Error"));

const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const ProtectedRouteAdmin = lazy(() => import("./ProtectedRouteAdmin"));
const VerifiedRoute = lazy(() => import("./VerifiedRoute"));

const Forgot = lazy(() => import("../pages/Admin/Forgot"));
const ALogin = lazy(() => import("../pages/Admin/ALogin"));
const Signup = lazy(() => import("../pages/Admin/Signup"));
const Verify = lazy(() => import("../pages/Admin/Verify"));
const Change = lazy(() => import("../pages/Admin/Change"));
const HomeHandler = lazy(() => import("../pages/User/HomeHandler"));

const Routers = () => {
  return (
    <Routes>
      {/* admin   */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<Loading />}>
            <ProtectedRouteAdmin>
              <Home />
            </ProtectedRouteAdmin>
          </Suspense>
        }
      />
      <Route
        path="/admin/forgot-password"
        element={
          <Suspense fallback={<Loading />}>
            <Forgot />
          </Suspense>
        }
      />
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<Loading />}>
            <ALogin />
          </Suspense>
        }
      />
      <Route
        path="/admin/signup"
        element={
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        }
      />

      {/* general  */}
      <Route
        path="/user/:id/verify/:token"
        element={
          <Suspense fallback={<Loading />}>
            <VerifiedRoute>
              <Verify />
            </VerifiedRoute>
          </Suspense>
        }
      />
      <Route
        path="/user/:id/forgot/:token"
        element={
          <Suspense fallback={<Loading />}>
            <VerifiedRoute>
              <Change />
            </VerifiedRoute>
          </Suspense>
        }
      />

      {/* user   */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <HomeHandler />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />

      {/* error  */}
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <Error />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routers;
