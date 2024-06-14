const a = require("axios");
const b = require("popcat-wrapper");

async function quotable({ message: c, event: d, args: e, usersData: f }) {
  if (!d.type === d.messageReply && message_reply ) {
    c.reply("Please reply to a message.");
    c.reaction("❌", d.messageID, () => {}, true);
    return;
  }
  if (d.messageReply.senderID === "100006195543459") {
    return c.reply({
      body: "Oooops! that's illegal, man.",
      attachment: await global.utils.getStreamFromURL(`https://i.imgur.com/HOZ6Jvt.gif`, "rickroll.gif")
    });
  }
    let g = e.join(" ");
    if (!g) {
    g = d.messageReply.body;
    }
    const i = await f.getName(d.messageReply.senderID) + ", 2024";
    const j = await f.getAvatarUrl(d.messageReply.senderID);
    const k = await b.quote(j, g, i);
    const { data: l } = await a.get(k, { responseType: "stream" } );
    l.path = "./cache/quotable.png";
    c.send({ attachment: l });
};

module.exports = {
  config: {
    name: "quoatable",
    aliases: ["qt"],
    version: "1.2.0",
    author: "Null69",
    description: "quotable chat",
    role: 0,
    category: "meme",
    countDown: 5,
    guide: "pn"
  },
  onStart: quotable
};
const { GoatWrapper } = require('fca-liane-utils');
const wrapper = new GoatWrapper(module.exports);

wrapper.applyNoPrefix();
