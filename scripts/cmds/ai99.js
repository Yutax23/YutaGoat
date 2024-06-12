const { getPrefix: gp, getStreamFromURL: st, uploadImgbb: up } = global.utils, 
{ get, post } = require("axios");
async function ai({ message: m, event: e, args: a, usersData: u }) {
const pr = await gp(e.threadID) + this.config.name;
if (!a[0]?.toLowerCase().startsWith(pr) && !a[0]?.toLowerCase().startsWith(this.config.name)) return;
try {
const prompt = e.type === "message_reply" && e.messageReply.attachments?.[0]?.type === "photo" ? `${a.slice(1).join(" ")} ${(await up(e.messageReply.attachments[0].url)).image.url}` : a.slice(1).join(" "),
name = await u.getName(e.senderID),
{ data } = await post(String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 106, 110, 45, 97, 105, 46, 111, 110, 114, 101, 110, 100, 101, 114, 46, 99, 111, 109, 47, 97, 105, 47, 118, 50), {  
prompt, 
apikey: "jnKey-43p6mGCLjq", name,
 id: e.senderID  }),
r = Array.isArray(data.result) ? JSON.stringify(data.result, null, 2) : data.result.replace(/!🐥/g, pr),
o = { body: r, mentions: [{ id: e.senderID, tag: name }] };
if (data.av) o.attachment = Array.isArray(data.av) ? await Promise.all(data.av.map(async (i) => (await get(i, { responseType: 'stream' })).data)) : await st(data.av);
m.reply(o);
} catch (e) {
m.reply(e.message);
}
}
module.exports = {
config: {
name: "ryomen",
aliases: [],
version: 1.6,
author: "Jun",
role: 0,
description: "An AI that can do various tasks",
guide: "{pn} <query>",
category: "ai"
},
onStart: () => {},
onChat: ai
};