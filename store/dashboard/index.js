export const state = () => ({
asideStatus: true,
isAsideHovered: false,
  })
  
  export const mutations = {
   toggleAside(state){
    state.asideStatus = !state.asideStatus;
   },
   toggleHover(state){
    state.isAsideHovered = !state.isAsideHovered;
   }
  }

  export const actions = {
    toggleAside({commit}){
      commit('toggleAside');
    },
    toggleHover({commit}){
      commit('toggleHover');
    },
  }

  export const getters =  {
    getAsideStatus(state){
      return state.asideStatus;
    },
    isAsideHovered(state){
      return state.isAsideHovered;
    }
  }
