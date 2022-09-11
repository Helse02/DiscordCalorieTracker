const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const db = require("../utilities/sql.js");
const globals = require("../utilities/globals.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('input_food')
        .setDescription('Input food eaten')
        .addStringOption((option) =>
            option.setName('food').setDescription('name of food')
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option.setName('calories').setDescription('amount of calories of the entered food')
                .setRequired(true)
        ),
    async execute(interaction) {
        const enteredFood = interaction.options.getString("food");
        const enteredCalories = interaction.options.getInteger("calories");

        globals.totalCalories += enteredCalories;

        await interaction.reply(
            `Great Job! Keep getting your calories in! \`${enteredCalories} calories\` has been inputed`
        );

        globals.foodList.push({ food: enteredFood, calories: enteredCalories });

        var tempDate = new Date().toLocaleString().split(",");
        db.insertFoodTable({
            date: tempDate[0],
            food: enteredFood,
            calories: enteredCalories,
        });

        if (globals.totalCalories >= globals.calorieGoal) {
            await interaction.followUp(
                "You have successfully reached your calorie goal for the day! Keep getting those calories in!"
            );
        }
    }
}



