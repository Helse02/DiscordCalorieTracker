const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const globals = require("../utilities/globals.js");

const {
    addZero,
    convert24to12Hour,
    ifAMorPM,
    isValidTime,
    checkChangeNumErrors,
} = require("../utilities/functions.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("change_time")
        .setDescription("Change meal times")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("breakfast")
                .setDescription("changes breakfast time")
                .addIntegerOption((option) =>
                    option
                        .setName("hours")
                        .setDescription("hours to be set (24 hour time)")
                )
                .addIntegerOption((option) =>
                    option.setName("minutes").setDescription("minutes to be set")
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("lunch")
                .setDescription("changes lunch time")
                .addIntegerOption((option) =>
                    option
                        .setName("hours")
                        .setDescription("hours to be set (24 hour time)")
                )
                .addIntegerOption((option) =>
                    option.setName("minutes").setDescription("minutes to be set")
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("dinner")
                .setDescription("changes dinner time")
                .addIntegerOption((option) =>
                    option
                        .setName("hours")
                        .setDescription("hours to be set (24 hour time)")
                )
                .addIntegerOption((option) =>
                    option.setName("minutes").setDescription("minutes to be set")
                )
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === "breakfast") {
            const enteredHour = interaction.options.getInteger("hours");
            const enteredMinutes = interaction.options.getInteger("minutes");

            if (isValidTime(enteredHour, enteredMinutes, 0)) {
                if (enteredHour != null && enteredMinutes == null) {
                    globals.morningHour = enteredHour;
                    await interaction.reply(
                        `Breakfast time has changed to ${convert24to12Hour(
                            globals.morningHour
                        )}:${addZero(globals.morningMinutes)} ${ifAMorPM(
                            globals.morningHour,
                            globals.morningMinutes,
                            0
                        )}.`
                    );
                } else if (enteredHour == null && enteredMinutes != null) {
                    globals.morningMinutes = enteredMinutes;
                    await interaction.reply(
                        `Breakfast time has changed to ${convert24to12Hour(
                            globals.morningHour
                        )}:${addZero(globals.morningMinutes)} ${ifAMorPM(
                            globals.morningHour,
                            globals.morningMinutes,
                            0
                        )}.`
                    );
                } else if (enteredHour != null && enteredMinutes != null) {
                    globals.morningHour = enteredHour;
                    globals.morningMinutes = enteredMinutes;
                    await interaction.reply(
                        `Breakfast time has changed to ${convert24to12Hour(
                            globals.morningHour
                        )}:${addZero(globals.morningMinutes)} ${ifAMorPM(
                            globals.morningHour,
                            globals.morningMinutes,
                            0
                        )}.`
                    );
                }
            } else {
                checkChangeNumErrors(enteredHour, enteredMinutes, interaction);
            }
        } else if (interaction.options.getSubcommand() === "lunch") {
            const enteredHour = interaction.options.getInteger("hours");
            const enteredMinutes = interaction.options.getInteger("minutes");

            if (isValidTime(enteredHour, enteredMinutes, 0)) {
                if (enteredHour != null && enteredMinutes == null) {
                    globals.afternoonHour = enteredHour;
                    await interaction.reply(
                        `Lunchtime has changed to ${convert24to12Hour(
                            globals.afternoonHour
                        )}:${addZero(globals.afternoonMinutes)} ${ifAMorPM(
                            globals.afternoonHour,
                            globals.afternoonMinutes,
                            0
                        )}.`
                    );
                } else if (enteredHour == null && enteredMinutes != null) {
                    globals.afternoonMinutes = enteredMinutes;
                    await interaction.reply(
                        `Lunchtime time has changed to ${convert24to12Hour(
                            globals.afternoonHour
                        )}:${addZero(globals.afternoonMinutes)} ${ifAMorPM(
                            globals.afternoonHour,
                            globals.afternoonMinutes,
                            0
                        )}.`
                    );
                } else if (enteredHour != null && enteredMinutes != null) {
                    globals.afternoonHour = enteredHour;
                    globals.afternoonMinutes = enteredMinutes;
                    await interaction.reply(
                        `Lunchtime time has changed to ${convert24to12Hour(
                            globals.afternoonHour
                        )}:${addZero(globals.afternoonMinutes)} ${ifAMorPM(
                            globals.afternoonHour,
                            globals.afternoonMinutes,
                            0
                        )}.`
                    );
                }
            } else {
                checkChangeNumErrors(enteredHour, enteredMinutes, interaction);
            }
        } else if (interaction.options.getSubcommand() === "dinner") {
            const enteredHour = interaction.options.getInteger("hours");
            const enteredMinutes = interaction.options.getInteger("minutes");

            if (isValidTime(enteredHour, enteredMinutes, 0)) {
                if (enteredHour != null && enteredMinutes == null) {
                    globals.nightHour = enteredHour;
                    await interaction.reply(
                        `Dinner time has changed to ${convert24to12Hour(
                            globals.nightHour
                        )}:${addZero(globals.nightMinutes)} ${ifAMorPM(
                            globals.nightHour,
                            globals.nightMinutes,
                            0
                        )}`
                    );
                } else if (enteredHour == null && enteredMinutes != null) {
                    globals.nightMinutes = enteredMinutes;
                    await interaction.reply(
                        `Dinner time has changed to ${convert24to12Hour(
                            globals.nightHour
                        )}:${addZero(globals.nightMinutes)} ${ifAMorPM(
                            globals.nightHour,
                            globals.nightMinutes,
                            0
                        )}`
                    );
                } else if (enteredHour != null && enteredMinutes != null) {
                    globals.nightHour = enteredHour;
                    globals.nightMinutes = enteredMinutes;
                    await interaction.reply(
                        `Dinner time has changed to ${convert24to12Hour(
                            globals.nightHour
                        )}:${addZero(globals.nightMinutes)} ${ifAMorPM(
                            globals.nightHour,
                            globals.nightMinutes,
                            0
                        )}.`
                    );
                }
            } else {
                checkChangeNumErrors(enteredHour, enteredMinutes, interaction);
            }
        }
    },
};
