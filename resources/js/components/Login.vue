<template>
  <div class="login">
    <div class="login-card">
      <h2 class="separator-center">
        CHAT
      </h2>

      <h3>
        <span v-if="registerFieldsVisible">Register</span>
        <span v-else>Login</span>
        <small>and start chatting</small>
      </h3>

      <div class="radius bordered shadow card">
        <div class="card-section">
          <a
            v-if="registerFieldsVisible"
            @click="setRegisterFieldsVisible(false)"
            class="clear button secondary login-back"
          >
            <font-awesome-icon icon="long-arrow-alt-left" />
            Login?
          </a>

          <label
            v-if="registerFieldsVisible"
            for="email"
          >
            E-mail
          </label>

          <input
            @keyup.enter="registerFieldsVisible || confirmEmail()"
            v-model="email"
            type="email"
            ref="email"
            id="email"
            :placeholder="registerFieldsVisible ? '' : 'Enter e-mail'"
            :disabled="loginInProgress"
            :class="{
              'is-invalid-input': errors.email
            }"
          />
          <span
            v-if="errors.email"
            class="form-error is-visible"
          >
            {{ errors.email.join() }}
          </span>

          <label
            v-if="registerFieldsVisible"
          >
            Nickname
            <input
              v-if="registerFieldsVisible"
              v-model="name"
              type="text"
              ref="name"
              :disabled="registerInProgress"
              :class="{
                'is-invalid-input': errors.name
              }"
            />
          </label>
          <span
            v-if="errors.name"
            class="form-error is-visible"
          >
            {{ errors.name.join() }}
          </span>

          <label
            v-if="registerFieldsVisible"
            for="password"
          >
            Password
          </label>
          <input
            v-if="passwordInputVisible"
            @keyup.enter="registerFieldsVisible || login()"
            v-model="password"
            type="password"
            ref="password"
            id="password"
            :placeholder="registerFieldsVisible ? '' : 'Enter password'"
            :disabled="loginInProgress"
            :class="{
              'is-invalid-input': errors.password
            }"
          />
          <span
            v-if="errors.password"
            class="form-error is-visible"
          >
            {{ errors.password.join() }}
          </span>

          <label
            v-if="registerFieldsVisible"
          >
            Password again
            <input
              @keyup.enter="register"
              v-model="password_confirmation"
              type="password"
              :disabled="registerInProgress"
              :class="{
                'is-invalid-input': errors.password_confirmation
              }"
            />
          </label>
          <span
            v-if="errors.password_confirmation"
            class="form-error is-visible"
          >
            {{ errors.password_confirmation.join() }}
          </span>

          <a
            v-if="registerFieldsVisible"
            @click="registerInProgress || register()"
            :class="['button expanded', {
              disabled: registerInProgress
            }]"
          >
            <font-awesome-icon icon="edit" />
            Register
          </a>

          <div v-else>
            <div v-if="passwordInputVisible">
              <a
                @click="loginInProgress || login()"
                :class="['button expanded', {
                  disabled: loginInProgress
                }]"
              >
                <font-awesome-icon icon="sign-in-alt" />
                Login
              </a>

              <a
                v-if="!loginInProgress"
                @click="setRegisterFieldsVisible(true)"
                class="button expanded secondary clear"
              >
                <font-awesome-icon icon="edit" />
                Register
              </a>
            </div>

            <a
              v-else
              @click="confirmEmail"
              class="button expanded"
            >
              Continue
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
    computed: {
      ...mapState([
        'passwordInputVisible',
        'registerFieldsVisible',
        'loginInProgress',
        'registerInProgress',
        'errors',
      ]),
      email: {
        get () {
          return this.$store.state.auth.email
        },
        set (email) {
          this.$store.commit('SET_EMAIL', email)
        },
      },
      name: {
        get () {
          return this.$store.state.auth.name
        },
        set (name) {
          this.$store.commit('SET_NAME', name)
        },
      },
      password: {
        get () {
          return this.$store.state.auth.password
        },
        set (password) {
          this.$store.commit('SET_PASSWORD', password)
        },
      },
      password_confirmation: {
        get () {
          return this.$store.state.auth.password_confirmation
        },
        set (password_confirmation) {
          this.$store.commit('SET_PASSWORD_CONFIRMATION', password_confirmation)
        },
      }
    },
    methods: {
      ...mapActions([
        'login',
        'register',
      ]),
      setRegisterFieldsVisible (boolean) {
        this.$store.commit('CLEAR_ERRORS')
        this.$store.commit('SET_REGISTER_FIELDS_VISIBLE', boolean)

        if (boolean) {
          this.$nextTick(() => {
            this.$refs.name.focus()
          })
        }
      },
      confirmEmail () {
        if (this.email) {
          this.$store.commit('CLEAR_EMAIL_ERROR')
          this.$store.commit('SET_PASSWORD_INPUT_VISIBLE', true)
        } else {
          this.$store.commit('SET_EMAIL_ERROR')
        }

        this.$nextTick(() => {
          this.$refs[this.passwordInputVisible ? 'password' : 'email'].focus()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;

    background: url('/img/background.jpg') no-repeat center center fixed;
    background-size: cover;
    height: 100vh;

    h2 {
      padding-bottom: 26px;
    }
    .card {
      background-color: rgba(255, 255, 255, 0.9);
    }
    .login-card {
      width: 315px;
      margin: 0 19px;
    }
    .login-back {
      padding: 0;
    }

    @media screen and (max-width: 39.9375em) {
      padding-top: 26px;

      h3 {
        text-align: center;
      }
    }
    @media screen and (min-width: 40em) {
      padding-top: 52px;
    }
  }
</style>

