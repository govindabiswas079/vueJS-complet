<template>
  <div>
    <h1>Items</h1>

    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Email</td>
          <td>Designation</td>
          <td>Phone Number</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.Id">
          <td>{{ item.Id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.designation }}</td>
          <td>{{ item.phoneNumber.split(/(\d{4})/).join(' ').trim() }}</td>
          <td>

            <router-link
              :to="{ name: 'Show', params: { id: item.Id }}"
              class="btn btn-primary"
              >Show</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },

  created: function () {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      let URL = "http://localhost:1010/employe/getemploye/";

      this.axios
        .get(URL)
        .then((response) => {
          this.items = response.data;
        })
        .catch(function (error) {
          return error;
        });
    },

    deleteItem(id) {
      let uri = `http://localhost:1010/employe/delete/${id}`;
      this.items.splice(id, 1);
      this.axios
        .delete(uri)
        .then((response) => {
          return response;
        })
        .catch(function (error) {
          return error;
        });
    },
  },
};
</script>