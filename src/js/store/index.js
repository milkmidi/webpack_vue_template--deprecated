// @flow
import Vuex from 'vuex';
import Vue from 'vue';

export type State = {
  loading: boolean,
}


Vue.use(Vuex);

const defaultStat:State = {
  loading: true,
};

// vue 裡用 this.$store.commit('loading' , true)
const mutations = {
  loading(state:State, value:boolean) {
    state.loading = value;
  },
};

/*
  vue 裡用 this.$store.dispatch('loading' , true)
  methods(){
    ...Vuex.mapActions(['loading']),
  }
*/
const actions = {
  loading({ commit }, value:boolean) {
    commit('loading', value);
  },
};

/**
  computed:{
    ...Vuex.mapGetters(['loading'])
  },
*/
const getters = {
  loading: ({ loading }) => loading,
};
export default new Vuex.Store({
  state: defaultStat,
  getters,
  actions,
  mutations,
});
