const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const db = require("../utilities/sql.js");
const globals = require("../utilities/globals.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get_food_data')
        .setDescription('Get food data from certain date')
        .addStringOption((option) =>
            option.setName('date').setDescription('desired date (format: 9/6/2022)')
                .setRequired(true)
        ),
    async execute(interaction) {
        const enteredDate = interaction.options.getString("date");

        let tempList = db.getFoodFromDate(enteredDate);

        tempList.then(function (result) {
            var foods = "";
            var calories = "";
            var order = 1;

            var selectedDayCalories = 0;

            for (let i = 0; i < result.length; i++) {
                foods += `${order}. \`${result[i].food.trim()}\`\n`;
                calories += `\`${result[i].calories} cal\`\n`;
                selectedDayCalories += parseInt(result[i].calories);
                order++;
            }
            var calorieList = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle(`${enteredDate} Food List`)
                .setDescription(`List of Food & Calories Consumed on ${enteredDate}`)
                .setThumbnail(
                    "https://cdn.discordapp.com/attachments/1014283703876333568/1015015594229243935/111.png"
                )
                .addFields(
                    { name: "Food", value: foods == "" ? "None" : foods, inline: true },
                    {
                        name: "Calories",
                        value: calories == "" ? "None" : calories,
                        inline: true,
                    }
                )
                .setTimestamp()
                .setFooter({
                    text: "Presented by Alex Hoang",
                    iconURL:
                        "https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png",
                });

            if (selectedDayCalories < globals.calorieGoal) {
                calorieList.addFields({
                    name: "Total Calorie Count",
                    value: `\`${selectedDayCalories}\`/\`${globals.calorieGoal}\` <:x:1015355078615502909>`,
                    inline: false,
                });
            } else {
                calorieList.addFields({
                    name: "Total Calorie Count",
                    value: `\`${selectedDayCalories}\`/\`${globals.calorieGoal}\` <:white_check_mark:1015126964945821757>`,
                    inline: false,
                });
            }

            interaction.reply({ embeds: [calorieList] });
        });
    }
}