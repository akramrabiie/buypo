import axios from "axios";
import store from "./Store";

//const SERVER_URL = "https://jsonplaceholder.typicode.com/";
const SERVER_URL = "http://buypo.idco.xyz/api/";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
});

const RESOURCE_TYPE = {
  Product: "products",
  Category: "categories",
};

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
        Accept: "application/json",
        Authorization: "Bearer " + store.getToken(),
      };
    }

    return instance(request);
  },
  login({ username, password }) {
    return this.execute("POST", "authentication_token", {
      username: username,
      password: password,
    });
  },

  createNew(text, completed) {
    return this.execute("POST", "todos", { title: text, completed: completed });
  },

  getList(resourceType, page) {
    let resType = RESOURCE_TYPE[resourceType];
    return this.execute("GET", resType + "?page=" + page);
  },
  getOne(resourceType) {
    let resType = RESOURCE_TYPE[resourceType];
    return this.execute("GET", resType);
  },
  removeForId( resourceType,id) {
    let resType = RESOURCE_TYPE[resourceType];
    return this.execute("DELETE", resType +  "/" + id);
  },
  updateForId(id, text, completed) {
    return this.execute("PUT", "todos/" + id, {
      title: text,
      completed: completed,
    });
  },

  
};
