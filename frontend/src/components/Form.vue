<template>
  <form @submit.prevent="onSubmit" class="card p-4 mb-4 shadow-sm">
    <div class="row g-3">
      <div class="col-md-4">
        <div class="form-floating">
          <input
            v-model="form.first_name"
            class="form-control"
            id="firstName"
            placeholder="First Name"
          />
          <label for="firstName">First Name</label>
          <span v-if="errors.first_name" class="text-danger small">
            {{ errors.first_name }}
          </span>
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-floating">
          <input
            v-model="form.last_name"
            class="form-control"
            id="lastName"
            placeholder="Last Name"
          />
          <label for="lastName">Last Name</label>
          <span v-if="errors.last_name" class="text-danger small">
            {{ errors.last_name }}
          </span>
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-floating">
          <input
            v-model="form.dob"
            type="date"
            class="form-control"
            id="dob"
            placeholder="Date of Birth"
          />
          <label for="dob">Date of Birth</label>
          <span v-if="errors.dob" class="text-danger small">
            {{ errors.dob }}
          </span>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-floating">
          <input
            v-model="form.mobile"
            class="form-control"
            id="mobile"
            placeholder="Mobile Number"
          />
          <label for="mobile">Mobile No.</label>
          <span v-if="errors.mobile" class="text-danger small">
            {{ errors.mobile }}
          </span>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-floating">
          <input
            v-model="form.address"
            class="form-control"
            id="address"
            placeholder="Address"
          />
          <label for="address">Address</label>
          <span v-if="errors.address" class="text-danger small">
            {{ errors.address }}
          </span>
        </div>
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
        @click="emitCancel"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps(["form", "editId", "errors"]);
const emit = defineEmits(["submit", "cancel"]);

function onSubmit() {
  emit("submit");
}

function emitCancel() {
  emit("cancel");
}
</script>
