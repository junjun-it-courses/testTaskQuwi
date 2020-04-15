<template>
  <div class="item-wrapper">
    <div class="item-left">
      <img :src="data.logo_url" :alt="data.name" :title="data.name">
      <span class="item-name">{{data.name}}</span>
    </div>
    <div class="item-center" :class="data.is_active ? 'active' : 'not-active'">
      {{data.is_active ? 'Active' : 'Not Active'}}
    </div>
    <div class="item-right">
      <div class="elems">
        <span>time this week</span>
        <span>time this month</span>
        <span>time total</span>
      </div>
      <div class="elems">
        <span class="time">{{data.spent_time_week}}</span>
        <span class="time">{{data.spent_time_month}}</span>
        <span class="time">{{data.spent_time_all}}</span>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
      props:[
        'data',
      ],
        name: "ListItem"
    }
</script>

<style lang="sass" scoped>
  .item-wrapper
    display: flex
    align-items: stretch
    margin-bottom: 10px
    overflow: hidden
    border: 1px solid #eaeaea
    border-radius: 5px
    padding: 15px 0
    background-color: #fff
    cursor: pointer

  .item-right, .item-left, .item-center
    width: calc(100% / 3)
    display: flex
    align-items: center
    justify-content: center

  .item-left img
    max-width: 100px
    margin-right: 30px

  .item-right div.elems
    padding: 0 15px

    span
      display: inherit
      flex-direction: row

      &.time
        font-weight: bold

  .item-name
    font-weight: bold

  .item-center
    font-weight: bold

    &.active
      color: #23ae00

    &.not-active
      color: #db2828
</style>
