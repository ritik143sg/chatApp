let users = [];

const show = (users) => {
  const ul = document.querySelector("ul");

  users.map((user) => {
    const li = document.createElement("li");
    li.innerText = `${user.username} : Added`;
    ul.appendChild(li);
  });
};

const addNewUsers = (users, getAllUser) => {
  let newUsers = [];

  getAllUser.map((newUser) => {
    users.map((user) => {
      if (newUser.id !== user.id) {
        getAllUser.push(newUser);
      }
    });
  });
  users = newUsers;
};

const getNewUser = async (req, res) => {
  try {
    const res = await axios.get("http://localhost:5000/user/getAllUser");
    console.log(res);
    allUsers = res.allUsers;
    addNewUsers(users, allUsers);
    show(users);
  } catch (error) {
    console.log(error);
  }
};

setInterval(() => {
  getNewUser();
}, 1000);
