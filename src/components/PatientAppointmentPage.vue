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
        <div class="book-appointment-container">
          Schedule New Appointment
          <div class="big-spacer"></div>
          <button
            class="alternate-button"
            @click="newAppointment"
          >
            Book Appointment
          </button>
        </div>
        <div class="divider"></div>
        <div class="card-container">
          <div class="appointment-text">
            Upcoming Appointments
          </div>
          <ACard :post="post" v-for="(post, x) in posts" :key="x"></ACard>
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
import AppointmentQuery from '../js/query';
import DateTimeFormat from '../js/formatDate';
import ACard from './widgets/UpcomingAppointmentCard.vue';

export default {
  components: {
    ACard,
  },
  data() {
    return {
      windowWidth: null,
      mobile: null,
      tablet: null,
      desktop: null,
      isLoading: false,
      PracticeName: store.state.conPracticeName,
      PracticeLogo: store.state.conPracticeLogo,
      posts: [],
      res: '',
      countA: 0,
      countB: 0,
      OID: [],
      selectedOffice: '',
      officeID: '',
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
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
  methods: {
    hasValue() {
      if (this.sessionStarted !== 0) {
        this.showToggle = !this.showToggle;
      }
    },
    async newAppointment() {
      this.res = await AppointmentQuery.getAppointmentData();
      console.log('Raw Data: ', this.res);
      this.countA = 0;
      this.countB = 0;
      this.OID = [];
      this.selectedOffice = '';
      for (let x = 0; x < this.res.Data.length; x += 1) {
        if (!this.OID[this.countA]) { // Checking if the array position is null
          this.OID[this.countB] = { // setting the first position in array with doc id and name
            office_id: this.res.Data[x].office_id, // office id from raw data
            office_name: this.res.Data[x].office_name, // office name from raw data
          };
          this.countB += 1; // increment 2nd count (for new array entries)
          this.countA = this.countB - 1; // always keeping initial count one less than new entry
          // console.log('In Loop + count: ', x, this.OID);
        } else if (this.OID[this.countA] !== null // else statement for when it is not null
        // extra qualifier to make sure we are only adding new doctors to the list
        && this.OID[this.countA].office_name !== this.res.Data[x].office_name) {
          this.OID[this.countB] = {
            office_id: this.res.Data[x].office_id, // office id from raw data
            office_name: this.res.Data[x].office_name, // office name from raw data
          };
          this.countB += 1; // increment 2nd count (for new array entries)
          this.countA = this.countB - 1; // always keeping initial count one less than new entry
        }
      }
      if (this.OID.length < 2) {
        this.selectedOffice = this.OID[0].office_name;
        store.commit('addSelectedOffice', this.selectedOffice);
        this.officeID = this.OID[0].office_id;
        store.commit('addSelectedOfficeID', this.officeID);
        store.commit('addOID', this.OID);
        this.$router.push('/authorized/newAppt');
      } else {
        store.commit('addOID', this.OID);
        this.$router.push('/authorized/newAppt');
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
    async getPatientAppointments() {
      const results = await AppointmentQuery.getPatientAppointments();
      // console.log(results);
      for (let x = 0; x < results.length; x += 1) {
        const dt = new Date(results[x].StartDate);
        // console.log('Start Date raw: ', dt);
        const dtd = dt.getDay();
        // console.log('Day by number: ', dtd);
        let hours = dt.getHours();
        let minutes = dt.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        const dtt = `${hours}:${minutes} ${ampm}`;
        // eslint-disable-next-line no-await-in-loop
        const formattedDate = await DateTimeFormat.shortDate(results[x].StartDate.split(' ')[0]);
        // console.log('Formatted Date: ', formattedDate.shortDate);
        // console.log('Getting info from state: ', store.state.WeekDay[dtd]);
        this.posts[x] = {
          serviceType: results[x].ServiceTypeDescription,
          startDate: formattedDate.shortDate,
          startDay: store.state.WeekDay[dtd],
          startTime: dtt,
          officeName: results[x].OfficeName,
          doctorName: results[x].ProviderName,
        };
      }
      // console.log('Results', this.posts);
    },
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
  },
  async mounted() {
    this.isLoading = true;
    await this.getPatientAppointments();
    this.isLoading = false;
  },
};
</script>
<style lang="scss" scoped>
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 30px;
  border-bottom: 1px dotted #fff;
  @media (width >= 40em) {
    width: 50%;
  }
}
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 3px;
}
.appointment-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  width: 100%;
  height: auto;
  color: #fff;
  padding-bottom: 20px;
}
</style>
