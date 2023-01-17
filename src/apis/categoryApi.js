import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: (params) => {
    const url = "/category/all";
    return axiosClient.get(url, { params });
  },

  addCategory: (category) => {
    const url = "/category/add";
    return axiosClient.post(url, category, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  editCategory: (category) => {
    const url = "/category/edit";
    return axiosClient.put(url, category, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  deleteCategory: (id) => {
    const url = `/category/delete/${id}`;
    return axiosClient.delete(url);
  },

  get: (id) => {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },

  search: (text) => {
    const url = "/category";
    return axiosClient.get(
      url,
      { params: { search: text } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  searchKey: (text) => {
    const url = "/category/search-key";
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

export default categoryApi;
