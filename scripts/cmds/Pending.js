module.exports = {
  config: {
    name: "pending",
    version: "1.0",
    author: "Ù„ÙˆÙÙŠ",
    countDown: 5,
    role: 2,
    shortDescription: {
      vi: "",
      en: ""
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "Goat-alAuthor"
  },
 
langs: {
    en: {
        invaildNumber: "%1 is not an invalid number",
        cancelSuccess: "Refused %1 thread!",
        approveSuccess: "Approved successfully %1 threads!",
 
        cantGetPendingList: "Can't get the pending list!",
        returnListPending: "Â»ã€ŒPENDINGã€Â«â® The whole number of threads to approve is: %1 thread â¯\n\n%2",
        returnListClean: "ã€ŒPENDINGã€There is no thread in the pending list"
    }
  },
 
onReply: async function({ api, event, Reply, getLang, commandName, prefix }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;
 
    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), Reply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(getLang("invaildNumber", singleIndex), threadID, messageID);
            api.sendMessage(`ã€Œ ð—”ð—£ð—£ð—¥ð—¢ð—©ð—˜ð—— ã€\n\nâ€¢This thread is officially approved by the admin.\nEnjoy using the bot and please do not spam. â™¡\nâ€” [ ã‚‚.LORENZO ]`, Reply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getLang("approveSuccess", count), threadID, messageID);
    }
},
 
onStart: async function({ api, event, getLang, commandName }) {
	const { threadID, messageID } = event;
 
    var msg = "", index = 1;
 
    try {
		var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
		var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
	} catch (e) { return api.sendMessage(getLang("cantGetPendingList"), threadID, messageID) }
 
	const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
 
    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;
 
    if (list.length != 0) return api.sendMessage(getLang("returnListPending", list.length, msg), threadID, (err, info) => {
		global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
	}, messageID);
    else return api.sendMessage(getLang("returnListClean"), threadID, messageID);
}
      }