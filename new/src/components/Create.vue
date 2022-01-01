<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Add Item</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addItem">
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
            <input
              type="text"
              class="form-control"
              v-model="item.designation"
            />
          </div>
          <div class="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              class="form-control"
              v-model="item.phoneNumber"
            />
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Add Item" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // name: 'AddItem'
  },
  data() {
    return {
      item: {},
    };
  },
  methods: {
    addItem() {
      let uri = "http://localhost:1943/employe/add";
      let headers = { "content-Type": "application/json" };

      this.axios
        .post(uri, this.item, headers)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({ name: "Index" });
          } else {
            alert("faileld");
          }
        })
        .catch((error) => {
          // this.$swal("error");
          return error;
        });
    },
  },
};
</script>