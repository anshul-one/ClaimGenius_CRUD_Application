<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ formatDate(user.dob) }}</td>
            <td>{{ user.mobile }}</td>
            <td>{{ user.address }}</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm me-2"
                @click="$emit('edit', user)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="$emit('delete', user.id)"
              >
                Delete
              </button>
              <!--
              <button class="btn btn-outline-info btn-sm ms-1">
                View
              </button>
              -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// import { defineProps, defineEmits } from "vue";

const props = defineProps(["users"]);
defineEmits(["edit", "delete"]);

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
</script>
