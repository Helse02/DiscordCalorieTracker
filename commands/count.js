const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const globals = require("../utilities/globals.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('Get calorie count'),

    async execute(interaction) {
        console.log(`Total Calories: ${globals.totalCalories}\nCalorie Goal: ${globals.calorieGoal}`)
        var caloriesCount = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Calories")
            .setDescription("Amount of Calories Consumed")
            .setThumbnail(
                "https://cdn.discordapp.com/attachments/1014283703876333568/1015015594229243935/111.png"
            )
            .setTimestamp()
            .setFooter({
                text: "Presented by Alex Hoang",
                iconURL:
                    "https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png",
            });

        if (globals.totalCalories < globals.calorieGoal) {
            caloriesCount.addFields({
                name: "Total Calorie Count",
                value: `\`${globals.totalCalories}\`/\`${globals.calorieGoal}\` <:x:1015355078615502909>`,
                inline: true,
            });
        } else {
            caloriesCount.addFields({
                name: "Total Calorie Count",
                value: `\`${globals.totalCalories}\`/\`${globals.calorieGoal}\` <:white_check_mark:1015126964945821757>`,
                inline: true,
            });
        }
        await interaction.reply({ embeds: [caloriesCount] });
    }

}