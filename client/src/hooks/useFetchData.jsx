import { useEffect, useState } from "react";
// import { token } from "../config";

const useFetchData = (url) => {
  // console.log(url);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // console.log(token, "token hai ye");
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }
        // console.log(result, "result");
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useFetchData;
