<template>
  <div>
    <TopBar></TopBar>
    <div class="wrapper fadeInDown">
      <div id="formContent">
          <div class="mt-5 text-center">
            <span v-if="errors.length > 0">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </span>


            <form id="app"
                  @submit="checkForm"
                  method="post">
              <input
                  type="text"
                  v-model="username"
                  id="username"
                  name="username"
                  placeholder="login">
              <input
                  type="password"
                  v-model="password"
                  id="password"
                  name="password"
                  placeholder="password">
              <input type="submit" value="Zaloguj się">
              <div id="formFooter">
                <h>Nie masz konta?</h>
                <router-link class="underlineHover" to="/register">Zarejestruj się tutaj</router-link>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import UserDataService from "@/services/UserDataService";
export default {
  name: "Login",
  data: function() {
    return {
        errors: [],
        username: null,
        password: null
      };
  },
  methods:{
    checkForm: function (e) {
      e.preventDefault();

      this.errors = [];

      if (this.username === null) {
        this.errors.push('Nazwa użytkownika jest wymagana.');
      }
      if (this.password === null) {
        this.errors.push('Hasło jest wymagane.');
      }
      else {
        let data = {
          "login": this.username,
          "password": this.password
        }
        UserDataService.login(data)
            .then(user => {
              // login successful if there's a jwt token in the response
              //if (user.token) {
                console.log(user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.$router.push('/')
              //}
            })
            .catch(err => {
            if(err.response.status === 403){
              this.errors.push("Nieprawidłowy login lub hasło.")
            }
            else if(err.response.status === 500){
              this.errors.push("Błąd serwera, spróbuj ponownie się zalogować.")
            }
            else{
              this.errors.push("Nieznany błąd.")
            }
          });
        }

      }
    },
  components: {TopBar}
}
</script>

<style scoped>

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  height: auto;
  padding: 50px 50px;
  border-radius: 20px;
}
input[type=button], input[type=submit], input[type=reset] {
  background-color: #56baed;
  border: none;
  color: white;
  width: 15em;
  padding: 15px 30px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 5px 5px 5px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=text], input[type=password] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #ffffff88;
  width: 50%;
  position: relative;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

</style>