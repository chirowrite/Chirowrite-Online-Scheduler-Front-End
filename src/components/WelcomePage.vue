<template>
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
            Welcome
          </div>
          <div class="sub-blurb">
            sign-in to make an appointment.
          </div>
            <button @click="goToLogin">
              Sign In
            </button>
          <div class="page-space"></div>
          <button class="second-button">New Patient</button>
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
// Imports the vuex store from the store folder so that we can save needed variables globally.
import store from '../store/index';
// import HeaderWidget from './widgets/HeaderWidget.vue';

export default {
  data() {
    return {
      windowWidth: null,
      mobile: null,
      tablet: null,
      desktop: null,
      // Will be imported value from URL once web address is configured.
      // ClientID: '',
      ClientID: 'hoQN3shDOSco7AGYMIH5TIGdqEg=',
      PracticeName: '',
      PracticeLogo: '',
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  methods: {
    /* async is used to run this method asynchronously so that the method can wait
    for a reply from the fetch (await used before AppointmentQuery) the promise will
    be completed before the program steps past the fetch. */
    async goToLogin() {
      this.$router.push('/login');
    },
    // async goToNewPatient() {
    // },
    async welcomeScreen() {
      // const results = await AppointmentQuery.welcomeScreen(this.ClientID);
      const results = await AppointmentQuery.welcomeScreen();
      console.log('Welcome Screen Results: ', results);
      this.PracticeName = results.Offices[0].Name;
      this.PracticeLogo = results.Offices[0].LogoPath;
      store.commit('addPracticeName', this.PracticeName);
      store.commit('addPracticeLogo', this.PracticeLogo);
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
  },
  beforeMount() {
    if (!this.$route.query.code) {
      console.log('No Client Code Here!');
      this.ClientID = store.state.conClientID;
    } else {
      this.ClientID = this.$route.query.code;
    }
  },
  async mounted() {
    await this.welcomeScreen();
    store.commit('addClientID', this.ClientID);
  },
  computed: {
    loadingStatus() {
      return store.state.loadingStatus;
    },
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
};
</script>

<style lang="scss" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 15%;
    color: #fff;
  }
</style>
