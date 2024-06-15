module.exports = {
  config: {
    name: "liteLotto",
    version: "1.0",
    author: "Null69",
    countDown: 0,
    description: "",
    category: "game",
  },
  langs: {
    en: {
      guess_message: "🎲 |◜Lite Lotto◞\n━━━━━━━━━━━━━━━━━━\nGuess 4 digits between 1 and 70.\n━━━━━━━━━━━━━━━━━━",
      win_message: "🎲 |◜Lite Lotto◞\n━━━━━━━━━━━━━━━━━━\nYou guessed the number You win 50,000.\n━━━━━━━━━━━━━━━━━━",
      lose_message: "🎲 |◜Lite Lotto◞\n━━━━━━━━━━━━━━━━━━\nYou didn't guess the number.\n━━━━━━━━━━━━━━━━━━",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    const userGuess = await message.awaitReply(getLang("guess_message"));

    const randomNumber = Math.floor(Math.random() * 70) + 1;
    const winnings = calculateWinnings(randomNumber, userGuess);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    const messageText = getSpinResultMessage(randomNumber, userGuess, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(randomNumber, userGuess) {
  if (randomNumber.toString() === userGuess) {
    return 50000;
  } else {
    return 0;
  }
}

function getSpinResultMessage(randomNumber, userGuess, winnings, getLang) {
  if (winnings > 0) {
    return getLang("win_message") + `\nThe number was ${randomNumber}. Your guess was ${userGuess}.`;
  } else {
    return getLang("lose_message") + `\nThe number was ${randomNumber}. Your guess was ${userGuess}.`;
  }
};