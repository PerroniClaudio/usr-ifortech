import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost",
  // baseURL: "https://api.ifortech.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
