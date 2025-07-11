const createGroup = document.getElementById("createGroup");
const showGroup = document.getElementById("showGroup");
const groupId = JSON.parse(localStorage.getItem("groupId")) || 1;
const userId = JSON.parse(localStorage.getItem("userId"));

const userData = {
  id: userId,
};

socket.emit("setup", userData);

socket.on("connected", () => {
  console.log("Connected to socket server");
});

const roomId = `${groupId}123`;
socket.emit("join chat", roomId);

socket.on("message recieved", (message) => {
  console.log("New message received:", message);
  const msg = message.content;
  const UserId = message.sender;

  const reMsg = {
    msg: msg,
    UserId: UserId,
  };

  console.log(reMsg);

  const allMsgs = JSON.parse(localStorage.getItem("allMsgs")) || [];

  allMsgs.push(reMsg);
  displymsg(allMsgs);
});

socket.on("connect_error", (err) => {
  console.log("Socket connection failed:", err.message);
});

createGroup.addEventListener("click", () => {
  window.location.href = "./groupPage.html";
});

window.onload = function () {
  localStorage.setItem("allUsers", JSON.stringify([]));
  const groupId = JSON.parse(localStorage.getItem("groupId"));
  getgroups();
  const group = {
    id: groupId,
  };
  getAllMessage(group);
};

const getgroups = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const group = await axios.get(
      `http://13.232.57.29:5000/group/getAllGroup/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(group.data.groups);
    showGroups(group.data.groups);
  } catch (error) {
    console.log(error);
  }
};

const showGroups = (groups) => {
  groups.map((group) => {
    const h1 = document.createElement("h3");
    h1.innerText = `${group.groupName}`;

    h1.addEventListener("click", () => {
      localStorage.setItem("groupId", JSON.stringify(group.id));
      getAllMessage(group);
      w3_close();
    });

    showGroup.appendChild(h1);
  });
};

const get10Msg = (msg) => {
  let len = msg.length;
  if (len <= 10) {
    return msg;
  } else {
    return msg.slice(len - 10, len);
  }
};

// const getAllInitialMessage = () => {
//   // const msgs = JSON.parse(localStorage.getItem("allMsgs")) || [];
//   displymsg(msgs);
// };

const addNewMsgs = (msgs, newMsg) => {
  const newMsgs = newMsg.filter(
    (newMsg) => !msgs.some((msg) => msg.id === newMsg.id)
  );

  let updatedMsgs = [...msgs, ...newMsgs];
  updatedMsgs = get10Msg(updatedMsgs);
  localStorage.setItem("allMsgs", JSON.stringify(updatedMsgs));
  displymsg(newMsgs);
};

const getAllMessage = async (group) => {
  const token = JSON.parse(localStorage.getItem("token"));
  //const msgs = JSON.parse(localStorage.getItem("allMsgs")) || [];

  let id = JSON.parse(localStorage.getItem("groupId"));

  // if (msgs.length !== 0) {
  //   id = msgs[msgs.length - 1].id;
  // }

  try {
    const msg = await axios.get(
      `http://13.232.57.29:5000/message/getAllMsg/${id}?msgId=${0}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    // const msgs = JSON.parse(localStorage.getItem("allMsgs")) || [];
    addNewMsgs([], msg.data.msg);
    console.log(msg);
  } catch (error) {
    console.log(error);
  }
};

const msgSendButton = document.getElementById("msgSend");

msgSendButton.addEventListener("click", async () => {
  const msg = document.getElementById("msg");
  console.log(msg.value);

  const data = {
    msg: msg.value,
  };

  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const groupId = JSON.parse(localStorage.getItem("groupId"));
    const response = await axios.post(
      `http://13.232.57.29:5000/message/chat/${groupId}`,
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    const group = {
      id: groupId,
    };

    const users = await axios.get(
      `http://localhost:5000/group/getGroupUsers/${groupId}`
    );

    const messageData = {
      sender: userId,
      content: msg.value,
      chat: {
        id: roomId,
        users: users.data.users.GroupUsers,
      },
    };

    socket.emit("new message", messageData);

    getAllMessage(group);
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg);
  }
  msg.value = "";
});

const displymsg = async (message) => {
  const UserId = JSON.parse(localStorage.getItem("userId"));

  const allUsers = await getNewUser();
  console.log(allUsers);

  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  message.forEach((msg) => {
    const li = document.createElement("li");
    if (msg.UserId === UserId) {
      li.innerText = `You: ${msg.msg} `;
    } else {
      allUsers.map((user) => {
        if (msg.UserId === user.id) {
          li.innerText = `${user.username}: ${msg.msg} `;
        }
      });
    }

    ul.appendChild(li);
  });
};

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
    const res = await axios.get("http://13.232.57.29:5000/user/getAllUsers");
    console.log(res);
    const allUsers = res.data.users;
    return allUsers;
    // const users = JSON.parse(localStorage.getItem("allUsers")) || [];
    // addNewUsers(users, allUsers);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

setInterval(() => {
  const groupId = JSON.parse(localStorage.getItem("groupId"));
  const group = {
    id: groupId,
  };
  getAllMessage(group);
}, 1000);

// getNewUser();
// getNewUser();
