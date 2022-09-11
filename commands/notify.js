const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const globals = require("../utilities/globals.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notify')
        .setDescription('Specify user to ping')
        .addUserOption((option) =>
            option.setName('user').setDescription('user to be notified')
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        globals.userID = user.id;
        await interaction.reply(`<@${globals.userID}> will now be notified for daily meal tracking!`);
    }
}