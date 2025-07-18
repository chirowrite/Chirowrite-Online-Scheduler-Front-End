import store from '../store';
// The query endpoint defined outside the class to make it easy to change if need be.
const API = {
  baseWelcome: 'https://softworxsolutions.com/swapi/api/onlineschedule/welcomestart?',
  baseValidate: 'https://softworxsolutions.com/swapi/api/onlineschedule/validate?',
  baseInfo: 'https://softworxsolutions.com/swapi/api/onlineschedule/information?',
  submitappt: 'https://softworxsolutions.com/swapi/api/onlineschedule/createappointment',
  patientAppt: 'https://softworxsolutions.com/swapi/api/onlineschedule/getpatientappointments?',
};

// Class that will hold all queries to the API
class APIQuery {
  // static async welcomeScreen() {
  static async welcomeScreen(clientID) {
    return new Promise((resolve) => {
      const base = API.baseWelcome;
      const client = `clientid=${clientID}`;
      // const client = 'clientid=hoQN3shDOSco7AGYMIH5TIGdqEg=';
      const url = (`${base + client}`);
      console.log('URL: ', url);
      fetch(url, {
        method: 'GET',
      })
        .then((result) => result.json())
        .then((json) => resolve(json))
        .catch((err) => console.log(err));
    });
  }

  // Takes in three values, the client ID, the username, and the password
  static async getValidation(clientID, username, password) {
    // Sets up an async call to the API so that it waits on an answer before moving forward
    return new Promise((resolve) => {
      // Puts all the parts together so that we can receive a reply from the API
      const url = API.baseValidate;
      // Using a native fetch to query the API and setting parameters
      console.log('Sending Request', clientID);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          clientid: clientID,
          Phone: username,
          Pin: password,
        }),
      })
        .then((result) => result.json()) // Getting the result back
        .then((json) => resolve(json)) // putting it in JSON form
        .catch((err) => console.log(err)); // dealing with any errors
    });
  }

  static async getAppointmentData() {
    return new Promise((resolve) => {
      const base = API.baseInfo;
      const client = `UserSession=${store.state.sessionID}`;
      const url = (`${base + client}`);
      console.log('Sending Request');
      fetch(url, {
        method: 'GET',
      })
        .then((result) => result.json())
        .then((json) => resolve(json))
        .catch((err) => console.log(err));
    });
  }

  static async getPatientAppointments() {
    console.log('Getting Patient Appointments');
    return new Promise((resolve) => {
      const maxCount = 3;
      const base = API.patientAppt;
      const client = `UserSession=${store.state.sessionID}&maxcount=${maxCount}`;
      const url = (`${base + client}`);
      console.log('Sending Request');
      fetch(url, {
        method: 'GET',
      })
        .then((result) => result.json())
        .then((json) => resolve(json))
        .catch((err) => console.log(err));
    });
  }

  static async sendInformation(sessionID, officeID, doctorID, serviceID, date, time) {
    return new Promise((resolve) => {
      const base = API.submitappt;
      const datetime = `${date} ${time}`;
      const data = {
        UserSession: sessionID.trim(),
        OfficeID: officeID,
        ProviderId: doctorID,
        ServiceTypeId: serviceID,
        StartDate: datetime,
      };
      fetch(base, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(
          data,
        ),
      })
        .then((result) => result.json())
        .then((json) => resolve(json))
        .catch((err) => console.log(err));
    });
  }
}

// Exporting the class so that it can be used throughout the web app
export default APIQuery;
