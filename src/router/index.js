/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthorizedHomeView from '../components/PatientAppointmentPage.vue';
import AuthorizedNewApptView from '../components/AppointmentPage.vue';
import ConfirmationView from '../components/ConfirmationPage.vue';
import ReviewPage from '../components/ReviewPage.vue';
import WelcomeView from '../components/WelcomePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: WelcomeView,
      meta: { title: 'Chirowrite Online Scheduler' },
    },
    {
      path: '/login',
      component: HomeView,
      meta: { title: 'Chirowrite Online Scheduler: Login' },
    },
    {
      path: '/authorized',
      component: AuthorizedHomeView,
      meta: { title: 'Chirowrite Online Scheduler: Upcoming Appointments' },
    },
    {
      path: '/authorized/newAppt',
      component: AuthorizedNewApptView,
      meta: { title: 'Chirowrite Online Scheduler: Book New Appointment' },
    },
    {
      path: '/confirmation',
      component: ConfirmationView,
      meta: { title: 'Chirowrite Online Scheduler: Confirm Appointment' },
    },
    {
      path: '/review',
      // path: '/',
      component: ReviewPage,
      meta: { title: 'Chirowrite Online Scheduler: Review Appointment' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Get the title from the route meta field or use a default title
  const pageTitle = to.meta.title || 'Chirowrite Online Scheduler';

  // Set the document title
  document.title = pageTitle;

  next(); // Proceed with navigation
});

export default router;
