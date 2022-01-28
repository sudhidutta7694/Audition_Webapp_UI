<template>
    <div class="auth_box">
        <div class="d-flex flex-row btns">
            <div class="d-flex align-center justify-center text-center btn signIn" v-bind:class="{ active: signIn, passive: !signIn}" @click="signIn = true"><h4 class="my-auto">SIGN-IN</h4></div>
            <div class="d-flex align-center text-center btn signUp" v-bind:class="{ active: !signIn, passive: signIn}" @click="signIn = false"><h4 class="mx-auto">SIGN-UP</h4></div>
        </div>
        <div class="d-flex mt-15 justify-center form">
            <v-form  v-if="signIn">
            <v-text-field class="mx-auto txt-in" label="E-MAIL ID" outlined filled></v-text-field>
            <v-text-field class="mx-auto txt-in" label="PASSWORD" outlined filled></v-text-field>
            <div class="d-flex flex-column justify-center align-self-center background signinbtn">
                <v-btn >Sign-In</v-btn>
            </div>
            
            </v-form>
            <v-form class="form" v-else>
            <v-text-field class="mx-auto txt-in" label="NAME" outlined filled></v-text-field>
            <v-text-field class="mx-auto txt-in" label="E-MAIL ID" outlined filled></v-text-field>
            <v-text-field class="mx-auto txt-in" label="PHONE NUMBER" outlined filled></v-text-field>
            <v-text-field class="mx-auto txt-in" label="PASSWORD" outlined filled></v-text-field>
            <div class="d-flex flex-column justify-center align-self-center background signinbtn">
                <v-btn >Sign-Up</v-btn>
            </div>
            </v-form>
        </div>
        <div class="mt-4 d-flex opt">
            <v-divider class="mt-3 mx-4"></v-divider>
            <h3>OR</h3>
            <v-divider class="mt-3 mx-4"></v-divider>
        </div>
        <div class="d-flex justify-center align-center mx-auto alt" >
            <v-btn class="google ic" icon><img class="ic" src="../assets/google.svg"></v-btn>
            <v-btn class="github ic" icon><img class="ic" src="../assets/github.svg"></v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            signIn: true,
        }
    }
}
</script>

<style>
.btns{
  height: 8vh;
  transition: transform 300ms linear;
}
.signIn{
    border-radius: 42px 0px;
    overflow: hidden;
    position: relative;
}
.signIn:before{
    content: "";
    display: block;
    width: 200%;
    height: 200%;
    position: absolute;
    border-radius: 42px;

    top:0;
    right:0;
    box-shadow: 50px -50px 0 0 #121415;
}
.signUp{
    border-radius: 0 42px;
    overflow:hidden;
    position: relative;
}
.signUp:before{
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
.active{
    background-color: transparent;
}
.passive{
    background-color: #121415;
}
.alt{
  width: 50%;
  height: 140px;
}
.txt-in{
  width: 89%;
  height: 105px;
}
.ic{
  width: 100px;
  height: 100px;
}
.v-btn{
  align-self: center;
}
.v-form{
  width: 100%;
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

.auth_box{
  background: #1A1D1F;
  max-height: 80vh;
  min-height: 60vh;
  width: 60vh;
  border: 1px solid white;
  border-radius: 42px;
}
.btn{
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
.google{
    margin-right: 100px;
}
.github{
    margin-left: 100px;
}
@media screen and (max-width:960px) {
    .auth_box{
        height: fit-content;
        width: 90vw;  
        min-height: 50vh;
        max-height: 115vh;
        border-radius: 30px;  
        overflow-y: wrap;
    }
    .btns{
        height: 8vh;
    }
    .btn{
        font-size: 13px;
    }
    .signIn{
        border-radius: 30px 0px;
    }
    .signIn:before{
        border-radius: 30px;
    }
    .signUp{
        border-radius: 0px 30px;
    }
    .signUp:before{
        border-radius: 30px;
    }
    .ic{
        width: 80px;
        height: 80px;
    }
    .alt{
        height: 100px;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .google{
        margin-right: 40px;
    }
    .github{
        margin-left: 40px;
    }
}
</style>