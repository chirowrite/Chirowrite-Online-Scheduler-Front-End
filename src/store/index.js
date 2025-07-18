import { createStore } from 'vuex';

export default createStore({
  state: {
    sessionID: 0,
    conClientID: '',
    conOffice: '',
    conDoctor: '',
    conService: '',
    conOfficeID: '',
    conServiceID: '',
    conDoctorID: '',
    conDate: '',
    conShortDate: '',
    conDay: '',
    conTime: '',
    conSendDate: '',
    conPracticeName: '',
    conPracticeLogo: '',
    WeekDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    Month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'],
    loadingStatus: false,
    conErrorReason: '',
    conOID: [],
    conSelectedOffice: '',
    conSelectedOfficeID: '',
  },
  getters: {
    loadingStatus(state) {
      return state.loadingStatus;
    },
  },
  mutations: {
    loadingStatus(state, newLoadingStatus) {
      state.loadingStatus = newLoadingStatus;
    },
    addSelectedOffice(state, selectedOffice) {
      state.conSelectedOffice = selectedOffice;
    },
    addSelectedOfficeID(state, officeID) {
      state.conSelectedOfficeID = officeID;
    },
    addOID(state, OID) {
      state.conOID = OID;
    },
    addSession(state, session) {
      state.sessionID = session;
    },
    addDoctor(state, doctor) {
      state.conDoctor = doctor;
    },
    addService(state, service) {
      state.conService = service;
    },
    addOffice(state, office) {
      state.conOffice = office;
    },
    addDate(state, appDate) {
      state.conDate = appDate;
    },
    addTime(state, appTime) {
      state.conTime = appTime;
    },
    addPracticeName(state, practiceName) {
      state.conPracticeName = practiceName;
    },
    addPracticeLogo(state, practiceLogo) {
      state.conPracticeLogo = practiceLogo;
    },
    addSendDate(state, sendDate) {
      state.conSendDate = sendDate;
    },
    addServiceID(state, serviceID) {
      state.conServiceID = serviceID;
    },
    addOfficeID(state, officeID) {
      state.conOfficeID = officeID;
    },
    addDoctorID(state, doctorID) {
      state.conDoctorID = doctorID;
    },
    addShortDate(state, shortDate) {
      state.conShortDate = shortDate;
    },
    addDay(state, day) {
      state.conDay = day;
    },
    addClientID(state, clientID) {
      state.conClientID = clientID;
    },
    addErrorReason(state, errorReason) {
      state.conErrorReason = errorReason;
    },
  },
  actions: {
  },
  modules: {
  },
});
