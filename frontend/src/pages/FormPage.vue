<template>
  <body
    style="
      height: 100%;
      padding-top: 100px;
      padding-bottom: 200px;
      background: whitesmoke;
    "
  >
    <div class="container">
      <h2 class="text-bg-success text-wrap mb-6 text-center">
        {{ editId ? "Update Details" : "Add User Details" }}
      </h2>
      <hr />
      <UserForm
        :errors="errors"
        :form="form"
        :editId="editId"
        @submit="handleSubmit"
        @cancel="goBack"
      />
    </div>
  </body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import UserForm from "../components/Form.vue";

const route = useRoute();
const router = useRouter();
const errors = ref({});
const editId = ref(route.query.id || null);
const form = ref({
  first_name: "",
  last_name: "",
  dob: "",
  mobile: "",
  address: "",
});

const validateUser = (user) => {
  errors.value = {};
  let valid = true;
  // First name
  if (!user.first_name) {
    errors.value.first_name = "First name is required.";
    valid = false;

    // this will ensure that first name should only contain letters.
  } else if (!/^[A-Za-z ]+$/.test(user.first_name)) {
    errors.value.first_name = "First name must contain only letters.";
    valid = false;
  }

  // form validation for Last name
  if (!user.last_name) {
    errors.value.last_name = "Last name is required.";
    valid = false;

    // this will ensure that last name should only contain letters.
  } else if (!/^[A-Za-z ]+$/.test(user.last_name)) {
    errors.value.last_name = "Last name must contain only letters.";
    valid = false;
  }

  // form validation for Date of Birth
  if (!user.dob) {
    errors.value.dob = "Date of birth is required.";
    valid = false;
  } else {
    const today = new Date(); // function to get today's date
    const dob = new Date(user.dob);
    if (dob >= today) {
      errors.value.dob = "Invalid Date Of Birth.";
      valid = false;
    }
  }

  // form validation for Mobile Number
  if (!user.mobile) {
    errors.value.mobile = "Mobile number is required.";
    valid = false;

    // this will ensure that mobile number should only contain digits.
  } else if (!/^\d{10}$/.test(user.mobile)) {
    errors.value.mobile = "Mobile number must be 10 digits.";
    valid = false;
  }

  // form validation for Address
  if (!user.address) {
    errors.value.address = "Address is required.";
    valid = false;
  }

  return valid;
};

const fetchUserById = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/users/${id}`);

  return res.data.data;
};

onMounted(async () => {
  if (editId.value) {
    const userData = await fetchUserById(editId.value);
    form.value = {
      ...userData,
      dob: userData.dob ? userData.dob.slice(0, 10) : "",
    };
  }
});

const handleSubmit = async () => {
  if (!validateUser(form.value)) {
    return;
  }
  if (editId.value) {
    await axios.put(
      `http://localhost:5000/api/users/${editId.value}`,
      form.value
    );
  } else {
    await axios.post("http://localhost:5000/api/users", form.value);
  }
  goBack();
};

function goBack() {
  router.push("/");
}
</script>
