const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get user info'),
    async execute(interaction) {
        await interaction.reply(
            `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
        );
    }
}