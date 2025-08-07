<template>
  <div class="container py-5">
    <hr />
    <h2
      class="badge text-bg-dark text-wrap mb-4 text-center"
      style="width: 81rem; height: 50px; font-size: 2rem; font-weight: bold"
    >
      CGI CRUD Application
    </h2>
    <hr />

    <UserForm
      :form="form"
      :editId="editId"
      @submit="handleSubmit"
      @cancel="resetForm"
    />

    <UserTable :users="users" @edit="setEdit" @delete="removeUser" />
  </div>
</template>

<script>
import axios from "axios";
import UserForm from "./components/Form.vue";
import UserTable from "./components/Table.vue";

export default {
  name: "App",
  components: {
    UserForm,
    UserTable,
  },
  data() {
    return {
      users: [],
      editId: null,
      form: {
        first_name: "",
        last_name: "",
        dob: "",
        mobile: "",
        address: "",
      },
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const res = await axios.get("http://localhost:5000/api/users");
      this.users = res.data;
    },
    async handleSubmit() {
      if (this.editId) {
        await axios.put(
          `http://localhost:5000/api/users/${this.editId}`,
          this.form
        );
      } else {
        await axios.post("http://localhost:5000/api/users", this.form);
      }
      this.resetForm();
      this.fetchUsers();
    },
    setEdit(user) {
      this.editId = user.id;
      this.form = { ...user };
    },
    async removeUser(id) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      this.fetchUsers();
    },
    resetForm() {
      this.form = {
        first_name: "",
        last_name: "",
        dob: "",
        mobile: "",
        address: "",
      };
      this.editId = null;
    },
  },
};
</script>
<style>
.container {
  background-color: #e3f2fd;
  border-radius: 5%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  /* height: 0px; */
}
.container form {
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  padding: 1.5rem;
}
.container table {
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  padding: 1.5rem;
}
body {
  background-color: #e3f2fd;
}
</style>
