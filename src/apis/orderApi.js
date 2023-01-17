import axiosClient from "./axiosClient";

const orderApi = {
  addOrder: (order) => {
    const url = "/order/add";
    return axiosClient.post(url, order, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getAll: (params) => {
    const url = "/order/all";
    return axiosClient.get(url, { params });
  },
};

export default orderApi;
