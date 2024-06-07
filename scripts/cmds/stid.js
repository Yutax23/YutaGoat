async function stid({ message, event, args }) {
  if (event.type == "message_reply") {
    if (event.messageReply && event.messageReply.attachments && event.messageReply.attachments[0] && event.messageReply.attachments[0].type == "sticker") {
      return message.send(`${event.messageReply.attachments[0].ID}`);
    }
    else return message.reply("Only reply sticker");
  }
  else if (args[0]) {
    return message.reply({sticker: args[0]});
  }
  else return message.reply("Only reply sticker");
}

module.exports = {
  config: {
    name: "stid",
    aliases: ["idst"],
    version: "1",
    author: "null69",
    role: 0,
    countDown: 0,
    description: "get id of sticker",
    category: "utility",
    guide: "reply to sticker"
  },
  onStart: stid
};
