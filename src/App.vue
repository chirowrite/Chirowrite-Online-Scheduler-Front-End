<template>
  <div class="main-container">
    <HeaderWidget v-if="desktop || tablet"></HeaderWidget>
    <router-view/>
  </div>
</template>

<script>
// Header Widget import
import HeaderWidget from './components/widgets/HeaderWidget.vue';

export default {
  name: 'welcomePage',
  components: {
    HeaderWidget,
  },
  data() {
    return {
      windowWidth: null,
      mobile: null,
      tablet: null,
      desktop: null,
    };
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
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
  },

};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:wght@300;400;500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#000;
}

#app {
  display: flex;
  min-height: 100vh;
}

.header-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  background: url('./assets/Backgrounds/stardust.png');
  @media (width >= 40em) {
    border-radius: 15px;
  }
}
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  @media (width >= 40em) {
    padding-top: 5px;
    padding-bottom: 5px;
  }
}

.container {
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('./assets/Backgrounds/moroccan-flower-dark.png');
  @media (width >= 40em) {
    border-radius: 15px;
  }
}

.top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 59.5%;
  height: 60px;
  padding-left: 32px;
}

.top-container-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 40%;
  height: 60px;
  padding-right: 32px;
}

.instructions {
  font-size: 2rem;
  color: #fff;
  padding: 30px;
}

.heading-label {
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 20px;
  color: #fff;
}

.logo-container{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  align-items: flex-start;
}
.logo{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.practice-heading{
  font-size: 1.5vw;
  font-weight: 400;
  color: #fff;
  display: flex;
  justify-content: center;
}

.page-space {
  width: 50px;
  height: 5px;
}

.big-spacer {
  width: 50px;
  height: 10%;
}

.tab {
  width: 100%;
  height: 5%;
}

.selection {
  padding-top: 20px;
  padding-left: 15px;
}

.selection-text {
  font-size: 1.25rem;
  // color: #636161;
  color: #000;
  padding-bottom: 7px;
}

.logout-container {
  display: flex;
  flex-direction: row;
  height: 60px;
  width: 100%;
}

.logout-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.logout-text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.second-button {
  visibility: hidden;
  cursor: pointer;
  width: 90%;
  height: 35px;
  border-radius: 15px;
  background-color: transparent;
  color: #fff;
  font-size: 14px;
  @media (width >= 40em) {
    width: 35%;
  }
}
.alternate-button {
  cursor: pointer;
  width: 90%;
  height: 35px;
  border-radius: 15px;
  background-color:#004EAA;
  color: #fff;
  font-size: 1rem;
  @media (width >= 40em) {
    width: 35%;
  }
}
.info-containers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%
}
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 40%;
  width: 95%;

  .logo {
    width: 50%;
    height: 50%;
    object-fit: contain;
  }
  .practice-heading {
    font-size: 1.75rem;
    font-weight: 400;
    padding-left: 5px;
    color: #fff;
    display: flex;
    text-align:center;
  }
}
.button-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 60%;
  width: 95%;
  .blurb {
    font-size: 2rem;
    color: #fff;
    display: flex;
    text-align: center;
  }
  .sub-blurb {
    font-size: 1rem;
    color: #fff;
    display: flex;
    text-align: center;
    padding-bottom: 15px;
  }
}
.appointment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 10px;
}
.banner-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 95%;
  height: 70px;
}
.logout-banner {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 20px;
  padding-bottom: 5px;
  object-fit: contain;
}
.logo-practice-banner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  .logo-container {
    display: flex;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    .logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.practice-name-container {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    padding-left: 10px;
    color: #fff;
  }
.logout-icon {
  width: auto;
  height: 20px;
  cursor: pointer;
  color: #fff;
}
.book-appointment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  width: 90%;
  height: 25%;
  font-size: 2rem;
  color: #fff;
}
.new-appointment-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  height:80%;
  border-radius: 20px;
  background-color: #fff;
  @media (width >=40em) {
    width: 35%;
  }
}
.review-appointment-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  height:50%;
  border-radius: 20px;
  background-color: #fff;
  @media (width >=40em) {
    width: 35%;
  }
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  height: 15%;
  color: #fff;
}
button {
  cursor: pointer;
  width: 90%;
  height: 35px;
  border-radius: 15px;
  background-color: #fff;
  color: #004EAA;
  font-size: 14px;
  @media (width >= 40em) {
    width: 35%;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
