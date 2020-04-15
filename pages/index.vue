<template>
  <div class="projects">
      <div v-for="(project, index) in projects" :key="index" @click="editProject(project.id)">
        <ListItem :data="project"/>
      </div>
    <editProjectPopup :data="currentProjectId" @clearCurrentProject="currentProjectId = null" @refreshProjects="refreshProjects"/>
  </div>
</template>

<script>
import ListItem from "@/components/projects/ListItem";
import editProjectPopup from "@/components/parts/editProjectPopup";
export default {
  middleware: ['auto-login'],
  components: {ListItem, editProjectPopup},
  data: () => {
    return {
      currentProjectId: null
    }
  },

  async asyncData({store}) {
    await store.dispatch('projects/getProjectsList');
    const projects = await store.getters['projects/getProjectsList'];
    return {
      projects,
    }
  },



  methods: {
    editProject(id) {
        this.currentProjectId = id;
    },

    async refreshProjects () {
      await this.$store.dispatch('projects/getProjectsList');
      const projects = await this.$store.getters['projects/getProjectsList'];
      this.projects = projects
    }
  }

}
</script>

<style lang="sass">
  .projects
    max-width: 767px
    margin: 0 auto
    padding-top: 20px
</style>

