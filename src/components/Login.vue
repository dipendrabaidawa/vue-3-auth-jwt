<template>
  <div class="uk-section auth-page uk-section-muted uk-flex uk-flex-middle uk-animation-fade uk-background-default-important" uk-height-viewport>
        <div class="uk-width-1-1">
            <div class="uk-container">
                <div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
                    <div class="uk-width-1-1@m">
                        <div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
                          <a id="logo" class="uk-navbar-item uk-logo text-align-center" href="#">
                              <img :src="require('../assets/images/logo.png')" uk-img width="250"/>
                          </a>
                          <h2 class="uk-card-title uk-text-center">Sign in</h2>
                          <Form @submit="handleLogin" :validation-schema="schema">
                            <div class="uk-margin">
                              <div class="uk-inline uk-width-1-1">
                                <span class="uk-form-icon" uk-icon="icon: mail"></span>
                                <Field name="email" type="text" class="uk-input uk-form-large" placeholder="john.doe@gmail.com" />
                                <ErrorMessage name="email" class="error-feedback" />
                              </div>
                            </div>
                            <div class="uk-margin">
                              <div class="uk-inline uk-width-1-1">
                                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                                <Field name="password" type="password" class="uk-input uk-form-large" placeholder="*********" />
                                <ErrorMessage name="password" class="error-feedback" />
                              </div>
                            </div>
                            <div class="uk-margin">
                                <button class="uk-button uk-button-primary uk-button-large uk-width-1-1" :disabled="loading">
                                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                  <span>Login</span>
                                </button>
                            </div>
                            <div class="uk-text-small uk-text-center">
                                Not registered?
                                <router-link to="/register">Create an account</router-link>                          
                            </div>
                            <div class="uk-margin">
                              <div uk-alert class="uk-alert-danger" v-if="is_error">
                                  <a class="uk-alert-close" uk-close></a>
                                  <h3>Authentication failed</h3>
                                  <p>Your authentication information is incorrect. Please try again.</p>
                              </div>
                            </div>
                          </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("User Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      is_error: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/candidates");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          console.log("login success", user);
          this.$router.push("/candidates");
          this.is_error = false;
        },
        (error) => {
          this.loading = false;
          this.is_error = true;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
    
    
</style>