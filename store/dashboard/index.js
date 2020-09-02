export const state = () => ({
asideStatus: false,
animation: ""
  })
  
  export const mutations = {
   toggleAside(state){
    state.asideStatus = !state.asideStatus;
   },
   changeAnimation(state,animation){
    state.animation = animation;
   },
  }

  export const actions = {
    toggleAside({commit,state}){
      if (state.asideStatus === false) {
        commit('changeAnimation','show-animation');
        commit('toggleAside');
      }else {
        commit('changeAnimation','hide-animation');
        setTimeout(() => {
        commit('toggleAside');
        }, 400);
      }
    },
    changeAnimation({commit},animation){
      commit('changeAnimation',animation);
     },
  }

  export const getters =  {
    getAsideStatus(state){
      return state.asideStatus;
    },
    getAnimation(state){
      return state.animation;
    },
  }
