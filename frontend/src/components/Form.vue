<template>
  <form @submit.prevent="onSubmit" class="card p-4 mb-4 shadow-sm">
    <div class="row g-3">
      <div class="col-md-4">
        <input
          v-model="form.first_name"
          class="form-control"
          placeholder="First Name"
          required
        />
      </div>

      <!--
      <div class="col-xl-4">
        <input v-model="form.last_name" class="form-flow" placeholder="Last Name" required />
      </div>
      -->
      <div class="col-md-4">
        <input
          v-model="form.last_name"
          class="form-control"
          placeholder="Last Name"
          required
        />
      </div>
      <div class="col-md-4">
        <input v-model="form.dob" type="date" class="form-control" required />
      </div>
      <div class="col-md-6">
        <input
          v-model="form.mobile"
          class="form-control"
          placeholder="Mobile No."
          required
        />
      </div>
      <div class="col-md-6">
        <input
          v-model="form.address"
          class="form-control"
          placeholder="Address"
          required
        />
      </div>
    </div>
    <div class="mt-3 text-end">
      <button type="submit" class="btn btn-success px-4">
        {{ editId ? "Update" : "Add" }}
      </button>
      <button
        v-if="editId"
        type="button"
        class="btn btn-secondary ms-2"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "UserForm",
  props: ["form", "editId"],
  emits: ["submit", "cancel"],
  methods: {
    onSubmit() {
      this.$emit("submit");
    },
  },
};
</script>
