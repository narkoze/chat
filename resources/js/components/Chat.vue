<template>
  <div>
    Logged in as {{ auth.name }},
    <a @click="logout">
      Logout
    </a>
    <br>
    <br>

    <div class="grid-x">
      <div class="cell small-2">
        <strong>Online</strong>
        <ul class="no-bullet">
          <li
            v-for="user in users"
            :key="user.id"
          >
            {{ user.name }}
          </li>
        </ul>
      </div>
      <div class="cell small-10">
        <div
          v-for="message in messages"
          :key="message.id"
        >
          {{ `${message.author.name}: ${message.content}` }}
          <small>({{ message.created_at | dateFormat }})</small>
        </div>

        <div class="grid-x">
          <div class="cell small-10">
            <input
              @keyup.enter="sendMessage"
              v-model="message.content"
              type="text"
              ref="message.content"
            >
          </div>
          <div class="cell small-2">
            <a
              @click="sendMessage"
              class="button"
            >
              <font-awesome-icon icon="paper-plane" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    mounted () {
      this.$refs['message.content'].focus()
    },
    computed: {
      ...mapState([
        'auth',
        'users',
        'messages',
      ]),
      'message': {
        get () {
          return this.$store.state.message
        },
        set (message) {
          this.$store.commit('SET_MESSAGE', message)
        },
      },
    },
    methods: {
      ...mapActions([
        'logout',
        'sendMessage',
      ])
    }
  }
</script>
