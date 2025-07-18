<template>
  <div class="upcoming-appointment-card">
    <div class="top-line">
      <div class="info-container-1">
        {{ post.startDay }}
      </div>
      <div class="info-container-1">
        {{ post.startDate }}
      </div>
      <div class="info-container-1">
        {{ post.startTime }}
      </div>
      <div class="info-container-1" v-if="!mobile">
        {{ post.officeName }}
      </div>
      <div class="info-container-2" v-if="!mobile">
        {{ post.doctorName }}
        <span class="light">
          {{ post.serviceType }}
        </span>
      </div>
    </div>
    <div class="bottom-line" v-if="mobile">
      <div class="info-container-2">
        {{ post.officeName }}
      </div>
      <div class="info-container-2">
        {{ post.doctorName }}
        <span class="light">
          {{ post.serviceType }}
        </span>
      </div>
    </div>
  </div>
  <div class="big-spacer"></div>
</template>

<script>
export default {
  props: ['post'],
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

<style lang="scss" scoped>
.upcoming-appointment-card {
  display: flex;
  flex-direction: column;
  width: 83%;
  height: 90px;
  border-radius: 20px;
  padding-left: 7px;
  font-size: .9rem;
  color: #00589C;
  background-color: #fff;
  @media (width >= 40em) {
    height: 60px;
  }
}
.top-line {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 45px;
  align-items: center;
  padding-top: 3px;
  gap: 10px;
  color: #fff;
  @media (width >= 40em) {
    height: 60px;
  }
}
.bottom-line {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 45px;
  align-items: center;
  padding-left: 5px;
  color: #000;
}
.info-container-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27%;
  height: 30px;
  color: #00589C;
  @media (width >=40em) {
    width: 20%;
    height: 60px;
  }
}
.info-container-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 60px;
  color: #00589C;
  .light {
    font-weight: 300;
    color: #000;
  }
}
</style>
