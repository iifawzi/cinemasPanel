import Cookie from "js-cookie";
export default function (context) {
  const language = Cookie.get('lang');
    context.store.dispatch('changeLang',language);
    context.app.i18n.locale = language;
  }