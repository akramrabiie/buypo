import axios from "axios";
import TokenStorage from "./TokenStorage";
import router from './router';

const SERVER_URL = "http://buypo.idco.xyz/api/";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000
});

const RESOURCE_TYPE = {
  Product: "products",
  Category: "categories",
};

instance.interceptors.response.use((response) => {
  // Return a successful response back to the calling service
  return response;
}, (error) => {
  
  if(error.response.status === 401){
    router.push('/login');
  }
  else {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }


  // If we wanna get new token
  // // Try request again with new token
  // return TokenStorage.getNewToken()
  //   .then((token) => {

  //     // New request with new token
  //     const config = error.config;
  //     config.headers['Authorization'] = `Bearer ${token}`;

  //     return new Promise((resolve, reject) => {
  //       axios.request(config).then(response => {
  //         resolve(response);
  //       }).catch((error) => {
  //         reject(error);
  //       })
  //     });

  //   })
  //   .catch((error) => {
  //     Promise.reject(error);
  //   });
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
        Accept: "application/json",
        Authorization: "Bearer " + TokenStorage.getToken(),
      };
    }

    let req = instance(request);

    return req;
  },
  login({ username, password }) {
    return this.execute("POST", "authentication_token", {
      username: username,
      password: password,
    });
  },

  createNew(resourceType, data) {
    let resType = RESOURCE_TYPE[resourceType];
    if (resType == RESOURCE_TYPE.Category) {
      return this.execute("POST", resType, data);
    }
    else if (RESOURCE_TYPE.Product) {
      return this.execute("POST", resType, data);
    }

  },
  getList(resourceType, page) {
    page = page || 1;
    let resType = RESOURCE_TYPE[resourceType];
    return this.execute("GET", resType + "?page=" + page+"&sort=-cdt");
  },
  getOne(resourceType, id) {
    let resType = RESOURCE_TYPE[resourceType];
    return this.execute("GET", resType+'/'+id);
  },
  removeForId(resourceType, id) {
    let resType = RESOURCE_TYPE[resourceType];
    return this.execute("DELETE", resType + "/" + id);
  },
  updateForId(id, text, completed) {
    return this.execute("PUT", "todos/" + id, {
      title: text,
      completed: completed,
    });
  },

  saveImage(imageData){
    return this.execute('POST', 'images', imageData)
  },
  getImageUrl(id){
    return this.execute('GET', 'images/'+id);
  }

};
