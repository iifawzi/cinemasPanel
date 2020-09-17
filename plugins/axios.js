import Cookie from "js-cookie";
export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create();

    api.onRequest(config => {
        config.headers["authorization"] = "Bearer " + Cookie.get("authorization");
      })
  
    // Inject to context as $api
    inject('api', api)
  }