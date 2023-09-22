const fs = require("fs");
const { readJsonFile } = require("./readJsonFile");

module.exports.updateUserInfo = (id, name, address) => {
   const userData = readJsonFile();
   const user = userData.find((i) => i.id == id);

   if (!user?.id) {
      return { id: false };
   }
   const otherUsers = userData.filter((i) => i.id !== id);
   user.name = name;
   user.address = address;
   const strigifyUsers = JSON.stringify(
      [user, ...otherUsers].sort((a, b) => {
         return a.id - b.id;
      })
   );
   fs.writeFileSync("data.json", strigifyUsers);

   return user;
};
