<template>
  <div>
    <input type="file" accept="image/jpeg/*" @change="uploadImage()" />

    <qrcode-stream @decode="onDecode"></qrcode-stream>

    <!-- <div>
      <vrcode
        :download="{
          text: 'Download',
          filename: 'file-name.png',
          visible: false,
          type: 'image/png',
        }"
        value="config config config config config config config config config config config"
        :options="{
          size: 200,
          level: 'Q',
        }"
      ></vrcode>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {},

  methods: {
    uploadImage() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        console.log(rawImg);
        this.config = rawImg;
      };
      reader.readAsDataURL(file);
      console.log(file);
    },

    onDecode(decodedString) {
      console.log(decodedString);
    },

    data() {
      return {
        config: "",
      };
    },
  },
};
</script>
