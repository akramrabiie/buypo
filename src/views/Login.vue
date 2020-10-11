<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <!-- <img src="https://vuematerial.io/assets/logo-color.png" /> -->
        <div class="md-title">BuyPo</div>
        <div class="md-body-1"></div>
      </div>

      <div class="form">
        <md-field>
          <label>شماره کسب و کار</label>
          <md-input v-model="login.username" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>رمز عبور</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <!-- <a href="/resetpassword">Reset password</a> -->
        <md-button class="md-raised md-primary" @click="auth">ورود</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import api from '../Api';
import TokenStorage from '../TokenStorage';
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    auth() {
      this.loading = true;
      
      let username = this.login.username;
      let password= this.login.password;

      api.login({username, password}).then(res=>{
        this.$router.push({ path: "products" });
        this.loading = false;
        TokenStorage.setToken(res.data.token);
      }, err=>{
          alert(err);
          this.loading = false;
      });

    }
  }
};
</script>

<style >
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
}
.centered-container .title {
  text-align: center;
  margin-bottom: 30px;
}
.centered-container .title img {
  margin-bottom: 16px;
  max-width: 80px;
}
.centered-container .actions .md-button {
  margin: 0;
}
.centered-container .form {
  margin-bottom: 60px;
}
.centered-container .background {
  background: url("../assets/loginBG.jpg") no-repeat center;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 0;
}
.centered-container .md-content {
  z-index: 1;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
}
.centered-container .loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
