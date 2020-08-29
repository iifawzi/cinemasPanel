export const state = () => ({
    locales: ['en', 'ar'],
    locale: 'ar',
    cinema: "",
  })
  
  export const mutations = {
    changeLang (state, locale) {
      if (state.locales.indexOf(locale) !== -1) {
        state.locale = locale
      }
    },
    setCinemaData (state,data) {
      state.cinema = data;
    }
  }

  export const actions = {
    changeLang(vuexContext,lang){
      vuexContext.commit('changeLang',lang);
    },
    setCinemaData(vuexContext, data){
      vuexContext.commit('setCinemaData', data);
    },
  }

  export const getters =  {
    getLocale (state) {
      return state.locale;
    },
    getCinemaData(state){
      return state.cinema;
    }
  }
