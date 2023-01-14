<template>
  <div class="auth_box">
    <div class="d-flex flex-row btns">
      <div
        class="d-flex align-center justify-center text-center btn signIn"
        v-bind:class="{ active: signIn, passive: !signIn }"
        @click="signIn = true"
      >
        <h4 class="my-auto">SIGN-IN</h4>
      </div>
      <div
        class="d-flex align-center text-center btn signUp"
        v-bind:class="{ active: !signIn, passive: signIn }"
        @click="signIn = false"
      >
        <h4 class="mx-auto">SIGN-UP</h4>
      </div>
    </div>
    <div class="d-flex mt-15 justify-center form">
      <v-form v-if="signIn">
        <v-text-field
          v-model="emailId"
          :rules="emailRules"
          class="mx-auto txt-in"
          label="E-MAIL ID"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="passwd"
          :rules="passwordRules"
          class="mx-auto txt-in"
          label="PASSWORD"
          type="password"
          outlined
        ></v-text-field>
        <div class="d-flex flex-column justify-center align-self-center background signinbtn">
          <v-btn :loading="loading" :disabled="loading" @click="SignIn">Sign-In</v-btn>
        </div>
      </v-form>
      <v-form class="form" v-else>
        <v-text-field v-model="name" class="mx-auto txt-in" label="NAME" outlined></v-text-field>
        <v-text-field
          v-model="emailId"
          :rules="emailRules"
          class="mx-auto txt-in"
          label="E-MAIL ID"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="phoneNo"
          :rules="phoneRules"
          class="mx-auto txt-in"
          label="PHONE NUMBER"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="passwd"
          class="mx-auto txt-in"
          label="PASSWORD"
          type="password"
          :rules="passwordRules"
          outlined
        ></v-text-field>
        <div class="d-flex flex-column justify-center align-self-center background signinbtn">
          <v-btn :loading="loading" :disabled="loading" @click="SignUp">Sign-Up</v-btn>
        </div>
      </v-form>
    </div>
    <div class="mt-4 d-flex opt">
      <v-divider class="mt-3 mx-4"></v-divider>
      <h3>OR</h3>
      <v-divider class="mt-3 mx-4"></v-divider>
    </div>
    <div class="d-flex justify-center align-center mx-auto alt">
      <v-btn
        fab
        elevation="0"
        plain
        width="90px"
        height="90px"
        @click="googleLogin"
        class="ic google"
      >
        <!-- <img class="ic" src="../assets/google.svg" /> -->
        <v-icon size="80px">$vuetify.icons.google</v-icon>
      </v-btn>
      <v-btn
        fab
        elevation="0"
        plain
        width="90px"
        height="90px"
        @click="githubLogin"
        class="ic github"
      >
        <!-- <img class="ic" src="../assets/github.svg" /> -->
        <v-icon size="80px">mdi-github</v-icon>
      </v-btn>
    </div>
    <v-snackbar v-model="error" color="error" elevation="12" app>{{ errorMessage }}</v-snackbar>
  </div>
</template>

<script>
import common from "@/services/common.js";

export default {
  name: "Login",
  data() {
    return {
      signIn: true,
      emailId: "",
      passwd: "",
      name: "",
      phoneNo: "",
      emailRules: [
        (v) => !!v || "Required.",
        (v) =>
          /^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()/[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
            v
          ) || "Invalid Email address",
      ],
      passwordRules: [
        (v) => !!v || "Required.",
        (v) => v.length >= 8 || "Min 8 characters",
      ],
      error: false,
      errorMessage: "",
      phoneRules: [
        v => !!v || "Phone No is required",
        v => /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(v) || "Phone no must be valid",
        v =>
          (v && v.length <= 10 && v.length >= 10) ||
          "Enter a valid (91+) 10 digit Phone no"
      ],
    };
  },
  methods: {
    SignIn() {
      this.loading = true;
      var user = {
        email: this.emailId,
        password: this.passwd,
      };
      common.login(user).then((res) => {
        if (res.data.success == true) {
          localStorage.setItem("token", res.data.token);
          this.loading = false;
          this.$router.push("/dash");
        } else {
          this.loading = false;
          this.error = true;
          this.errorMessage = res.data.message;
        }
      });
    },
    SignUp() {
      this.loading = true;
      const user = {
        username: this.name,
        email: this.emailId,
        phone: this.phoneNo,
        password: this.passwd,
        isAdmin: false,
      };
      common.signup(user).then((res) => {
        this.loading = false;
        if (res.data.success == true) {
          this.$router.push("/dash");
        } else {
          this.emailSnack = true;
          this.emailId = this.passwd = this.name = this.phoneNo = "";
        }
      });
    },
    googleLogin() {
      window.location.href = `${process.env.VUE_APP_BASE_URL}auth/google/`;
    },
    githubLogin() {
      window.location.href = `${process.env.VUE_APP_BASE_URL}auth/github/`;
    },
  },
};
</script>

<style>
.btns {
  height: 77.84px;
  transition: 300ms;
}
.signIn {
  border-radius: 42px 0px;
  overflow: hidden;
  position: relative;
}
.signIn:before {
  content: "";
  display: block;
  width: 200%;
  height: 200%;
  position: absolute;
  border-radius: 42px;

  top: 0;
  right: 0;
  box-shadow: 50px -50px 0 0 #121415;
}
.signUp {
  border-radius: 0 42px;
  overflow: hidden;
  position: relative;
}
.signUp:before {
  content: "";
  display: block;
  width: 200%;
  height: 200%;
  position: absolute;
  border-radius: 42px;

  top: 0;
  left: 0;
  box-shadow: -50px -50px 0 0 #121415;
}
.active {
  background-color: transparent;
}
.passive {
  background-color: #121415;
}
.alt {
  width: 50%;
  height: 140px;
}
.txt-in {
  width: 89%;
  height: 105px;
}
.v-btn {
  align-self: center;
}
.v-form {
  width: 100%;
}
.menu_btn {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 20px;
  /* or 67% */
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;
  color: #ffffff;
}

.auth_box {
  background: #1a1d1fac;
  width: 500px;
  border: 1px solid white;
  border-radius: 42px;
  transition: 0.5s;
  backdrop-filter: blur(10px);
}
.btn {
  width: 50%;
  text-align: center;
  font-family: Inter;
  font-style: normal;
  font-weight: thin;
  font-size: 25px;
  letter-spacing: 0.4em;
  cursor: pointer;
  transition: transform 300ms linear;
}
.google {
  margin-right: 50px;
}
.github {
  margin-left: 50px;
}
@media screen and (max-width: 960px) {
  .auth_box {
    height: fit-content;
    width: 90vw;
    min-height: 50vh;
    max-height: 115vh;
    border-radius: 30px;
    overflow-y: auto;
  }
  .btns {
    height: 77.84px;
  }
  .btn {
    font-size: 13px;
  }
  .signIn {
    border-radius: 30px 0px;
  }
  .signIn:before {
    border-radius: 30px;
  }
  .signUp {
    border-radius: 0px 30px;
  }
  .signUp:before {
    border-radius: 30px;
  }
  .alt {
    height: 100px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .google {
    margin-right: 40px;
  }
  .github {
    margin-left: 40px;
  }
}
</style>
