export const state = () => ({
    locales: ['en', 'ar'],
    locale: 'ar',
    account: "",
  })
  
  export const mutations = {
    changeLang (state, locale) {
      if (state.locales.indexOf(locale) !== -1) {
        state.locale = locale
      }
    },
    setAccountData (state,data) {
      state.account = data;
    }
  }

  export const actions = {
    changeLang(vuexContext,lang){
      vuexContext.commit('changeLang',lang);
    },
    setAccountData(vuexContext, data){
      vuexContext.commit('setAccountData', data);
    },
  }

  export const getters =  {
    getLocale (state) {
      return state.locale;
    },
    getAccountData(state){
      return state.account;
    }
  }
