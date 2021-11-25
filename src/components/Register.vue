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
                            <div uk-alert class="uk-alert-danger" v-if="is_error">
                              <a class="uk-alert-close" uk-close></a>
                              <h3>Registration failed</h3>
                              <p>Oops, Something went wrong.</p>
                              <p> - Make sure if your password is equal to confirm password</p>
                              <p>{{ message }}</p>
                            </div>
                            <h3 class="uk-card-title uk-text-center">Sign up</h3>
                            <Form @submit="handleRegister" :validation-schema="schema">
                              <div v-if="!successful">
                                <div class="uk-margin">
                                    <div class="uk-inline uk-width-1-1">
                                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                                        <Field name="first_name" type="text" class="uk-input uk-form-large" placeholder="First Name" />
                                        <ErrorMessage name="first_name" class="error-feedback" />
                                    </div>
                                </div>
                                <div class="uk-margin">
                                  <div class="uk-inline uk-width-1-1">
                                      <span class="uk-form-icon" uk-icon="icon: user"></span>
                                      <Field name="last_name" type="text" class="uk-input uk-form-large" placeholder="Last Name" />
                                      <ErrorMessage name="last_name" class="error-feedback" />
                                  </div>
                                </div>
                                <div class="uk-margin">
                                  <div class="uk-inline uk-width-1-1">
                                      <span class="uk-form-icon" uk-icon="icon: mail"></span>
                                      <Field name="email" type="email" class="uk-input uk-form-large" placeholder="Email" />
                                      <ErrorMessage name="email" class="error-feedback" />
                                  </div>
                                </div>
                                <div class="uk-margin">
                                  <div class="uk-inline uk-width-1-1">
                                      <span class="uk-form-icon" uk-icon="icon: lock"></span>
                                      <Field name="password" type="password" class="uk-input uk-form-large" placeholder="Password" />
                                      <ErrorMessage name="password" class="error-feedback" />
                                  </div>
                                </div>
                                <div class="uk-margin">
                                  <div class="uk-inline uk-width-1-1">
                                      <span class="uk-form-icon" uk-icon="icon: lock"></span>
                                      <Field name="confirm_password" type="password" class="uk-input uk-form-large" placeholder="Repeat Password" />
                                      <ErrorMessage name="confirm_password" class="error-feedback" />
                                  </div>
                                </div>
                                <div class="uk-margin">
                                  <button class="uk-button uk-button-primary uk-button-large uk-width-1-1" :disabled="loading">
                                    <span
                                      v-show="loading"
                                      class="spinner-border spinner-border-sm"
                                    ></span>
                                    SIGN UP
                                  </button>
                                </div>
                                <div class="uk-text-small uk-text-center">
                                    Do you have an account? 
                                    <router-link to="/login">
                                          Login
                                    </router-link>
                                </div>
                              </div>
                            </Form>
                            <!-- <div
                              v-if="message"
                              class="alert"
                              :class="successful ? 'alert-success' : 'alert-danger'"
                            >
                              {{ message }}
                            </div> -->
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
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      first_name: yup
        .string()
        .required("First name is required!")
        .min(3, "Must be at least 2 characters!")
        .max(20, "Must be maximum 20 characters!"),
      last_name: yup
        .string()
        .required("Last name is required!")
        .min(3, "Must be at least 2 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      confirm_password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
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
  mounted() {
    if (this.currentUser) {
      this.$router.push("/candidates");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.is_error = false;
          this.$router.push("/login");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
          this.is_error = true;
        }
      );
    },
  },
};
</script>

<style scoped>

</style>