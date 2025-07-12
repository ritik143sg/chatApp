const handleSubmit = async (event) => {
  event.preventDefault();

  const email = event.target.email.value;

  const password = event.target.password.value;

  console.log(email, password);
  const data = {
    email: email,

    password: password,
  };

  try {
    const response = await axios.post(
      "http://13.233.79.22:5000/user/login",
      data
    );

    console.log(response);
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("userId", JSON.stringify(response.data.user.id));
    alert(response.data.msg);
    window.location.href = "./chatPage.html";
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg);
  }

  event.target.email.value = "";

  event.target.password.value = "";
};
