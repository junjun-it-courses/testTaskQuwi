<template>
    <div class="login-wrapper">
      <h1>Login</h1>
      <form @submit.prevent="login" @input="clearErrors">
        <label>
          <input type="Email" placeholder="email" v-model="userEmail">
          <span class="err" v-if="$v.userEmail.$dirty && !$v.userEmail.required">{{validErr.errEmpty}}</span>
          <span class="err" v-if="!$v.userEmail.email">{{validErr.errEmail}}</span>
        </label>
        <label>
          <input type="Password" placeholder="password" v-model="userPass">
          <span class="err" v-if="$v.userPass.$dirty && !$v.userPass.required">{{validErr.errEmpty}}</span>
          <span class="err" v-if="!$v.userPass.minLength">{{validErr.errShortVal}}</span>
        </label>

        <div class="serv-err" v-if="isServerError">
          <span v-for="(err, index) in serverErrors" :key="index">{{err}}</span>
        </div>

        <button type="submit" class="btn form-submit" :disabled="isLoading">
          <small-loader v-if="isLoading"></small-loader>
          <span v-else>Login</span>
        </button>
      </form>

    </div>
</template>

<script>
  import {email, minLength, required} from "vuelidate/lib/validators";
  import {defaultErrMes} from "@/utils/validationErrors";
  import SmallLoader from "@/components/parts/SmallLoader";

  export default {
      layout: "auth",
      components: {SmallLoader},
      data: () => {
        return {
          userEmail: '',
          userPass: '',
          isLoading: false,

          isServerError: false,
          serverErrors: [],

          validErr: {}
        }
      },

      validations: {

        userEmail: {
          required,
          email
        },

        userPass: {
          required,
          minLength: minLength(6)
        },

      },

      mounted() {
        this.validErr = defaultErrMes;
      },


      methods: {
        clearErrors() {
          this.isServerError = false;
          this.serverErrors = [];
        },

        async login() {

          if(this.$v.$invalid || this.isServerError) {
            this.$v.$touch();
            return false;
          }

          this.isLoading = true;

          const data = await this.$store.dispatch('auth/loginUser', {
            email: this.userEmail,
            password: this.userPass
          });

          if(!data.success) {
            for(let item in data.errors) {
              this.serverErrors.push(data.errors[item]);
            }
            this.isServerError = true;
          } else {
            this.$router.push('/')
          }

          this.isLoading = false
        },
      }
  }
</script>

<style lang="sass" scoped>
  .login-wrapper
    width: 320px

    h1
      font-size: 22px
      text-transform: uppercase

    form
      display: flex
      flex-direction: column
      margin: 20px 0

      label:last-child
        margin-bottom: 0
</style>
