<template>
  <div class="main-wrapper">
    <div class="header-wrapper">
      <Header />
    </div>
    <section class="content-wrapper">
      <nuxt/>
    </section>
  </div>
</template>

<script>
  import Header from "@/components/main/Header";
  export default {
    components: {Header}
  }
</script>

<style>
  .main-wrapper {
    position: relative;

  }

  .header-wrapper {
    background: #fafafa;
    box-shadow: 0 0 5px rgba(0,0,0,.25);
    height: 50px;
    position: fixed;
    top: 0;
    width: 100%;
  }

  .content-wrapper {
    height: calc(100vh - 50px);
    margin-top: 50px;
    background-color: #f4f4f4;
  }
</style>

