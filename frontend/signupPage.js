const handleSubmit = async (event) => {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const phoneNo = event.target.phoneNo.value;
  const password = event.target.password.value;

  console.log(username, email, phoneNo, password);

  const data = {
    username: username,
    email: email,
    phoneNo: phoneNo,
    password: password,
  };

  try {
    const response = await axios.post(
      "http://13.232.57.29:3306/user/add",
      data
    );

    console.log(response);
    alert(response.data.msg);
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg);
  }

  event.target.username.value = "";
  event.target.email.value = "";
  event.target.phoneNo.value = "";
  event.target.password.value = "";
};
