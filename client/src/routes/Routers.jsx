import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/Loader/Loading";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/User/Login"));
const Error = lazy(() => import("../pages/Error"));
const CreateEvent = lazy(() => import("../pages/CreateEvent"));

const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const ProtectedRouteAdmin = lazy(() => import("./ProtectedRouteAdmin"));
const VerifiedRoute = lazy(() => import("./VerifiedRoute"));

const Forgot = lazy(() => import("../pages/Admin/Forgot"));
const ALogin = lazy(() => import("../pages/Admin/ALogin"));
const Signup = lazy(() => import("../pages/Admin/Signup"));
const Verify = lazy(() => import("../pages/Admin/Verify"));
const Change = lazy(() => import("../pages/Admin/Change"));
const HomeHandler = lazy(() => import("../pages/HomeHandler"));
const Panel = lazy(() => import("../pages/Panel"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));

const Routers = () => {
  return (
    <Routes>
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
        path="/panel"
        element={
          <Suspense fallback={<Loading />}>
            <ProtectedRoute>
              <Panel />
            </ProtectedRoute>
          </Suspense>
        }
      />
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
        path="/admin/:id"
        element={
          <Suspense fallback={<Loading />}>
            <ProtectedRouteAdmin>
              <Dashboard />
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
      {/* #Create Event  */}
      <Route
        path="/admin/create"
        element={
          <Suspense fallback={<Loading />}>
            <ProtectedRouteAdmin>
              <CreateEvent />
            </ProtectedRouteAdmin>
          </Suspense>
        }
      />

      {/* user   */}
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
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
