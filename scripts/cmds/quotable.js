const a = require("axios");
const b = require("popcat-wrapper");

async function quotable({ message: c, event: d, args: e, usersData: f }) {
  if (!d.type === d.messageReply && message_reply ) {
    c.reply("Please reply to a message.");
    c.reaction("❌", d.meesageID, () => {}, true);
  } else {
    const g = e.join(" ").split("|");
    const h = g[0].trim();
    const i = g[1].trim();
    const j = f.getAvatarUrl(d.messageReply.senderID) || `https://picsum.photos/200`;
    const k = await b.quote(j, g, i);
    try {
    const { data: l } = await a.get(k, { responseType: "stream" });
    l.path = "./cache/quotable.png";
    c.send({ attachment: l });
    }catch (error) {
      return message.reply("❌");
    }
 
}
};

module.exports = {
  config: {
    name: "quotable",
    aliases: ["qt"],
    version: "1.2.0",
    author: "Null69",
    description: "quotable chat",
    role: 0,
    category: "fun",
    countDown: 5,
    guide: "pn"
  },
  onStart: quotable
}
