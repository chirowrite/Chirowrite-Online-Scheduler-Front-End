<template>
  <base-dialog :show="!!errorReason"
    title="Login Error"
    @close="handleError">
    {{ errorReason }}
  </base-dialog>
  <div class="main-container">
    <div class="container">
      <div class="info-containers">
        <div class="info" v-if="mobile">
          <div class="logo">
            <img v-if="logoData" :src="logoData" alt="Logo"/>
          </div>
          <div class="practice-heading" v-if="nameData">
            {{ nameData }}
          </div>
        </div>
        <div class="tab" v-if="!mobile"></div>
        <div class="button-section">
          <div class="blurb">
            Sign In
          </div>
          <div class="page-space"></div>
          <div class="login-container">
            <form @submit.prevent="sendForm" v-if="!submitted">
        <span>
          <!-- Text Box for user to input phone number and saved in
                composition API under the variable PhoneNumber. -->
          <div class="selection-text">
            Phone Number
          </div>
          <label for="Phone">
            <input type="text"
              placeholder="Phone"
              id="Phone" required
              v-model="PhoneNumber"
              @input="acceptNumber"
            >
          </label>
        </span>
        <div class="page-space"></div>
        <span>
          <!-- Text Box for user to input phone number and saved in
                composition API under the variable PIN. -->
          <div class="selection-text">
            Pin Code
          </div>
          <label for="PIN">
            <input type="password"
              placeholder="PIN"
              id="PIN" required
              v-model="PIN"
            >
          </label>
        </span>
        <span>
          <div class="page-space"></div>
          <!-- Custom button with word submit. -->
          <button>Sign In</button>
        </span>

      </form>
      </div>
        </div>
        <div class="footer">
          Chirowrite Online Scheduler © 2025
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Imports the appointment query class from js file.
import AppointmentQuery from '../js/query';
import BaseDialog from './widgets/BaseDialog.vue';
// Imports the vuex store from the store folder so that we can save needed variables globally.
import store from '../store/index';

export default {
  components: {
    BaseDialog,
  },
  data() {
    return {
      windowWidth: null,
      mobile: null,
      tablet: null,
      desktop: null,
      // Will be imported value from URL once web address is configured.
      ClientID: '',
      PhoneNumber: '',
      PIN: '',
      PracticeName: '',
      PracticeLogo: '',
      // introBlurb: 'Sign In',
      errorReason: '',
      submitted: null,
    };
  },
  computed: {
    logoData() {
      return this.$store.state.conPracticeLogo;
    },
    nameData() {
      return this.$store.state.conPracticeName;
    },
    sessionStarted() {
      return this.$store.state.sessionID;
    },
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  methods: {
    /* async is used to run this method asynchronously so that the method can wait
    for a reply from the fetch (await used before AppointmentQuery) the promise will
    be completed before the program steps past the fetch. */
    async sendForm() {
      console.log('ClientID: ', this.ClientID);
      const ph = this.PhoneNumber.replace('(', '').replace(')', '').replace('-', '');
      const res = await AppointmentQuery.getValidation(this.ClientID, ph, this.PIN);
      console.log('Response: ', res);
      // checking to make sure that the login information is valid on the back-end.
      if (res.IsValid) {
        // Message tracking on the console for troubleshooting purposes.
        console.log('You have been authenticated');
        // Saves the session ID into the store so that is could be used globally.
        store.commit('addSession', res.Session);
        // Pushes the webpage to the authenticated section of the web app.
        this.$router.push('/authorized');
      } else {
        this.errorReason = 'The Password or PIN was entered incorrectly.';
        console.log('Error Reason', store.state.conErrorReason);
        // Message tracking should authentication fail.
        console.log('The credentials failed authorization!!!!');
        // Resets values of the credentials on the web page.
        this.PIN = '';
        // this.$router.push('/');
      }
    },
    acceptNumber() {
      const x = this.PhoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.PhoneNumber = !x[2] ? x[1] : `(${x[1]})${x[2]}${x[3] ? `-${x[3]}` : ''}`;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 960) {
        this.desktop = true;
        this.tablet = false;
        this.mobile = false;
      } else if (this.windowWidth < 960 && this.windowWidth >= 640) {
        this.tablet = true;
        this.desktop = false;
        this.mobile = false;
      } else {
        this.mobile = true;
        this.desktop = false;
        this.tablet = false;
      }
    },
    handleError() {
      this.errorReason = '';
    },
  },
  beforeMount() {
    this.ClientID = store.state.conClientID;
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 65%;
  background-color: #fff;
  border-radius: 25px;
  @media (width >= 40em) {
    width: 35%;
    height: 90%;
  }
  button {
    cursor: pointer;
    width: 100%;
    height: 35px;
    border-radius: 15px;
    background-color: #004EAA;
    color: #fff;
    font-size: 14px;
    @media (width >= 40em) {
      width: 100%;
    }
  }
}
input {
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 10px;
  border-radius: 6px;
  border: 2px solid #fff;
  box-shadow: inset 0px 1px 1px rgba(0,0,0, 0.33);
}
</style>
