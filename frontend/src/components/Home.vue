<template>
  <div class="container py-5">
    <div class="mb-3 text-end">
      <router-link to="/form" class="btn btn-primary px-4 py-2">
        Create..
      </router-link>
    </div>

    <UserTable :users="users" @edit="setEdit" @delete="removeUser" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import UserTable from "../components/Table.vue";

const users = ref([]);
const editId = ref(null);

const fetchUsers = async () => {
  const res = await axios.get("http://localhost:5000/api/users");
  users.value = res.data;
};

const setEdit = (user) => {
  // navigation logic for edit (if needed)
};

const removeUser = async (id) => {
  await axios.delete(`http://localhost:5000/api/users/${id}`);
  fetchUsers();
};

onMounted(fetchUsers);
</script>

<style>
/* .container {
  background: #dc5353;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  /* margin-top: 40px; */
/* padding: 15rem 2.5rem; */
/* } */
h2 {
  font-weight: bold;
  letter-spacing: 1px;
  color: #1976d2;
  margin-bottom: 2rem;
}

.btn-primary {
  background: linear-gradient(90deg, #1976d2 60%, #060a0e 100%);
  border: none;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.table {
  /* padding-top: 20px; */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table th {
  background: #1976d2;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f1f8e9;
}
</style>
