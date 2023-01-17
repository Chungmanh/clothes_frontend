import axios from "axios";
// import queryString from "query-string";
// import firebase from "firebase";

const getToken = async () => {
  return localStorage.getItem("accessToken") || "";
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    // Accept: "applicaiton/json",
    // "content-type": "application/json",
    "content-type": "multipart/form-data",
  },
  // paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
