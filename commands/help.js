const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get command menu'),

    async execute(interaction) {
        const commandList = require("../commands.json");
        var names = "";
        var descriptions = "";
        var order = 1;

        for (let i = 0; i < commandList.length; i++) {
            names += `${order}. \`${commandList[i].name.trim()}\`\n`;
            descriptions += `\`${commandList[i].description}\`\n`;
            order++;
        }

        const menuEmbed = new EmbedBuilder() //menu of all slash commands (hopefully)
            .setColor(0x0099ff)
            .setTitle("Help Menu")
            .setDescription("List of Commands")
            .addFields(
                { name: "Name", value: names, inline: true },
                { name: "Description", value: descriptions, inline: true }
            )
            .setTimestamp()
            .setFooter({
                text: "Presented by Alex Hoang",
                iconURL:
                    "https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png",
            });

        await interaction.reply({ embeds: [menuEmbed] });
    }
}