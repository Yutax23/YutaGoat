module.exports = {
    config: {
        name: "sendmoney",
        aliases: [],
        version: "1.0.0",
        author: "Goatbot Generator",
        role: 0,
        category: "Economy",
        shortDescription: {
            en: "Transfer money to another user",
            vi: "Chuyển tiền cho người dùng khác"
        },
        longDescription: {
            en: "This command allows you to transfer a specified amount of money to another user.",
            vi: "Lệnh này cho phép bạn chuyển một số tiền cụ thể cho người dùng khác."
        },
        guide: {
            en: "To use this command, type sendmoney <amount> <uid>",
            vi: "Để sử dụng lệnh này, gõ sendmoney <số tiền> <uid>"
        }
    },
    onStart: async function ({ event, args, message, usersData, api, commandName }) {
        if (args.length < 2) {
            await message.reply("Invalid command format. Please use: sendmoney <amount> <uid>");
            return;
        }
        const amount = parseFloat(args[0]);
        const targetID = args[1];

        const currentUser = await usersData.get(event.senderID);
        const targetUser = await usersData.get(targetID);

        if (!targetUser) {
            await message.reply("User with specified UID not found.");
            return;
        }

        if (currentUser.money < amount) {
            await message.reply("Insufficient funds for this transaction.");
            return;
        }

        await usersData.set(event.senderID, { money: currentUser.money - amount });
        await usersData.set(targetID, { money: targetUser.money + amount });

        await message.reply(`Successfully transferred ${amount} to user with UID: ${targetID}`);
    }
};
