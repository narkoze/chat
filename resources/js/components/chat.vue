<template>
  <div class="row">
    <div class="columns small-3 small-centered">
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
