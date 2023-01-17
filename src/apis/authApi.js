import axiosClient from "./axiosClient";

const authApi = {
  register: (user) => {
    const url = "/auth/register";
    return axiosClient.post(url, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  login: (user) => {
    const url = "/auth/login";
    return axiosClient.post(url, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  logout: (params) => {
    const url = "/auth/logout";
    return axiosClient.post(
      url,
      { params },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};

export default authApi;
