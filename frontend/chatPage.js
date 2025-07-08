window.onload = function () {
  localStorage.setItem("allUsers", JSON.stringify([]));
};
const button = document.querySelector("button");

button.addEventListener("click", async () => {
  const msgButton = document.getElementById("msg");
  console.log(msgButton.value);

  const data = {
    msg: msgButton.value,
  };

  try {
    const response = await axios.post("http://localhost:5000/user/chat", data);

    console.log(response);
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg);
  }
});

const show = (users) => {
  const ul = document.querySelector("ul");
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = `${user.username} : Added`;
    ul.appendChild(li);
  });
};

const addNewUsers = (users, getAllUser) => {
  const newUsers = getAllUser.filter(
    (newUser) => !users.some((user) => user.id === newUser.id)
  );

  const updatedUsers = [...users, ...newUsers];
  localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
  show(newUsers);
};

const getNewUser = async () => {
  try {
    const res = await axios.get("http://localhost:5000/user/getAllUsers");
    const allUsers = res.data.users;
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    addNewUsers(users, allUsers);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

// setInterval(getNewUser, 1000);
getNewUser();
