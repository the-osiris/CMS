import React, { useState, useContext } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config.js";
import { authContext } from "../../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/handler/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      // console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }

      // console.log("result token ", result.token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
        },
      });

      // console.log(result, "login data");

      setLoading(false);
      toast.success(result.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-500">
        <div className="bg-white w-fit mx-auto pb-9 px-4 rounded-xl">
          <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your Handler account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={submitHandler} className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    type="text"
                    autoComplete="username"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <Link
                      className="font-semibold text-blue-500 hover:text-blue-700"
                      to="/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
                </button>
              </div>
            </form>

            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an Admin account?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-blue-500 hover:text-blue-700"
              >
                Sign up
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
