<template>
  <v-app>
      <v-img class="glug_img" src="../assets/glug.png" max-height=94 max-width=94 aspect-ratio="1"></v-img>
      <h1 class="heading">GNU/LINUX USERS' GROUP NIT DURGAPUR</h1>

      <h3 class="menu_btn faq">FAQ</h3>
      <h3 class="menu_btn rules">RULES</h3>
      <h3 class="menu_btn ctc">CONTACT US</h3>
      <h1 class="aud_head">AUDITION PORTAL</h1>
      <div class="auth">
        <div class="btns">
          <div class="btn signIn">Sign-In</div>
          <div class="btn signUp">Sign-Up</div>
        </div>
        <div class="d-flex justify-center form">
          <v-form  v-if="login">
            <v-text-field class="mx-auto txt-in" label="USERNAME" filled ></v-text-field>
            <v-text-field class="mx-auto txt-in" label="PASSWORD" filled></v-text-field>
            <div class="d-flex flex-column justify-center align-self-center background signinbtn">
              <v-btn >Sign-In</v-btn>
            </div>
            
          </v-form>
          <v-form class="form" v-else>

          </v-form>
        </div>
        <div class="mt-4 d-flex opt">
          <v-divider class="mt-3 mx-4"></v-divider>
          <h3>OR</h3>
          <v-divider class="mt-3 mx-4"></v-divider>
        </div>
        <div class="d-flex mb-5 mx-10 alt">
          <v-btn class="ic google" icon><img class="ic" src="../assets/google.svg"></v-btn>
          <v-btn class="ic github" icon><img class="ic" src="../assets/github.svg"></v-btn>
        </div>
      </div>
  </v-app>
</template>

<script>
  export default {
    data() {
      return{
        login : true,
      }
    }
  }
</script>

<style>

.btns{
  height: 10%;
}

.alt{
  min-width: 60%;
}

.google{
  float: left;
}

.github{
  float: right;
}

.btn{
  width: 50%;
  vertical-align: middle;
}

.txt-in{
  width: 89%;
  height: 105px;
}

.ic{
  width: 139px !important;
  height: 139px !important;
}

.v-btn{
  align-self: center;
}

.v-form{
  width: 100%;
}

.heading{
  position: absolute;
  width: 776px;
  height: 97px;
  left: 140px;
  top: 29px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 41px;
  display: flex;
  align-items: center;
  letter-spacing: 0.4em;

  color: #2BA353;
}

.glug_img{
  position: absolute;
  width: 94px;
  height: 94px;
  left: 17px;
  top: 40px;
}

.menu_btn{
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

  color: #FFFFFF;
}

.faq{
  position: absolute;
  width: 186px;
  height: 28px;
  left: 1164px;
  top: 43px;
}

.rules{
  position: absolute;
  width: 165px;
  height: 37px;
  left: 1390px;
  top: 42px;
}

.ctc{
  position: absolute;
  width: 223px;
  height: 41px;
  left: 1621px;
  top: 40px;
}

.aud_head{
  position: absolute;
  width: 888px;
  height: 151px;
  left: 101px;
  top: 465px;

  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 60px;
  line-height: 90px;
  /* or 150% */

  display: flex;
  align-items: center;
  letter-spacing: 0.4em;

  color: #FFFFFF;
}

.auth{
  position: absolute;
  width: 740px;
  height: 740px;
  left: 1071px;
  top: 169px;

  background: #1A1D1F;
  border: 1px solid #8486AC;
  box-sizing: border-box;
  border-radius: 44px;
}

.btns{
  height: 93px;
  display: flex;
}

.btn{
  width: 50%;
  text-align: center;
}
</style>
