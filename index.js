const { timeStamp } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config.json");
const { Client, GatewayIntentBits, ActivityType} = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { channel } = require("diagnostics_channel");
const db = require("./sql.js");
const sql = require("sqlite3");
const { setDefaultResultOrder } = require("dns");

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

var botID = "1014430950282764320";
var morning = '11';
var afternoon = '15';
var night = '20';

client.once("ready", () => { 
  // Alternatively, you can set the activity to any of the following:
  // PLAYING, STREAMING, LISTENING, WATCHING
  
  client.user.setPresence({
    activities: [{ name: `Calories`, type: ActivityType. Watching }],
    status: 'dnd'
  });

  console.log('Ready');
  var currentDate = new Date();
  var fullDate = addZero(currentDate.getMonth() + 1) + "-" + addZero(currentDate.getDate()) + "-" + addZero(currentDate.getFullYear());
  var actualMath = client.guilds.cache.find((guild) => guild.id == guildId).channels.cache.find((channel) => channel.id == channelId);

  const embed = new EmbedBuilder()
    .setTitle("WE'RE ALL GONNA MAKE IT. GET YOUR CALORIES IN")
    .setDescription("Input calories using this format: `-input-description-calorie#`")
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

      if (dt.getHours() == morning && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send(`<@${botID}> Good Morning! What did you eat for breakfast today? (Use \`-input-description-calorie#\` to input 500 calories)`);
        channel.send(`You are \`${totalCalories}\`/\`${calorieGoal}\` calories of the way there!`);
      }

      if (dt.getHours() == afternoon && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send(`<@${botID}> Good Afternoon! What did you eat for lunch today? (Use \`-input-description-calorie#\` to input 500 calories)`);
        channel.send(`You are \`${totalCalories}\`/\`${calorieGoal}\` calories of the way there!`);
      }

      if (dt.getHours() == night && dt.getMinutes() == 0 && dt.getSeconds() == 0) {
        channel.send(`<@${botID}> Good Evening! What did you eat for dinner today? (Use \`-input-description-calorie#\` to input 500 calories)`);
        channel.send(`You are \`${totalCalories}\`/\`${calorieGoal}\` calories of the way there!`);
      }

      if (dt.getHours() == 23 && dt.getMinutes() == 59 && dt.getSeconds() == 59) {
        var flag;
        if (totalCalories < calorieGoal) {
            channel.send(`<@${botID}> You have failed to reach your calorie goal for the day. Try again tomorrow!`);
            flag = 0;
        }
        else {
            channel.send(`<@${botID}> Congrats! You successfully reached your calorie goal for the day!`);
            flag = 1;
        }

        var tempDate = (new Date()).toLocaleString().split(',');
        db.insertGoalTable({date: tempDate[0], calories: totalCalories, goalMet: flag});
        totalCalories = 0;

      }
    })   
  }, 1000); // interval (1 second)
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'count') {
    var caloriesCount = new EmbedBuilder()
	    .setColor(0x0099FF)
	    .setTitle('Calories')
	    .setDescription('Amount of Calories Consumed')
	    .setThumbnail('https://cdn.discordapp.com/attachments/1014283703876333568/1015015594229243935/111.png')
	    //.addFields({ name: 'Total Calorie Count', value: `${totalCalories}/${calorieGoal}`, inline: true })
	    .setTimestamp()
	    .setFooter({ text: 'Presented by Alex Hoang', iconURL: 'https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png' });
    
    if(totalCalories < calorieGoal) {
      caloriesCount.addFields({ name: 'Total Calorie Count', value: `\`${totalCalories}\`/\`${calorieGoal}\` <:x:1015355078615502909>`, inline: true })
    }
    else {
      caloriesCount.addFields({ name: 'Total Calorie Count', value: `\`${totalCalories}\`/\`${calorieGoal}\` <:white_check_mark:1015126964945821757>`, inline: true })
    }

		await interaction.reply({embeds: [caloriesCount]});
	} 

  else if (commandName === 'server') 
  {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} 

  else if (commandName === 'user') 
  {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  } 

  else if(commandName === 'help')
  {
    await interaction.reply('Input calories using this format: `-input-description-calorie#`\nGet specific days food list: `-get-FoodListFrom-9/2/2022`');
    
    const menuEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle("Help Menu")
      .setDescription("List of Menu")
      .setThumbnail('https://cdn.discordapp.com/attachments/1014283703876333568/1015015594229243935/111.png')
      .setFields({name: "name", value: "value", inline: true})
      .setTimestamp()
      .setFooter({ text: 'Presented by Alex Hoang', iconURL: 'https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png' });

	} 
  
  else if (commandName === 'list') 
  {
      if (Object.keys(foodList).length === 0) {
        await interaction.reply(`You havent eaten anything yet!`);
      } 
      else {

        var foods = "";
        var calories = "";
        var order = 1;

        for (var key in foodList)
        {
          //foods += order + "." + "`" + key + "` \n";
          foods += `${order}. \`${key.trim()}\`\n`;
          //calories += "`" + foodList[key] + " cal`" + "\n";
          calories += `\`${foodList[key]} cal\`\n`
          order++;
        }

        var calorieList = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Food List')
        .setDescription('List of Food & Calories Consumed')
        .setThumbnail('https://cdn.discordapp.com/attachments/1014283703876333568/1015015594229243935/111.png')
        .addFields({name: "Food", value: foods, inline: true}, {name: "Calories", value: calories, inline: true})
        .setTimestamp()
        .setFooter({ text: 'Presented by Alex Hoang', iconURL: 'https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png' });
        
        await interaction.reply({embeds: [calorieList]});
      }
	}
 
});

client.on('messageCreate', message => 
{
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split('-');

  if (args[0] == 'input')
  {
    if (!isNaN(args[2])) 
    {
      totalCalories = totalCalories + parseInt(args[2]);
      message.channel.send(`Great Job! Keep getting your calories in! ${args[2]} calories has been inputed`);
      foodList[args[1]] = args[2];
      var tempDate = (new Date()).toLocaleString().split(',');
      db.insertFoodTable({date: tempDate[0], food: args[1], calories: args[2]});
    } 

    else if (isNaN(args[1])) 
    {
      message.channel.send("Please type in a valid response");
    }

    if (totalCalories >= calorieGoal) 
    {
      message.channel.send("You have successfully reached your calorie goal for the day! Keep getting those calories in!");
    }
  }
  else if (args[0] == 'get')
  {
    if (args[1] == 'FoodListFrom')
    {
      let tempList = db.getFoodFromDate(args[2]);

      tempList.then(function(result) {
        var foods = "";
        var calories = "";
        var order = 1;

        for (let i = 0; i < result.length; i++)
        {
          //foods += order + "." + "`" + key + "` \n";
          foods += `${order}. \`${result[i].food.trim()}\`\n`;
          //calories += "`" + foodList[key] + " cal`" + "\n";
          calories += `\`${result[i].calories} cal\`\n`
          order++;
        }

        var calorieList = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${args[2]} Food List`)
        .setDescription(`List of Food & Calories Consumed on ${args[2]}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/1014283703876333568/1015015594229243935/111.png')
        .addFields({name: "Food", value: foods, inline: true}, {name: "Calories", value: calories, inline: true})
        .setTimestamp()
        .setFooter({ text: 'Presented by Alex Hoang', iconURL: 'https://lindyhealth.b-cdn.net/wp-content/uploads/2022/05/zyzz-pose-how-to-iconic.png' });
        
        message.channel.send({embeds: [calorieList]});
      });
    }
  }
});

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

  // "eggs and bacon" 500 