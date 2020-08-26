export const state = () => ({
    locales: ['en', 'ar'],
    locale: 'en'
  })
  
  export const mutations = {
    changeLang (state, locale) {
      if (state.locales.indexOf(locale) !== -1) {
        state.locale = locale
      }
    }
  }

  export const actions = {
    changeLang(vuexContext,lang){
      vuexContext.commit('changeLang',lang);
    }
  }

  export const getters =  {
    getLocale (state) {
      return state.locale;
    }
  }
