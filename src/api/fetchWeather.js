import { Cookies } from "react-cookie";
import weatherAPI from "./config";

export const fetchWeather = (location) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  };
  return new Promise((resolve, reject) => {
    weatherAPI
      .get(`/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}`, config)
      .then((res) => {
        resolve(res);
        if (res.status !== 200) {
          throw new Error("Something Went Wrong!");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
