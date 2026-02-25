import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Session expired");
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
