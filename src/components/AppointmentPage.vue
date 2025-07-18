<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="main-container">
    <div class="container">
      <div class="appointment-container">
        <div class="banner-container" v-if="mobile">
          <div class="logout-banner" v-if="sessionStarted !== 0">
            <div class="logout-icon">
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
          New Appointment
          <div class="big-spacer"></div>
        </div>
        <base-spinner v-show="isLoading"></base-spinner>
        <div class="new-appointment-container" v-show="!isLoading">
          <div class="progress-bar">
            <div class="progress-meter-1"></div>
            <div class="progress-meter-2"></div>
            <div class="progress-meter-3"></div>
          </div>
          <div class="selection">
            <div class="selection-text">
              Choose an Office
            </div>
            {{ selectedOffice }}
            <select v-model="selectedOffice" class="select-style" >
              <option disabled value="Choose an Office">Choose an office</option>
              <option v-for="(office_id) in OID" :key="office_id">
                  {{ office_id.office_name }}
              </option>
            </select>
          </div>
          <div class="selection">
            <div class="selection-text">
              Choose a Doctor
            </div>
            <select v-model="selectedDoctor" class="select-style">
              <option disabled value="Choose a doctor">Choose a doctor</option>
              <option v-for="(doc_id) in PID" :key="doc_id">
                {{ doc_id.doctor_name }}
              </option>
            </select>
          </div>
          <div class="selection">
            <div class="selection-text">
              Choose a Service
            </div>
            <select v-model="selectedService" class="select-style">
              <option disabled value="Choose a service">Choose a service</option>
              <option v-for="(service_id) in SID" :key="service_id">
                {{ service_id.service_name }}
              </option>
            </select>
          </div>
          <div class="selection">
            <div class="selection-text">
              Choose a Date
            </div>
            <select v-model="selectedDate" class="select-style">
              <option disabled value="Choose a Date">Choose a date</option>
              <option v-for="(date) in UniqueDates" :key="date">
                {{ date.day }}, {{ date.date }}
              </option>
            </select>
          </div>
          <div class="selection">
            <div class="selection-text">
              Choose a Time
            </div>
            <select v-model="selectedTime" class="select-style">
              <option disabled value="Choose a Time">Choose a time</option>
              <option v-for="(time) in UniqueTime" :key="time">
                {{ time.time }}
              </option>
            </select>
          </div>
          <div class="button-container">
            <button @click="submit">Book Appointment</button>
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
import store from '@/store';
import AppointmentQuery from '../js/query';
import BaseSpinner from './widgets/BaseSpinner.vue';

export default {
  components: {
    BaseSpinner,
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
      loadData: '', // Looks for when the appointment data is loaded
      selectedOffice: '', // input from drop down to select office
      selectedDoctor: '', // input from drop down to select doctor
      selectedService: '', // input from drop down to select type of service
      selectedDate: '', // input from drop down to select date of appointment
      selectedTime: '', // input from drop down to select time of appointment
      officeID: '', // doctors office ID
      doctorID: '', // ID of doctor selected
      serviceID: '', // ID of service selected
      res: [], // raw appointment data from AppointmentQuery.GetAppointmentData function
      countA: 0, // count for a FOR-Loop getAppointments
      countB: 0, // count for a FOR-Loop getAppointments
      countC: 0, // count for a FOR-Loop
      countD: 0, // count for a FOR-Loop
      countE: 0, // count for a FOR-Loop
      countF: 0, // count for a FOR-Loop
      countG: 0, // count for a FOR-Loop
      countH: 0,
      countJ: 0,
      OID: [], // Array of Office ID's with Office Name
      PIDRaw: [],
      PID: [], // Array of Provider ID's with Provider Names
      SID: [], // Array of Service ID's with Service Description Names
      Dates: [], // Array of available appointment dates
      UniqueDates: [], // ??
      UniqueTime: [], // ??
      /* Weekday Array to name all the days in the week */
      WeekDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      /*  Month Array to name all the months in the year */
      Month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'],
    };
  },
  async created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
    this.isLoading = true;
    const fin = await this.getAppointments();
    if (fin) {
      console.log('In Fin');
      const def = await this.defaultOffice();
      console.log('def value: ', def);
      if (def) {
        setTimeout(() => {
          console.log('Default Office: ', this.selectedOffice);
          this.isLoading = false;
        }, 2 * 1000);
      }
    }
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
    defaultOffice() {
      if (this.OID.length < 2) {
        this.selectedOffice = '';
        this.officeID = '';
        setTimeout(() => {
          this.selectedOffice = this.OID[0].office_name;
          this.officeID = this.OID[0].office_id_id;
        }, 1 * 1000);
        this.loadData = true;
      } else {
        this.loadData = false;
      }
      return this.loadData;
    },
    /*
      Initial method that pull the raw appointment data and organizes it into arrays necessary
      for the clients to make appointments.
    */
    async getAppointments() {
      // calls getAppointmentData function and adds raw data to res variable
      // information within the () is currently hardcoded client ID, will be updated
      this.res = await AppointmentQuery.getAppointmentData();
      // FOR-Loop that adds Provider ID(doc_id) and Provider Name(doctor_name) to PID Array
      console.log('Raw Appointment Data: ', this.res);
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
      const run = true;
      return run;
    },
    async submit() { // function to send appointment to API
      const revertDate = new Date(this.selectedDate);
      const newMonth = revertDate.getMonth() + 1;
      const newYear = revertDate.getFullYear();
      const newDay = revertDate.getDate();
      const revertDateFull = `${newYear}-${newMonth}-${newDay}`;
      store.commit('addOffice', this.selectedOffice); // office
      store.commit('addDoctor', this.selectedDoctor); // doctor
      store.commit('addService', this.selectedService); // service
      store.commit('addDate', this.selectedDate); // date
      store.commit('addTime', this.selectedTime); // time
      store.commit('addSendDate', revertDateFull);
      store.commit('addOfficeID', this.officeID);
      store.commit('addServiceID', this.serviceID);
      store.commit('addDoctorID', this.doctorID);
      this.$router.push('/confirmation');
    },
  },
  // runs this function as the page is loaded
  watch: {
    // watches for an input of appointment time
    selectedOffice(newVal, oldVal) {
      // console.log('In Selected Office: ', this.OID);
      if (newVal !== oldVal) {
        this.countH = 0;
        this.countJ = 0;
        this.selectedDoctor = '';
        this.selectedService = '';
        this.selectedDate = '';
        this.selectedTime = '';
        this.PID = [];
        this.PIDRaw = [];
        for (let r = 0; r < this.OID.length; r += 1) {
          if (this.OID[r].office_name === newVal) {
            this.officeID = this.OID[r].office_id;
          }
        }
        for (let s = 0; s < this.res.Data.length; s += 1) {
          if (!this.PIDRaw[this.countH] && this.res.Data[s].office_id === this.officeID) {
            this.PIDRaw[this.countJ] = {
              doc_id: this.res.Data[s].provider_id, // doctors id from raw data
              doctor_name: this.res.Data[s].provider_name, // doctors name from raw data
            };
            this.countJ += 1; // increments the intial PID counter
            this.countH = this.countJ - 1;
          } else if (this.PIDRaw[this.countH] !== null
            && this.res.Data[s].office_id === this.officeID
            && this.res.Data[s].provider_id !== this.PIDRaw[this.countH].doc_id) {
            this.PIDRaw[this.countJ] = {
              doc_id: this.res.Data[s].provider_id, // doctors id from raw data
              doctor_name: this.res.Data[s].provider_name, // doctors name from raw data
            };
            this.countJ += 1;
            this.countH = this.countJ - 1;
          }
        }
        // take duplicates out of array
        this.PID = Array.from(new Set(this.PIDRaw.map((a) => a.doc_id)))
          // eslint-disable-next-line camelcase
          .map((doc_id) => this.PIDRaw.find((a) => a.doc_id === doc_id));
        // this.PID = _.uniq(this.PIDRaw);
        console.log('In Selected Office PID: ', this.PID);
        if (this.PID.length < 2) {
          this.selectedDoctor = '';
          this.doctorID = '';
          setTimeout(() => {
            this.selectedDoctor = this.PID[0].doctor_name;
            this.doctorID = this.PID[0].doc_id;
          }, 0.3 * 1000);
        }
      }
    },
    selectedDoctor(newVal, oldVal) {
      if (newVal !== oldVal) {
        // Reset values every time a new value is selected
        // Hide all selections that are being reset
        this.countC = 0;
        this.countD = 0;
        this.selectedService = '';
        this.selectedDate = '';
        this.selectedTime = '';
        this.doctorID = '';
        this.UniqueDates = [];
        this.UniqueTime = [];
        this.SID = [];
        // console.log('PID Length: ', this.PID.length);
        for (let w = 0; w < this.PID.length; w += 1) {
          if (this.PID[w].doctor_name === newVal) {
            this.doctorID = this.PID[w].doc_id;
          }
          // this.showService = true;
        }
        for (let y = 0; y < this.res.Data.length; y += 1) {
          if (!this.SID[this.countC] && this.res.Data[y].provider_id === this.doctorID
            && this.res.Data[y].office_id === this.officeID
          ) {
            this.SID[this.countD] = {
              service_id: this.res.Data[y].service_type_id,
              service_name: this.res.Data[y].service_description,
            };
            this.countD += 1;
            this.countC = this.countD - 1;
          } else if (this.SID[this.countC] !== null
            && this.res.Data[y].provider_id === this.doctorID
            && this.res.Data[y].office_id === this.officeID
            && this.res.Data[y].service_type_id !== this.SID[this.countC].service_id) {
            this.SID[this.countD] = {
              service_id: this.res.Data[y].service_type_id,
              service_name: this.res.Data[y].service_description,
            };
            this.countD += 1;
            this.countC = this.countD - 1;
          }
        }
        if (this.SID.length < 2) {
          this.selectedService = '';
          this.serviceID = '';
          setTimeout(() => {
            this.selectedService = this.SID[0].service_name;
            this.serviceID = this.SID[0].service_id;
          }, 0.3 * 1000);
        }
        // console.log('SID Results: ', this.SID);
        // console.log('Selected Doctor in Doctor: ', this.selectedDoctor);
        // console.log('Selected Doctor ID: ', this.doctorID);
      }
    },
    async selectedDate(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.selectedTime = '';
        this.UniqueTime = [];
        this.countG = 0;
        const truncDate = this.selectedDate.split(' ');
        const truncDateFull = truncDate.slice(1);
        const truncDateFinal = truncDateFull.join(' ');
        for (let p = 0; p < this.Dates.length; p += 1) {
          if (truncDateFinal === this.Dates[p].date) {
            this.UniqueTime[this.countG] = {
              time: this.Dates[p].time,
            };
            this.countG += 1;
          }
        }
      }
      // console.log('Unique Times: ', this.UniqueTime);
    },
    async selectedService(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.selectedDate = '';
        this.selectedTime = '';
        this.Dates = [];
        this.UniqueDates = [];
        this.countE = 0;
        this.countF = 0;
        for (let v = 0; v < this.SID.length; v += 1) {
          if (this.SID[v].service_name === newVal) {
            this.serviceID = this.SID[v].service_id;
          }
        }
        for (let a = 0; a < this.res.Data.length; a += 1) {
          if (this.res.Data[a].provider_id === this.doctorID
            && this.res.Data[a].service_type_id === this.serviceID) {
            const dt = new Date(this.res.Data[a].slot_dt);
            // console.log('Raw Date: ', dt);
            const dtm = dt.getMonth();
            const dtd = dt.getDay();
            const dtdt = dt.getDate();
            const dty = dt.getFullYear();
            const month = this.Month[dtm];
            const shortDate = `${month} ${dtdt} ${dty}`;
            let hours = dt.getHours();
            let minutes = dt.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours %= 12;
            hours = hours || 12;
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            const dtt = `${hours}:${minutes} ${ampm}`;
            this.Dates[this.countE] = {
              date: shortDate,
              time: dtt,
              month: this.Month[dtm],
              day: this.WeekDay[dtd],
            };
            this.countE += 1;
          }
        }
      }
      // console.log('Dates: ', this.Dates);
      for (let g = 0; g < this.Dates.length; g += 1) {
        // console.log('For Counter: ', g);
        if (g < 1) {
          this.UniqueDates[g] = {
            date: this.Dates[g].date,
            day: this.Dates[g].day,
          };
        } else if (this.UniqueDates[this.countF].date !== this.Dates[g].date) {
          this.countF += 1;
          this.UniqueDates[this.countF] = {
            date: this.Dates[g].date,
            day: this.Dates[g].day,
          };
        }
      }
      // console.log('Unique Dates: ', this.UniqueDates);
      // this.dateShowToggle();
    },
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
  background-color: #b3b3b3;
}

.progress-meter-3 {
  width: 90%;
  height: 10px;
  border-radius: 15px;
  background-color: #b3b3b3;
}

.selection {
  padding-top: 20px;
  padding-left: 15px;
}

.selection-text {
  font-size: 13px;
  color: #000;
  padding-bottom: 5px;
}

.select-style {
  display: block;
  width: 90%;
  height: 30px;
  border-radius: 8px;
  padding-left: 20px;
  padding-top: 10px;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  padding-top: 20px;
}

button {
  cursor: pointer;
  width: 95%;
  height: 35px;
  border-radius: 15px;
  background-color: #ede7e7;
  color: #004EAA;
  font-size: 14px;
  padding-left: 0px;
}

li {
  color: black;
  list-style-type: none;
  padding: 20px;
}
</style>
