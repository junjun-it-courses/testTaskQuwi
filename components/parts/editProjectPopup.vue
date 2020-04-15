<template>
  <div class="pop-wrapper" :class="isClosedPop ? 'closed' : ''">
      <div class="pop-overlay" @click="closedPop">
          <div class="pop-content" @click.stop="">
            <h2>Edit project</h2>
            <form @submit.prevent="updateProject(data)" @input="clearErrors">
              <label>
                <input type="text" placeholder="Project name" v-model="projectName">
                <span class="err" v-if="$v.projectName.$dirty && !$v.projectName.required">{{validErr.errEmpty}}</span>
                <span class="err" v-if="!$v.projectName.minLength">{{validErr.errShortVal}}</span>
              </label>
              <div class="serv-err" v-if="isServerError">
                <span>Something went wrong. Please try again later</span>
              </div>
              <button type="submit" class="btn form-submit" :disabled="isLoading">
                <small-loader v-if="isLoading"></small-loader>
                <span v-else>Save</span>
              </button>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
    import SmallLoader from "@/components/parts/SmallLoader";
    import {minLength, required} from "vuelidate/lib/validators";
    import {defaultErrMes} from "@/utils/validationErrors";
    export default {
        props:['data'],
        name: "editProjectPopup",
        components: {SmallLoader},
        data: () => {
          return {
            isLoading: false,
            isServerError: false,
            projectName: '',
            projectId: null,
            isClosedPop: true,
            validErr: {}
          }
        },

        validations: {
          projectName: {
            required,
            minLength: minLength(3)
          },
        },

        mounted() {
          this.validErr = defaultErrMes;
          console.log(this.data)
        },

      watch: {
        'data': function (newVal) {
          if(newVal) {
            this.isClosedPop = false;
            this.projectId = newVal;
          }
        }
      },


        methods: {
          clearErrors() {
            this.isServerError = false;
          },

          closedPop() {
            this.$emit('clearCurrentProject');
            this.clearErrors();
            this.projectName = '';
            this.isClosedPop = true;
          },
          async updateProject() {

            if(this.$v.$invalid || this.isServerError) {
              this.$v.$touch();
              return false;
            }

            const data = await this.$store.dispatch('projects/updateProject', {id: this.projectId, name: this.projectName});
            if(data.success) {
              this.$emit('refreshProjects');
              this.closedPop();
            } else {
              this.isServerError = true;
            }

          }
        }
    }
</script>

<style lang="sass" scoped>
  h2
    margin-top: 0

  .closed
    display: none

  .pop-wrapper
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  .pop-overlay
    height: 100%
    background: rgba(0, 0, 0, 0.3)
    display: flex
    justify-content: center
    align-items: center

  .pop-content
    width: 320px
    background: white
    padding: 20px
    box-shadow: 0 0 7px -1px

    form
      display: flex
      flex-direction: column
</style>
