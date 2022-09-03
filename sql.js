const sql = require("sqlite3");
const util = require("util");
const db = new sql.Database("data.db");

db.run = util.promisify(db.run);
db.get = util.promisify(db.get);
db.all = util.promisify(db.all);

initTables()
  .catch(function(err) {
    console.log("database table creation error", err);
  });

async function initTables() 
{
    let result1 =  await checkIfThere("goalTable");
    if (!result1) {
      console.log("Creating goal table");
      await createGoalTable();
    }
  
    let result2 = await checkIfThere("foodTable");
    if (!result2) {
      console.log("Creating food table");
      await createFoodTable();
    }
}

async function checkIfThere(table) 
{
    console.log("checking for",table);
    let cmd = "SELECT name FROM sqlite_master WHERE type='table' AND name = ?";
    let result = await db.get(cmd,[table]);
    if (result == undefined) { return false;} 
    else { return true; }
}

async function createGoalTable() 
{
    const cmd = 'CREATE TABLE goalTable (date TEXT, calories TEXT, goalMet TEXT, flag INTEGER)';
    await db.run(cmd);
    console.log("created goalTable");
}

async function createFoodTable() 
{
    const cmd = 'CREATE TABLE foodTable (date TEXT, food TEXT, calories TEXT)';
    await db.run(cmd);
    console.log("created foodTable");
}

//------------------------TABLE INSERTION FUNCTIONS-------------------------------------

async function insertFoodTable(data)
{
    const sql = "INSERT INTO foodTable(date, food, calories) values (?, ?, ?)";
    await db.run(sql, [data.date, data.food, data.calories]);
    console.log("insertion into foodTable complete");
    return true;
}

async function insertGoalTable(data)
{
    const sql = "INSERT INTO goalTable(date, calories, goalMet) values (?, ?, ?)";
    await db.run(sql, [data.date, data.calories, data.goalMet]);
    console.log("insertion into goalTable complete");
    return true;
}

async function getFoodFromDate(date)
{
    console.log("getting list of food from spcified date");
    const sql = "SELECT food, calories FROM foodTable WHERE date = ?";
    return await db.all(sql, date);
    //{ food: 'blue', calories: '123' }
}

module.exports = {
  insertFoodTable,
  insertGoalTable,
  getFoodFromDate,
}