<template>
  <div class="col-md-12 flex-center">
    <div class="card card-container">
      <!-- <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      /> -->
      <h2 class="text-center font-weight-bold">Sign in</h2>
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <!-- <label for="username">Username</label> -->
          <Field name="uemail" type="text" class="form-control" placeholder="john.doe@gmail.com" />
          <ErrorMessage name="uemail" class="error-feedback" />
        </div>
        <div class="form-group">
          <!-- <label for="password">Password</label> -->
          <Field name="pswd" type="password" class="form-control" placeholder="*********" />
          <ErrorMessage name="pswd" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>SIGN IN</span>
          </button>
        </div>

        <div class="form-group">
            <p class="text-center" >
                <router-link to="/">
                    Forgot Password ?
                </router-link>
            </p>
        </div>

        <div class="form-group">
            <p class="text-center" >
                <router-link to="/register">
                    Sign Up
                </router-link>
            </p>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
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
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      uemail: yup.string().required("User Email is required!"),
      pswd: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
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