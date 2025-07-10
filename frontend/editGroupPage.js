const showButton = document.getElementById("showButton");
const addButton = document.getElementById("addButton");
const groupname = document.getElementById("groupname");

const userId = JSON.parse(localStorage.getItem("userId"));

addButton.addEventListener("click", async () => {
  const addedUser = [];
  // addedUser.push(userId);
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      console.log(`Checked: ${checkbox.value} ${checkbox.id}`);
      addedUser.push(checkbox.id.split("-")[1]);
    }
  });
  const groupId = JSON.parse(localStorage.getItem("groupId"));

  console.log(addedUser, groupId);

  await createGroupApi(addedUser, groupId);
  // window.location.href = "./loginPage.html";
});

const createGroupApi = async (addedUser, groupId) => {
  const data = {
    addedUser: addedUser,
    groupId: groupId,
    // groupAdmin: userId,
  };
  console.log(data);
  try {
    const res = await axios.post("http://localhost:5000/admin/make", data);
    alert(res);
    console.log(res);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

const display = (users) => {
  const ul = document.getElementById("show");
  ul.innerHTML = "";

  users.forEach((user, index) => {
    if (userId !== user.id) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `checkbox-${user.id}`;
      checkbox.value = user.username;

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.innerText = ` ${user.username}`;

      const li = document.createElement("li");
      li.appendChild(checkbox);
      li.appendChild(label);

      ul.appendChild(li);
    }
  });
};

showButton.addEventListener("click", async () => {
  const groupId = JSON.parse(localStorage.getItem("groupId"));
  try {
    const users = await axios.get(
      `http://localhost:5000/group/getGroupUsers/${groupId}`
    );
    // const groupname = document.getElementById("groupname");
    //console.log(groupname);
    groupname.value = users.data.users.groupName;
    console.log(users.data.users);
    display(users.data.users.GroupUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});
