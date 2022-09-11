const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const globals = require("../utilities/globals.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Get list of food eaten'),

    async execute(interaction) {
        if (globals.foodList.length === 0) {
            await interaction.reply(`You havent eaten anything yet!`);
        } else {
            var foods = "";
            var calories = "";
            var order = 1;

            console.log(globals.foodList);

            for (var index in globals.foodList) {
                foods += `${order}. \`${globals.foodList[index].food}\`\n`;
                calories += `\`${globals.foodList[index].calories} cal\`\n`;
                order++;
            }

            var calorieList = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle("Food List")
                .setDescription("List of Food & Calories Consumed")
                .setThumbnail(
                    "https://cdn.discordapp.com/attachments/1014283703876333568/1015015594229243935/111.png"
                )
                .addFields(
                    { name: "Food", value: foods, inline: true },
                    { name: "Calories", value: calories, inline: true }
                )
                .setTimestamp()
                .setFooter({
                    text: "Presented by Alex Hoang",
                    iconURL:
                        "https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png",
                });
            console.log(`${globals.totalCalories}/${globals.calorieGoal}`)
            await interaction.reply({ embeds: [calorieList] });
        }
    }
}