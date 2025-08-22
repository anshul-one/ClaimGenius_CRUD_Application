<template>
  <body
    style="
      height: 100%;
      padding-top: 100px;
      padding-bottom: 200px;
      background: whitesmoke;
    "
  >
    <div class="container py-5" style="margin-top: 100pz">
      <h2 class="text-bg-primary text-wrap mb-6 text-center">
        CGI CRUD Application
      </h2>
      <hr />
      <div class="mb-3 text-end">
        <router-link to="/form" class="btn btn-primary">
          Create New Entry
        </router-link>
      </div>
      <UserTable :users="users" @edit="editUser" @delete="removeUser" />
    </div>
  </body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import UserTable from "../components/Table.vue";

const users = ref([]);
const router = useRouter();

const fetchUsers = async () => {
  const res = await axios.get("http://localhost:5000/api/users");
  users.value = res.data.data;
};

const editUser = (user) => {
  router.push({ path: "/form", query: { id: user.id } });
};

const removeUser = async (id) => {
  await axios.delete(`http://localhost:5000/api/users/${id}`);
  fetchUsers();
};

onMounted(fetchUsers);
</script>
