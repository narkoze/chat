<template>
  <div>
    <router-view></router-view>

    <div>
      {{ count }}
      <a
        @click="increment(1)"
        class="button large"
      >
        <font-awesome-icon icon="plus" />
      </a>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'count',
      ])
    },
    methods: {
      ...mapActions([
        'increment',
      ])
    }
  }
</script>
