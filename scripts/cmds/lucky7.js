module.exports = {
  config: {
    name: "lucky7",
    version: "1.0",
    author: "Null69",
    countDown: 0,
    description: "",
    category: "game",
  },
  langs: {
    en: {
      invalid_amount: "🎰 |◜Lucky7!◞\n━━━━━━━━━━━━━━━━━━\nPlease bet money.\n━━━━━━━━━━━━━━━━━━",
      not_enough_money: "🎰 |◜Lucky7!◞\n━━━━━━━━━━━━━━━━━━\nYou don't have enough, balance.\n━━━━━━━━━━━━━━━━━━",
      spin_message: "continued Rotation 🌝",
      win_message:"🎰 |◜Lucky7!◞\n━━━━━━━━━━━━━━━━━━\nYou win %1$!",
      lose_message: "🎰 |◜Lucky7!◞\n━━━━━━━━━━━━━━━━━━\nYou lost %1$.",
      jackpot_message: "🎰 |◜Lucky7!◞\n━━━━━━━━━━━━━━━━━━\nDamn! Lucky 7 %1 $!\n━━━━━━━━━━━━━━━━━━",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const slots = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "6⃣", "7⃣", "9⃣"];
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];

    const winnings = calculateWinnings(slot1, slot2, slot3, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === "7⃣" && slot2 === "7⃣" && slot3 === "7⃣") {
    return betAmount * 10;
  } else if (slot1 === "9⃣" && slot2 === "9⃣" && slot3 === "9⃣") {
    return betAmount * 5;
  } else if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === "7⃣" && slot2 === "7⃣" && slot3 === "7⃣") {
      return getLang("jackpot_message", winnings);
    } else {
      return getLang("win_message", winnings) + `\n[ ${slot1} | ${slot2} | ${slot3} ]\n━━━━━━━━━━━━━━━━━━`;
    }
  } else {
    return getLang("lose_message", -winnings) + `\n[ ${slot1} | ${slot2} | ${slot3} ]\n━━━━━━━━━━━━━━━━━━`;
  }
                   };