<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="main-container">
    <div class="container">
      <div class="appointment-container">
        <div class="banner-container" v-if="mobile">
          <div class="logout-banner" v-if="sessionStarted !== 0">
            <div class="logout-icon" @click="logout">
              Log Out
              <img
                src="../assets/Icons/exit-logout.png"
                alt="logout icon"
              />
            </div>
          </div>
          <div class="logo-practice-banner">
            <div class="logo-container">
              <img class="logo"
                v-if="logoData"
                :src="logoData"
                alt="Practice Logo"
              />
            </div>
            <div class="practice-name-container"
              v-if="nameData">
              {{ nameData }}
            </div>
          </div>
        </div>
        <div class="review-appointment-container">
          <div class="progress-bar">
            <div class="progress-meter-1"></div>
            <div class="progress-meter-2"></div>
            <div class="progress-meter-3"></div>
          </div>
          <div class="review-success-info">
            <div class="review-success-container">
              <div class="review-success-icon">
                <img
                :src="require('../assets/Icons/success-check-mark-1.png')" alt="Success Icon" />
              </div>
            </div>
            <div class="review-success-heading">
              Success!
            </div>
            You have scheduled an appointment with <strong>{{ doctor }} </strong>
            for <strong>{{ service }} </strong> on <strong>{{ date }}</strong>
            at <strong>{{ time }}</strong>.
          </div>
        </div>
        <div class="logout-disclaimer">
          Page will automatically logout and refresh in {{ countdown }} seconds.
        </div>
        <div class="footer">
          Chirowrite Online Scheduler © 2025
        </div>
    </div>
  </div>
</div>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      windowWidth: null,
      mobile: null,
      tablet: null,
      desktop: null,
      doctor: store.state.conDoctor,
      service: store.state.conService,
      office: store.state.conOffice,
      day: store.state.conDay,
      date: store.state.conDate,
      time: store.state.conTime,
      countdown: 15,
      timeoutID: null,
    };
  },
  methods: {
    logout() {
      console.log('Logged Out. Good bye 👋');
      localStorage.clear();
      store.state.sessionID = 0;
      store.state.conOffice = '';
      store.state.conDoctor = '';
      store.state.conService = '';
      store.state.conOfficeID = '';
      store.state.conServiceID = '';
      store.state.conDoctorID = '';
      store.state.conDate = '';
      store.state.conShortDate = '';
      store.state.conDay = '';
      store.state.conTime = '';
      store.state.conSendDate = '';
      this.$router.push('/');
    },
    logoutTimer() {
      this.timeoutID = setTimeout(() => {
        this.logout();
        this.timeoutID = null;
      }, 15 * 1000);
    },
    countdownTimer() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1;
          this.countdownTimer();
        }, 1000);
      }
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
  mounted() {
    this.logoutTimer();
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
    this.countdownTimer();
  },
  beforeRouteLeave(to, from, next) {
    // console.log('In Route Leave');
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  height: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-left: 10px;
  padding-top: 15px;
  padding-bottom: 5px;
}

.progress-meter-1 {
  width: 90%;
  height: 10px;
  border-radius: 15px;
  background-color: #00589c;
}

.progress-meter-2 {
  width: 90%;
  height: 10px;
  border-radius: 15px;
  background-color: #00589c;
}

.progress-meter-3 {
  width: 90%;
  height: 10px;
  border-radius: 15px;
  background-color: #00589c;
}

.review-success-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 125px;
}

.review-success-icon {
  display:flex;
  object-fit: contain;
  width: 85px;
  height: 120px;
}

.review-success-info {
  display: block;
  text-align: center;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  padding-top: 10%;
  width: 50%;
  height: 100%;
}

.review-success-heading {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  color: darkblue;
}

.bold-type {
  font-weight: 700;
}

.logout-disclaimer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  padding-top: 10px;
}
</style>
