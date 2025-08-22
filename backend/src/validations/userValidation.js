export const validateUser = (req, res, next) => {
  const { first_name, last_name, dob, mobile, address } = req.body;
  const errors = [];

  // First name
  if (!first_name) {
    errors.push({ field: "first_name", message: "First name is required." });
  } else if (!/^[A-Za-z ]+$/.test(first_name)) {
    errors.push({
      field: "first_name",
      message: "First name must contain only letters and spaces.",
    });
  }

  // Last name
  if (!last_name) {
    errors.push({ field: "last_name", message: "Last name is required." });
  } else if (!/^[A-Za-z ]+$/.test(last_name)) {
    errors.push({
      field: "last_name",
      message: "Last name must contain only letters and spaces.",
    });
  }

  // Date of Birth
  if (!dob) {
    errors.push({ field: "dob", message: "Date of birth is required." });
  } else {
    const today = new Date();
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      errors.push({ field: "dob", message: "Invalid date format." });
    } else if (birthDate >= today) {
      errors.push({
        field: "dob",
        message: "Date of birth cannot be today or future.",
      });
    }
  }

  // Mobile
  if (!mobile) {
    errors.push({ field: "mobile", message: "Mobile number is required." });
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.push({
      field: "mobile",
      message: "Mobile number must be 10 digits.",
    });
  }

  // Address
  if (!address) {
    errors.push({ field: "address", message: "Address is required." });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next(); // ✅ move forward if valid
};
