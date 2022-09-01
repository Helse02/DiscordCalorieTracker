const { timeStamp } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const { Client, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const token = config.token;
const prefix = config.prefix;
const guildId = config.guildId;
const channelId = config.channel;
client.login(token);
var calorieGoal = 2500;
var totalCalories = 0;
var foodList = {};

// const guildData = {};

// function createGuild(guildId, channelId) {
//   return {
//     guildId, channelId,
//     calories: 2500
//   };
// }

// function getGuild(guildId)

client.once("ready", () => { 
  // Alternatively, you can set the activity to any of the following:
  // PLAYING, STREAMING, LISTENING, WATCHING
  
  client.user.setPresence({
    activities: [{ name: `Calories`, type: Discord.ActivityFlags.WATCHING }]
  });

  console.log('Ready');
  var currentDate = new Date();
  var fullDate = addZero(currentDate.getMonth() + 1) + "-" + addZero(currentDate.getDate()) + "-" + addZero(currentDate.getFullYear());
  var actualMath = client.guilds.cache.find((guild) => guild.id == guildId).channels.cache.find((channel) => channel.id == channelId);

      const embed = new EmbedBuilder()
        .setTitle("WE'RE ALL GONNA MAKE IT. GET YOUR CALORIES IN\n input calories using this format '-500'")
        .setColor("#0099ff")
        .setImage("https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png");
      actualMath.send({embeds: [embed]});

  setInterval(() => {
    var dt = new Date();
    if (dt.getHours() == 0 && dt.getMinutes() == 0 && dt.getSeconds() == 0) { //when the time turns 12:00 A.M.
      var actualMath = client.guilds.cache.find((guild) => guild.id == guildId).channels.cache.find((channel) => channel.id == channelId);

      const embed = new EmbedBuilder()
        .setTitle("WE'RE ALL GONNA MAKE IT. GET YOUR CALORIES IN")
        .setColor("#0099ff")
        .setImage("https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png");
      actualMath.send({embeds: [embed]});

      var foodList = {};
      totalCalories = 0;
    }

    client.channels.fetch(channelId)
    .then(channel => {

      if (dt.getHours() == 11 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send("Good Morning! Whatd you eat for breakfast today? (Use '-500' to input 500 calories)");
        channel.send(`You are ${totalCalories}/${calorieGoal} calories of the way there!`);
      }

      if (dt.getHours() == 15 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send("Good Afternoon! Whatd you eat for lunch today? (Use '-500' to input 500 calories)");
        channel.send(`You are ${totalCalories}/${calorieGoal} calories of the way there!`);
      }

      if (dt.getHours() == 20 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send("Good Evening! Whatd you eat for dinner today? (Use '-500' to input 500 calories)");
        channel.send(`You are ${totalCalories}/${calorieGoal} calories of the way there!`);
      }

      if (dt.getHours() == 0 && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        if (totalCalories < calorieGoal) {
            channel.send("You have failed to reach your calorie goal for the day. Try again tomorrow!");
        }
        else {
            channel.send("Congrats! You successfully reached your calorie goal for the day!");
        }
        totalCalories = 0;
      }
    })   
  }, 1000); // interval (1 second)
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'count') {
		await interaction.reply(`Total Calorie Count: ${totalCalories}/${calorieGoal} calories`);
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'list') {
      if (Object.keys(foodList).length === 0) {
        await interaction.reply(`You havent eaten anything yet!`);
      } 
      else {
        await interaction.reply('Food'.padEnd(48) + 'Calories');
        //interaction.channel.send('Food'.padEnd(48) + 'Calories');
        for (var key in foodList) { //54
          var padding = 54 - key.length;
          interaction.channel.send(key.padEnd(padding) + foodList[key]);
        };
      }
	  }
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split('-');

  if (!isNaN(args[1])) {
    totalCalories = totalCalories + parseInt(args[1]);
    message.channel.send(`Great Job! Keep getting your calories in! ${args[1]} calories has been inputed`);
    foodList[args[0]] = args[1];

  } else if (isNaN(args[1])) {
     message.channel.send("Please type in a valid response");
  }

  if (totalCalories >= calorieGoal) {
    message.channel.send("You have successfully reached your calorie goal for the day! Keep getting those calories in!");
  }

});

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

  // "eggs and bacon" 500 