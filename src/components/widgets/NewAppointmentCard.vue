<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="new-confirm-card">
    <div class="confirm-info-2">
      <div class="doctor-details">
        {{ Doctor }}
      </div>
      <div class="office-details">
        {{ Office }}
      </div>
    </div>
    <div class="confirm-info-1">
      <div class="appointment-details">
        {{ day }}
      </div>
      <div class="appointment-details">
        {{ date }}
      </div>
      <div class="appointment-details">
        {{ ApptTime }}
      </div>
      <div class="appointment-details">
        {{ Service }}
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
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
  },
};
</script>

<style lang="scss" scoped>
.new-confirm-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 70%;
  border-radius: 15px;
}

.confirm-info-1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
  width: 100%;
  height: 150px;
  background-color: #fff;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 50px;
}

.confirm-info-2 {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60px;
  background-color: #fff;
  padding-left: 10px;
  padding-right: 10px;
}

.appointment-details {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 35px;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: lightgray;
  color: #00589C;
  font-size: 14px;
}

.doctor-details {
  font-size: 18px;
  font-weight: 500;
  padding-top: 7px;
  padding-bottom: 10px;
}

.office-details {
  font-size: 14px;
  font-weight: 300;
  color: grey;
}
.back-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding-top: 10px;
  padding-left: 5px;
}

.back-button-icon {
  display: flex;
  align-items: flex-start;
  width: 20px;
  height: 20px;
  object-fit: contain;
  cursor: pointer;
}

.back-button-text {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  width: auto;
  padding-left: 10px;
  cursor: pointer;
  font-size: 14px;
}
.spacer {
  width: 100%;
  height: 30px;
}
</style>
