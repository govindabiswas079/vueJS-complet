<template>
  <div>
    <vue-otp-box
      :numberOfBoxes="6"
      color="orange"
      position="center"
      @inputValue="inputValue"
    ></vue-otp-box>
  </div>
</template>

<script>
import VueOtpBox from "vue-otp-box";
import "vue-otp-box/dist/VueOtpBox.css";

export default {
  components: {
    VueOtpBox,
  },
  setup() {},
  data() {
    return {
      otp: undefined,
    };
  },
  // mounted: {},
  methods: {
    inputValue(otp) {
      this.otp = otp;
      // sessionStorage.setItem("otp", this.otp)
      console.log(this.otp);
      const getotp = sessionStorage.getItem("otp");
      if (this.otp === getotp) {
        setTimeout(() => {
          setTimeout(() => {
            console.log("match");
          }, 500);
        }, 1000);
      } else {
        setTimeout(() => {
          setTimeout(() => {
            console.log("not match");
          }, 500);
        }, 1000);
      }
    },
  },
};
</script>
