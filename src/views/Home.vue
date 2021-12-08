<template>
  <v-app>
      <v-img class="glug_img" src="../assets/glug.png" max-height=94 max-width=94 aspect-ratio="1"></v-img>
      <h1 class="heading">GNU/LINUX USERS' GROUP NIT DURGAPUR</h1>

      <h3 class="menu_btn faq">FAQ</h3>
      <h3 class="menu_btn rules">RULES</h3>
      <h3 class="menu_btn ctc">CONTACT US</h3>
      <h1 class="aud_head">AUDITION PORTAL</h1>
      <div class="auth"></div>
  </v-app>
</template>

<script>
  export default {
  }
</script>

<style>
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
</style>
