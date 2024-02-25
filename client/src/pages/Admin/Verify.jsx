/* eslint-disable no-unused-vars */
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import axios from "axios";
import check from "../../assets/images/check.png";
const Verify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      // console.log(param.id)
      try {
        const url = `${BASE_URL}/auth/admin/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div>
      {validUrl ? (
        <div className="flex flex-col justify-center items-center h-[600px]">
          <img className="max-w-[100px] rounded-xl" src={check} />
          <h1 className="text-xl text-gray-300">Email Verified Succesfully</h1>
          <Link to="/admin/login">
            <button className="bg-gray-300 mt-[100px] w-[100px] rounded-xl hover:text-white hover:bg-black">
              {" "}
              Login{" "}
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>404 Not Found</h1>
        </div>
      )}
    </div>
  );
};

export default Verify;
