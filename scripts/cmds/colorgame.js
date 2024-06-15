module.exports = {
  config: {
    name: "colorgame",
    version: "1.0",
    author: "Null69",
    countDown: 0,
    description: "",
    category: "game",
  },
  langs: {
    en: {
      invalid_amount: "🟢🟡🔴 |◜Color Game◞\n━━━━━━━━━━━━━━━━━━\nPlease provide color and money\nexample: colorgame 🟩 100.\n━━━━━━━━━━━━━━━━━━",
      not_enough_money: "🟢🟡🔴 |◜Color Game◞\n━━━━━━━━━━━━━━━━━━\nYou don't have enough, balance.\n━━━━━━━━━━━━━━━━━━",
      nothing_happened: "nothing happened. continue playing.",
      win_message: "🟢🟡🔴 |◜Color Game◞\n━━━━━━━━━━━━━━━━━━\nYou win %1$!",
      lose_message: "🟢🟡🔴 |◜Color Game◞\n━━━━━━━━━━━━━━━━━━\nYou lost %1$.",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[1]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const colors = ["🟩", "🟨", "🟧", "🟥", "⬜", "🟦"];
    const guess = args[0];
    const slot1 = colors[Math.floor(Math.random() * colors.length)];
    const slot2 = colors[Math.floor(Math.random() * colors.length)];
    const slot3 = colors[Math.floor(Math.random() * colors.length)];

    const winnings = calculateWinnings(guess, slot1, slot2, slot3, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(guess, slot1, slot2, slot3, betAmount) {
  let matches = 0;
  if (guess === slot1) matches++;
  if (guess === slot2) matches++;
  if (guess === slot3) matches++;

  if (matches === 3) {
    return betAmount * 30;
  } else if (matches === 2) {
    return betAmount * 20;
  } else if (matches === 1) {
    return betAmount;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    return getLang("win_message", winnings) + `\n[ ${slot1} | ${slot2} | ${slot3} ]\n━━━━━━━━━━━━━━━━━━`;
  } else {
    return getLang("lose_message", -winnings) + `\n[ ${slot1} | ${slot2} | ${slot3} ]\n━━━━━━━━━━━━━━━━━━`;
  }
};