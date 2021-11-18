<template>
  <div class="col-md-12 flex-center">
    <div class="card card-container">
      <!-- <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      /> -->
      <h2 class="text-center font-weight-bold">Sing Up</h2>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group row">
            <div class="col-md-6">
                <Field name="fname" type="text" class="form-control" placeholder="First Name" />
                <ErrorMessage name="fname" class="error-feedback" />
            </div>
            <div class="col-md-6">
                <Field name="lname" type="text" class="form-control" placeholder="Last Name" />
                <ErrorMessage name="lname" class="error-feedback" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-12">
                <Field name="email" type="email" class="form-control" placeholder="Email" />
                <ErrorMessage name="email" class="error-feedback" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-6">
                <Field name="pswd" type="password" class="form-control" placeholder="Password" />
                <ErrorMessage name="pswd" class="error-feedback" />
            </div>
            <div class="col-md-6">
                <Field name="rpswd" type="password" class="form-control" placeholder="Repeat Password" />
                <ErrorMessage name="rpswd" class="error-feedback" />
            </div>
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              SIGN UP
            </button>
          </div>

          <div class="form-group">
            <p class="text-center" >
                <router-link to="/login">
                    Sign In
                </router-link>
            </p>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
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
      fname: yup
        .string()
        .required("First name is required!")
        .min(3, "Must be at least 2 characters!")
        .max(20, "Must be maximum 20 characters!"),
      lname: yup
        .string()
        .required("Last name is required!")
        .min(3, "Must be at least 2 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      pswd: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      rpswd: yup
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
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
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
        }
      );
    },
  },
};
</script>

<style scoped>

</style>