<template>
  <nav>
    <nuxt-link to="/">
      <img class="logo" src="~static/images/quwi-logo.png" width="25px" height="25px" alt="logo">
    </nuxt-link>

    <div class="right-menu">
      <nuxt-link to="/">Projects</nuxt-link>
      <a href="#" @click.prevent="logout">Logout</a>
    </div>

  </nav>
</template>

<script>
    export default {
        name: "Header",
        methods: {
          async logout() {
            await this.$store.dispatch('auth/logout');
            this.$router.push('/login');
          }
        }
    }
</script>

<style lang="sass" scoped>
  .logo
    transition: .3s

    &:hover
      transform: rotate(360deg)

  nav
    display: flex
    align-items: center
    justify-content: space-between
    height: 100%
    padding: 0 15px
    box-shadow: 0 0 8px 0

  .right-menu a
    padding: 0 10px
    text-transform: uppercase
    color: black
    font-size: 14px

    &:last-child
      padding-right: 0
</style>
