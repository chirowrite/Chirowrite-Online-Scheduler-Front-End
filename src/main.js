import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import cors from 'cors';
import underscore from 'underscore';
import calendarButton from 'add-to-calendar-button';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(cors).use(VueAxios, axios).use(store)
  .use(calendarButton)
  .use(router)
  .use(underscore)
  .mount('#app');
