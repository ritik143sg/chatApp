const showButton = document.getElementById("showButton");
const addButton = document.getElementById("addButton");
const group = document.getElementById("group");

addButton.addEventListener("click", async () => {
  const addedUser = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      console.log(`Checked: ${checkbox.value} ${checkbox.id}`);
      addedUser.push(checkbox.id.split("-")[1]);
    }
  });
  console.log(addedUser, group.value);

  await createGroupApi(addedUser, group.value);
  // window.location.href = "./loginPage.html";
});

const createGroupApi = async (addedUser, groupName) => {
  const data = {
    addedUser: addedUser,
    groupName: groupName,
  };
  console.log(data);
  try {
    const res = await axios.post("http://localhost:5000/group/create", data);
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
  });
};

showButton.addEventListener("click", async () => {
  try {
    const users = await axios.get("http://localhost:5000/user/getAllUsers");
    display(users.data.users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});
