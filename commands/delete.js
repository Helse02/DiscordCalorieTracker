const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const db = require("../utilities/sql.js");
const globals = require("../utilities/globals.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Remove food from list')
        .addStringOption((option) =>
            option.setName('food').setDescription('food you want to delete')
                .setRequired(true)
        ),

    async execute(interaction) {
        const enteredFood = interaction.options.getString("food");
        var tempDate = new Date().toLocaleString().split(",");
        db.deleteFoodTable({ food: enteredFood, date: tempDate[0] });

        console.log(globals.foodList);
        console.log(enteredFood);

        var indexOfObject;
        var deletedTF = false;

        for (let i = 0; i < globals.foodList.length; i++) {
            if (globals.foodList[i].food === enteredFood) {
                indexOfObject = i;
                deletedTF = true;
                globals.totalCalories -= globals.foodList[i].calories;
                break;
            }
        }

        console.log("index: ", indexOfObject);
        globals.foodList.splice(indexOfObject, 1);

        console.log(globals.foodList);

        if (deletedTF) {
            await interaction.reply(`\`${enteredFood}\` has been removed.`);
        } else {
            await interaction.reply(`**ERROR**: No entry found. \`${enteredFood}\` was not removed.`);
        }
    }
}



