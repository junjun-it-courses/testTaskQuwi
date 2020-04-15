export const state = () => ({
  projectsList : [],
});
export const mutations = {
  setProjectsList: (state, data) => {
    state.projectsList = data
  }
};
export const actions = {
  async getProjectsList({commit}){
    try {
      const {projects} = await this.$axios.$get('projects-manage/index');
      commit('setProjectsList', projects);
      return projects;
    } catch (e) {
      throw e;
    }
  },

  async updateProject({commit, dispatch}, {id, name}) {
    try {
      await this.$axios.setToken(this.$cookies.get('token'), 'Bearer');
      const data = this.$axios.$post('projects-manage/update?id='+id, {name});
      console.log(data);
      return true;
    } catch (e) {
      return false;
    }

  }
};
export const getters = {
  getProjectsList: state => state.projectsList
};
