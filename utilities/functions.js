//------------------------HELPER FUNCTIONS-------------------------------------
module.exports = {
    addZero,
    convert24to12Hour,
    ifAMorPM,
    isValidTime,
    checkChangeNumErrors,
    timeEmojis,
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

function timeEmojis(hour, minutes) {
    var emoji = "";
    hour = convert24to12Hour(hour)
    if (minutes == 30) { //half hours
        switch (hour) {
            case 1:
                emoji = "<:clock130:1018732543337566238>"
                break;
            case 2:
                emoji = "<:clock230:1018732605513932860>"
                break;
            case 3:
                emoji = "<:clock330:1018732783956414575>"
                break;
            case 4:
                emoji = "<:clock430:1018720066742792202>"
                break;
            case 5:
                emoji = "<:clock530:1018720088163090482>"
                break;
            case 6:
                emoji = "<:clock630:1018720108690026627>"
                break;
            case 7:
                emoji = "<:clock730:1018720134195597374>"
                break;
            case 8:
                emoji = "<:clock830:1018720161022361660>"
                break;
            case 9:
                emoji = "<:clock930:1018720178890088458>"
                break;
            case 10:
                emoji = "<:clock1030:1018720203607126066>"
                break;
            case 11:
                emoji = "<:clock1130:1018731673627656232>"
                break;
            case 12:
                emoji = "<:clock1230:1018719657764589599>"
                break;
        }
    }
    else {
        switch (hour) { //full hour
            case 1:
                emoji = "<:clock1:1018719894671474708>"
                break;
            case 2:
                emoji = "<:clock2:1018719991626989684>"
                break;
            case 3:
                emoji = "<:clock3:1018720034517958676>"
                break;
            case 4:
                emoji = "<:clock4:1018720058400321536>"
                break;
            case 5:
                emoji = "<:clock5:1018720078289707089>"
                break;
            case 6:
                emoji = "<:clock6:1018720098904702977>"
                break;
            case 7:
                emoji = "<:clock7:1018720124028600400>"
                break;
            case 8:
                emoji = "<:clock8:1018720152163987546>"
                break;
            case 9:
                emoji = "<:clock9:1018720170220466179>"
                break;
            case 10:
                emoji = "<:clock10:1018720192785817712>"
                break;
            case 11:
                emoji = "<:clock11:1018733002995535882>"
                break;
            case 12:
                emoji = "<:clock12:1018719657764589599>"
                break;
        }
    }
    return emoji;
}
