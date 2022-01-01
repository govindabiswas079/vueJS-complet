<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Edit Item</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="updateItem">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="item.name" />
          </div>

          <div class="form-group">
            <label>Email:</label>
            <input type="text" class="form-control" v-model="item.email" />
          </div>

          <div class="form-group">
            <label>Designation:</label>
            <input type="text" class="form-control" v-model="item.designation"/>
          </div>
          <div class="form-group">
            <label>Phone Number:</label>
            <input type="text" class="form-control" v-model="item.phoneNumber"/>
          </div>

          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Update Item" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {},
    };
  },

  created: function () {
    this.getItem();
  },

  methods: {
    getItem() {
      let uri = "http://localhost:1010/employe/get/" + this.$route.params.id;
      this.axios.post(uri).then((response) => {
        const newObject = Object.assign({}, ...response.data);
        this.item = newObject;
      });
    },

    updateItem() {
      let uri = "http://localhost:1010/employe/update/" + this.$route.params.id;
      this.axios.put(uri, this.item).then((response) => {
        this.$router.push({ name: "Index" });
        return response;
      });
    },
  },
};
</script>