const fs = require("fs");

module.exports.readJsonFile = () => {
   const data = fs.readFileSync("data.json");
   const userJSON = JSON.parse(data);
   return userJSON;
};
