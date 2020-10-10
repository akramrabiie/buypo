import axios from "axios";
import store from "./Store";

//const SERVER_URL = "https://jsonplaceholder.typicode.com/";
const SERVER_URL = "http://buypo.idco.xyz/api/";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
});

export default {
  async execute(method, resource, data, config) {
    let request = {
      method: method,
      url: resource,
      data,
      ...config,
    };

    if (resource !== "authentication_token") {
      request.headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + store.getToken(),
      };
    }

    
    return instance(request);
  },

  createNew(text, completed) {
    return this.execute("POST", "todos", { title: text, completed: completed });
  },

  getAllProducts(page) {
    return this.execute("GET", "products?page=" + page, null, {
      transformResponse: [
        function(data) {
          return  JSON.parse(data);
        },
      ],
    });
  },
  login({ username, password }) {
    return this.execute("POST", "authentication_token", {
      username: username,
      password: password,
    });
  },

  updateForId(id, text, completed) {
    return this.execute("PUT", "todos/" + id, {
      title: text,
      completed: completed,
    });
  },

  removeForId(id) {
    return this.execute("DELETE", "todos/" + id);
  },
};
