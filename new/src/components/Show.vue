<script>
export default {
  data() {
    return {
      items: {},
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
        this.items = newObject;
      });
    },

    deleteItem(id) {
      let uri = `http://localhost:1010/employe/delete/${id}`;
      this.axios
        .delete(uri)
        .then((response) => {
          this.$router.push({ name: "Index" });
          return response;
        })
        .catch(function (error) {
          return error;
        });
    },
  },
};
</script>

<template>
  <div>
    <div class="card" style="width: 18rem">
      <div class="card-header">Featured</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <span style="color: red">Id :</span> {{ items.Id }}
        </li>
        <li class="list-group-item">
          <span style="color: red">Name :</span> {{ items.name }}
        </li>
        <li class="list-group-item">
          <span style="color: red">Email :</span> {{ items.email }}
        </li>
        <li class="list-group-item">
          <span style="color: red">Designation :</span> {{ items.designation }}
        </li>
        <li class="list-group-item">
          <span style="color: red">Phone Number :</span> {{ items.phoneNumber }}
        </li>
        <li class="list-group-item">
          <router-link
            :to="{ name: 'Edit', params: { id: items.Id } }"
            class="btn btn-primary"
            >Edit</router-link
          >

          <button
            style="margin-left: 8px"
            class="btn btn-danger"
            v-on:click="deleteItem(items.Id)"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
    <!-- <qrcode
      v-model="items.email"
      :options="{ width: 200 }"
    ></qrcode> -->
  </div>
</template>

