<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="header-container">
    <div class="top-container">
    <div class="logo-container">
      <div class="logo">
        <img v-if="logoData" :src="logoData" alt="Logo"/>
      </div>
    </div>
    <div class="practice-heading" v-if="nameData">
      {{ nameData }}
    </div>
  </div>
  <div class="top-container-2">
    <div class="logout-icon"
    v-if="sessionStarted !== 0"
    @click="logout"
    >
      <img
      :src="require('../../assets/Icons/exit-logout.png')"
      alt="logout icon"
      />
    </div>
    <div class="logout-text"
    v-if="sessionStarted !== 0"
    @click="logout"
    >
      Log Out
    </div>
  </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
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
};

</script>
