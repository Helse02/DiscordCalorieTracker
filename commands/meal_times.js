const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const globals = require("../utilities/globals.js");

const {
    addZero,
    convert24to12Hour,
    ifAMorPM,
} = require("../utilities/functions.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meal_times')
        .setDescription('Get current meal times'),
    async execute(interaction) {
        console.log(globals.morningHour, globals.morningMinutes);

        var mealTimes = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("Meal Time")
            .setDescription("Current Times of Meals")
            .setThumbnail(
                "https://cdn.discordapp.com/attachments/1014283703876333568/1015015594229243935/111.png"
            )
            .setFields({
                name: "__Breakfast__",
                value: `${convert24to12Hour(globals.morningHour)}:${addZero(globals.morningMinutes)} ${ifAMorPM(globals.morningHour, globals.morningMinutes, 0)}`,
                inline: true,
            })
            .addFields({
                name: "__Lunch__",
                value: `${convert24to12Hour(globals.afternoonHour)}:${addZero(globals.afternoonMinutes)} ${ifAMorPM(globals.afternoonHour, globals.afternoonMinutes, 0)}`,
                inline: false,
            })
            .addFields({
                name: "__Dinner__",
                value: `${convert24to12Hour(globals.nightHour)}:${addZero(globals.nightMinutes)} ${ifAMorPM(globals.nightHour, globals.nightMinutes, 0)}`,
                inline: false,
            })
            .setTimestamp()
            .setFooter({
                text: "Presented by Alex Hoang",
                iconURL:
                    "https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png",
            });

        await interaction.reply({ embeds: [mealTimes] });
    }
}