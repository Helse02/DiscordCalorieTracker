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
    let result1 = await checkIfThere("foodTable");
    if (!result1) {
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

async function getFoodFromDate(date)
{
    console.log("getting list of food from spcified date");
    const sql = "SELECT food, calories FROM foodTable WHERE date = ?";
    return db.all(sql, date);
    //{ food: 'blue', calories: '123' }
}

//------------------------TABLE DELETION FUNCTIONS-------------------------------------

async function deleteFoodTable(data)
{
    const sql = "DELETE FROM foodTable WHERE food = ? AND date = ?";
    await db.run(sql, [data.food, data.date]);
    console.log("removal from foodTable complete");
    return true;
}

module.exports = {
  insertFoodTable,
  getFoodFromDate,
  deleteFoodTable,
}