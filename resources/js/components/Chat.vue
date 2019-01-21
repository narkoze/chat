<template>
  <div>
    Logged in as {{ auth.name }},
    <a @click="logout">
      Logout
    </a>


  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'auth'
      ])
    },
    methods: {
      ...mapActions([
        'logout',
      ])
    }
  }
</script>
