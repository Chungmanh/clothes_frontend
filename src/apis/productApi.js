import axiosClient from "./axiosClient";
const FormData = require("form-data");

const productApi = {
  getAll: (params) => {
    const url = "/api/product";
    return axiosClient.get(url, { params });
  },

  getProductByPage: (queryParam, category) => {
    const url = `/api/home${category}`;
    // console.log("queryParam: ", queryParam);
    return axiosClient.get(url, { params: queryParam });
  },

  // getProductByFilter: (query) => {
  //   const url = "/api/";
  //   return axiosClient.get(url, { params: { page: page } });
  // },

  uploadImage: async (image) => {
    const url = "/api/upload";
    const form = new FormData();
    form.append("image", image);
    return await axiosClient.postForm(url, form);
  },

  addProduct: (product) => {
    const url = "/api/add";
    return axiosClient.post(url, product);
  },

  editProduct: (product) => {
    const url = "/api/edit";
    return axiosClient.put(url, product);
  },

  deleteProduct: (id) => {
    const url = `/api/delete/${id}`;
    return axiosClient.delete(url);
  },

  get: (id) => {
    const url = `/api/product/${id}`;
    return axiosClient.get(url);
  },

  search: (text) => {
    const url = "/api/search";
    return axiosClient.get(
      url,
      { params: { text: text } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  searchKey: (text) => {
    const url = "/api/search-key";
    return axiosClient.get(
      url,
      { params: { text: text } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};

export default productApi;
