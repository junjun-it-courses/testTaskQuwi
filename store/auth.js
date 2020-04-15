
export const state = () => ({
  token: null,
  userData: {},
});

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUserData(state, data) {
    state.userData = data;
  }

};

export const actions = {

  async loginUser({commit, dispatch}, {email, password}) {
    try {
      const data = await this.$axios.$post('auth/login', {email, password});
      dispatch('setToken', data.token);
      commit('setUserData', data.app_init.user);
      return {success: true};
    } catch (e) {
      return {
        success: false,
        errors: e.response.data.first_errors
      };
    }
  },

  setToken({commit}, token) {
    this.$axios.setToken(token, 'Bearer');
    commit('setToken', token);
    this.$cookies.set('token', token, {path: '/',maxAge: 30 * 24 * 60 * 60});
  },

  async autoLogin({dispatch}) {
    const token = this.$cookies.get('token');
    if(token) {
      this.$axios.setToken(token, 'Bearer');
      try {
        const data = await this.$axios.$get('auth/init');
        dispatch('setToken', token);
        return true;
      } catch (e) {
        return false;
      }
    }

  },

  async logout() {
    try {
      await this.$axios.$post('auth/logout', {});
      this.$cookies.remove('token');
    } catch (e) {
      throw e;
    }
  }


};

export const getters = {
  getUserData: state => state.userData,
  isAuthenticated: state => Boolean(state.token),
  token: state => state.token
};
