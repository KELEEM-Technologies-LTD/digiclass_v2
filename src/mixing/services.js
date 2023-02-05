import axios from "axios";
import localforage from "localforage";

export const Services = async () => {

  let token = '';

  try {
    token = await localforage.getItem('token');
  } catch (err) {
    token = ''
  }


  return {
    post: async (route, data) => {
      // const token = getToken();
      var config = {
        method: "post",
        url: `${route}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        data: data || {},
      };
      const res = await axios(config);
      return res;
    },
    get: async (route) => {
      //include should be a string of values separated by commas
      var config = {
        method: "get",
        url: `${route}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
      };

      const res = await axios(config);
      return res;
    },
    getAll: async (routes) => {
      const requests = routes.map((route) => {
        var config = {
          method: "get",
          url: `${route}`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        };
        return axios(config);
      });

      const responses = await axios.all(requests);

      return responses;
    },
    delete: async (route) => {
      var config = {
        method: "delete",
        url: `${route}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
      };

      const res = await axios(config);
      return res;
    },
    patch: async (route, data) => {
      var config = {
        method: "patch",
        url: `${route}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
        data: data,
      };
      const res = await axios(config);
      return res;
    },
  };
};
