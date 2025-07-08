window.onload = function () {
  localStorage.setItem("allUsers", JSON.stringify([]));
  localStorage.setItem("allMsgs", JSON.stringify([]));
  getAllMessage();
};

const addNewMsgs = (msgs, newMsg) => {
  const newMsgs = newMsg.filter(
    (newMsg) => !msgs.some((msg) => msg.id === newMsg.id)
  );

  const updatedMsgs = [...msgs, ...newMsgs];
  localStorage.setItem("allMsgs", JSON.stringify(updatedMsgs));
  displymsg(newMsgs);
};

const getAllMessage = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const msg = await axios.get("http://localhost:5000/message/getAllMsg", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const msgs = JSON.parse(localStorage.getItem("allMsgs")) || [];
    addNewMsgs(msgs, msg.data.msg);
    console.log(msg);
  } catch (error) {
    console.log(error);
  }
};

const button = document.querySelector("button");

button.addEventListener("click", async () => {
  const msgButton = document.getElementById("msg");
  console.log(msgButton.value);

  const data = {
    msg: msgButton.value,
  };

  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post("http://localhost:5000/user/chat", data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg);
  }
  msgButton.value = "";
});

const show = (users) => {
  const ul = document.querySelector("ul");
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = `${user.username} : Added`;
    ul.appendChild(li);
  });
};

const displymsg = (message) => {
  const ul = document.querySelector("ul");
  message.forEach((msg) => {
    const li = document.createElement("li");
    li.innerText = `You: ${msg.msg} `;
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
    console.log(res);
    const allUsers = res.data.users;
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    addNewUsers(users, allUsers);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

setInterval(() => {
  getNewUser();
  getAllMessage();
}, 1000);

// getNewUser();
