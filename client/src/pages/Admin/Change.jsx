import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { BASE_URL } from "../../config.js";
import HashLoader from "react-spinners/HashLoader";
const Change = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  // const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/auth/admin/${param.id}/change/${param.token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      toast.success(result.message);
      navigate("/admin/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="w-full md:h-[500px] flex flex-col justify-around items-center">
      <h1 className="text-3xl text-headingColor m-10">Change Password</h1>
      <form className="w-[40%] bg-white" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-textColor">New Password</label>
          <input
            className="px-2 border-[1px] border-textColor"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-textColor">Rewrite New Password</label>
          <input
            className="px-2 border-[1px] border-textColor"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Change;
