<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <base-dialog :show="!!errorReason"
    title="Submit Error"
    @close="handleError">
    {{ errorReason }}
  </base-dialog>
  <div class="main-container">
    <div class="container">
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
      <div class="instructions">
        Confirm Appointment
      </div>
      <div class="confirmation-container">
        <div class="progress-bar">
          <div class="progress-meter-1"></div>
          <div class="progress-meter-2"></div>
          <div class="progress-meter-3"></div>
        </div>
        <div class="tab"></div>
          <NewAppointmentCard />
          <div class="button-container">
            <div class="back-button-container">
              <button class="alternate-button" @click="goback">
                Go Back
              </button>
            </div>
            <div class="confirm-button-container">
              <button class="alternate-button" @click="confirm">
                Confirm
              </button>
            </div>
          </div>
      </div>
      <div class="footer">
        Chirowrite Online Scheduler © 2025
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import NewAppointmentCard from './widgets/NewAppointmentCard.vue';
import AppointmentQuery from '../js/query';
import BaseDialog from './widgets/BaseDialog.vue';

export default {
  components: {
    NewAppointmentCard,
    BaseDialog,
  },
  data() {
    const longDate = new Date(store.state.conDate);
    const gm = longDate.getMonth();
    const gd = longDate.getDate();
    const gy = longDate.getFullYear();
    const month = store.state.Month[gm];
    const shortDate = `${month} ${gd}, ${gy}`;
    const wholeDate = store.state.conDate.split(' ');
    const myDay = wholeDate[0].slice(0, -1);
    return {
      windowWidth: null,
      mobile: null,
      tablet: null,
      desktop: null,
      errorReason: '',
      date: shortDate,
      day: myDay,
      Session: store.state.sessionID,
      Office: store.state.conOffice,
      OfficeID: store.state.conOfficeID,
      Doctor: store.state.conDoctor,
      DoctorID: store.state.conDoctorID,
      Service: store.state.conService,
      ServiceID: store.state.conServiceID,
      ApptDate: store.state.conSendDate,
      ApptTime: store.state.conTime,
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
    async confirm() {
      store.commit('addShortDate', this.date);
      store.commit('addDay', this.day);
      const test = await AppointmentQuery.sendInformation(
        this.Session,
        this.OfficeID,
        this.DoctorID,
        this.ServiceID,
        this.ApptDate,
        this.ApptTime,
      );
      // switch case that console logs a response depending on status code received
      // console.log('Confirm Submission Results: ', test);
      switch (test.StatusCode) {
        case 201: { // all OK status code
          console.log('Appointment created and submitted.');
          this.$router.push('/review');
          break;
        }
        case 400: { // status code if there is information missing
          console.log('Missing information in form submission');
          this.errorReason = 'There is some missing information on the form. Please try again.';
          break;
        }
        case 404: { // status code if the session ID is incorrect
          console.log('Invalid credentials were submitted with appointment');
          this.errorReason = 'Invalid credentials were submitted with the appointment.';
          break;
        }
        case 406: { // status code if the session timed out
          console.log('This session has timed out, or the appointment is no longer available.');
          // store.commit('addSession', 0);
          this.errorReason = 'This session has timed out, or the appointment is no longer available.';
          break;
        }
        default: { // default switch case if there is no status code result
          console.log('This scenario is not complete');
          this.errorReason = 'An error has occurred. Please try again.';
        }
      }
    },
    goback() {
      this.$router.push('/authorized/newAppt');
    },
    handleError() {
      this.errorReason = '';
      setTimeout(() => this.$router.push('/login'), 2 * 1000);
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
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
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
  background-color: #b3b3b3;
}
.confirmation-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  height:60%;
  border-radius: 20px;
  background-color: #fff;
  @media (width >=40em) {
    width: 50%;
  }

  .button-container {
    display: flex;
    width: 100%;
    height: 50px;
    flex-direction: row;
    padding: 10px
  }

  .confirm-button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 49%;
    height: 100%;
  }

  .back-button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 49%;
    height: 100%;
  }
}
</style>
