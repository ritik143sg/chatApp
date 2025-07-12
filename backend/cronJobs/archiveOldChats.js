const cron = require("node-cron");
const { Chat } = require("../models"); // Adjust path if needed
const { Op } = require("sequelize");
const { ArchivedChat } = require("../models/archivedChat");

// Runs every night at midnight (00:00)
cron.schedule("* * * * *", async () => {
  try {
    console.log("Archiving old chats...");

    // Find chats older than 1 day
    const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);

    const oldChats = await Chat.findAll({
      where: {
        createdAt: {
          [Op.lt]: oneMinuteAgo,
        },
      },
    });

    if (oldChats.length === 0) {
      console.log(" No chats to archive.");
      return;
    }

    // Prepare data for bulk insert into ArchivedChat
    const archivedChats = oldChats.map((chat) => ({
      UserId: chat.UserId,
      msg: chat.msg,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    }));

    // Insert into ArchivedChat
    await ArchivedChat.bulkCreate(archivedChats);

    // Delete from Chat table
    await Chat.destroy({
      where: {
        createdAt: {
          [Op.lt]: oneMinuteAgo,
        },
      },
    });

    console.log(` Archived and deleted ${oldChats.length} chats.`);
  } catch (error) {
    console.error("Error archiving chats:", error);
  }
});
