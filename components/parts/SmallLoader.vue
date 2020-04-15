<template>
  <div class="sm-loader"><img src="~static/icons/loader_2.svg" alt=""></div>
</template>

<script>
    export default {
        name: "SmallLoader"
    }
</script>

<style lang="sass" scoped>
  .sm-loader
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    display: flex

    img
      width: 18px
      animation-name: smLoader
      animation-duration: 1s
      animation-iteration-count: infinite
      animation-timing-function: linear

  @keyframes smLoader
    from
      transform: rotate(0deg)

    to
      transform: rotate(360deg)
</style>
