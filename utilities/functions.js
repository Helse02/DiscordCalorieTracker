//------------------------HELPER FUNCTIONS-------------------------------------
module.exports = {
    addZero,
    convert24to12Hour,
    ifAMorPM,
    isValidTime,
    checkChangeNumErrors
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function convert24to12Hour(num) {
    return ((num + 11) % 12) + 1;
}

function ifAMorPM(hours, minutes, seconds) {
    var period = "";
    if (hours >= 0 && hours <= 11 && minutes <= 59 && seconds <= 59) {
        period = "AM";
    }
    else if (hours >= 12 && hours <= 23 && minutes <= 59 && seconds <= 59) {
        period = "PM";
    }
    return period;
}

function isValidTime(hours, minutes, seconds) {
    if (hours == null && minutes == null) {
        return false;
    }
    else if ((hours != null && hours <= 23 && minutes == null) || (hours == null && minutes != null && minutes <= 59)) {
        return true;
    }
    else if (hours <= 23 && minutes <= 59 && seconds <= 59) {
        return true;
    }
    else {
        return false;
    }
}

function checkChangeNumErrors(eHour, eMinutes, interaction) {
    if (eHour == null && eMinutes == null) {
        console.log("both null");
        interaction.reply(
            `**ERROR**: No response was given. Valid responses include: \`0 - 23\` for hours and \`0 - 59\` for minutes`
        );
    }
    else if (eHour != null && eHour > 23 && eMinutes != null && eMinutes > 59) {
        console.log("both invalid");
        interaction.reply(
            `**ERROR**: **${eHour}** and **${eMinutes}** are not valid responses. Valid responses include: \`0 - 23\` for hours and \`0 - 59\` for minutes`
        );
    }
    else if (!isValidTime(eHour, 0, 0)) {
        console.log("hour = null");
        interaction.reply(
            `**ERROR**: **${eHour}** is not a valid hour. Valid responses include: \`0 - 23\``
        );
    }
    else if (!isValidTime(0, eMinutes, 0)) {
        console.log(`minutes = ${eMinutes}`);
        interaction.reply(
            `**ERROR**: **${eMinutes}** is not a valid minute. Valid responses include: \`0 - 59\``
        );
    }
}
