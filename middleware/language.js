import Cookie from "js-cookie";
export default function (context) {
  const language = Cookie.get('lang');
  if (language){
    context.store.dispatch('changeLang',language);
  }
  }