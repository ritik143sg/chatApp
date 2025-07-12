const handleSubmit = async (e) => {
  e.preventDefault();

  const file = e.target.avatar.files[0];

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const id = JSON.parse(localStorage.getItem("groupId"));
    console.log(id);

    const res = await axios.post(
      `http://localhost:5000/upload/addFile/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      }
    );
    e.target.reset();

    const users = await axios.get(
      `http://localhost:5000/group/getGroupUsers/${groupId}`
    );

    const messageData = {
      sender: userId,
      content: res.data.fileUrl,
      chat: {
        id: roomId,
        users: users.data.users.GroupUsers,
      },
    };

    const group = {
      id: groupId,
    };

    socket.emit("new message", messageData);

    console.log("Upload success:", res.data);
    getAllMessage(group);
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
  }
};
