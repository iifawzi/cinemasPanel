import Cookie from "js-cookie";
export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
      headers: {
        common: {
        authorization: Cookie.get("authorization"),
        }
      }
    })
  
    // Inject to context as $api
    inject('api', api)
  }