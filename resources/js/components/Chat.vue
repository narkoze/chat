<template>
  <div class="container">
    <div class="left">
      <div class="auth">
        Logged in as {{ auth.name }},
        <a @click="logout">
          Logout
        </a>
      </div>

      <div class="users">
        <ul class="no-bullet">
          <li
            v-for="user in users"
            :key="user.id"
          >
            {{ user.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="right">
      <div class="top">
        Public
      </div>

      <div class="messages">
        <div>
          <div
            v-for="message in messages"
            :key="message.id"
            :class="{
              'message right': message.author.id === auth.id
            }"
          >
            <div>
              <b>{{ `${message.author.name}:` }}</b>{{ message.content }}
              <small>({{ message.created_at | dateFormat }})</small>
            </div>
          </div>
        </div>
      </div>

      <div class="message content">
        <input
          @keyup.enter="sendMessage"
          v-model="message.content"
          type="text"
        >

        <a
          @click="sendMessage"
          class="button"
        >
          <font-awesome-icon icon="paper-plane" />
        </a>
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

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: row;
    height: 100vh;

    .left {
      .auth {
        background-color: rgb(210, 210, 210);
      }
      .users {
        background-color: rgb(220, 220, 220);
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .top {
        background-color: rgb(230, 230, 230);
      }

      .messages {
        background-color: rgb(240, 240, 240);
        overflow: auto;
        display: flex;
        flex-grow: 1;
        flex-direction: column-reverse;

        :first-child {
          overflow: auto;
        }

        .message.right {
          display: flex;
          flex-direction: row-reverse;
        }
      }
    }
  }

  .message.content {
    background-color: rgb(220, 220, 220);
    display: flex;

    input {
      flex-grow: 1;
      margin: 0;
    }

    a.button {
      margin: 0;
      font-size: 0.85rem;
    }
  }
</style>
