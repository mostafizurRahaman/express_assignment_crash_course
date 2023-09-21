const fs = require("fs");
const { readJsonFile } = require("../utils/readJsonFile");
const generateRandom = require("../utils/generateRandom");
const { updateUserInfo } = require("../utils/updateUserInfo");

module.exports.getUsers = (req, res, next) => {
   const limit = req.query.limit;

   try {
      if (typeof limit === "number" || !isNaN(limit)) {
         const usersData = readJsonFile();
         return res.send(usersData.slice(0, limit));
      }
      return res.status(401).send({
         success: false,
         message: "limit in required and it's will string or number",
      });
   } catch (err) {
      return res.status(500).send({
         success: false,
         message: "Found an error ",
      });
   }
};

module.exports.getRandomUser = (req, res, next) => {
   const userData = readJsonFile();
   const id = generateRandom(userData.length);

   res.send(userData[id]);
};

module.exports.saveUsers = (req, res, next) => {
   const { gender, name, contact, address, photoUrl } = req.body;
   if ((name, gender, contact, address, photoUrl)) {
      const userJSON = readJsonFile();
      const usersArray = [
         ...userJSON,
         { id: userJSON.length + 1, ...req.body },
      ];
      fs.writeFileSync("data.json", JSON.stringify(usersArray));
      res.status(200).send({
         success: true,
         message: "success",
         data: usersArray,
      });
   }
   return res
      .status(401)
      .send({ success: false, message: "Required data not found" });
};

module.exports.specificUpdate = (req, res, next) => {
   const id = req.params.id;

   const { userIds, name, address } = req.body;
   let counter = false;
   if (!name || !address) {
      return res
         .status(401)
         .send({ success: false, message: "required data not found" });
   }

   if (id === "bulk") {
      if (!Array.isArray(userIds)) {
         return res.status(401).send({
            success: false,
            message: "please gives an arrary to update bulk data",
         });
      } else {
         for (let a of userIds) {
            console.log("for 1st", a);
            if (typeof a !== "number") {
               const NumId = parseInt(a);

               if (!isNaN(NumId)) {
                  userIds[a - 1] = NumId;
               } else {
                  return res.status(401).send({
                     success: false,
                     message: "every id should be number",
                  });
               }
            }
         }
         console.log(userIds, counter);

         const updatedUser = [];

         for (let i of userIds) {
            const user = updateUserInfo(i, name, address);
            updatedUser.push(user);
            if (i === userIds.length) {
               processing = false;
            }
         }
         if (updateUserInfo.length === userIds.length) {
            return res.status(200).send({
               success: true,
               message: "success",
               data: updatedUser,
            });
         }
      }
   } else if (typeof parseInt(id) === "number" || !isNaN(id)) {
      const userId = parseInt(id);
      const user = updateUserInfo(userId, name, address);
      console.log("", user);
      res.send(user);
   }

   // console.log(id, name, address);
   // if ((id, name, address)) {
   //    const userData = readJsonFile();
   //    const user = userData.find((i) => i.id === id);
   //    const otherUsers = userData.filter((i) => i.id !== id);
   //    user.name = name;
   //    user.address = address;
   //    const strigifyUsers = JSON.stringify([user, ...otherUsers]);
   //    fs.writeFileSync("data.json", strigifyUsers);
   //    return res.status(200).send({
   //       success: true,
   //       message: `updated user ${id}`,
   //       user,
   //    });
   // }
};

module.exports.handleBulkUdpate = (req, res, next) => {
   const { userIds } = req.body.userIds;
   res.send(userIds);
};
module.exports.deleteUser = (req, res, next) => {
   const id = Number(req.params.id);
   console.log(isNaN(id));
   console.log(typeof id === "number");
   if (id || !isNaN(id)) {
      console.log(id);
      const users = readJsonFile();
      const user = users.find((i) => i.id === id);
      // console.log(users);
      console.log(user);
      if (!user?.id) {
         return res
            .status(401)
            .send({ success: false, messaage: "user not found" });
      }
      const restUsers = users.filter((i) => i.id !== id);
      fs.writeFileSync("data.json", JSON.stringify(restUsers));
      return res.status(200).send({ success: true, messaage: "success" });
   }
   return res
      .status(401)
      .send({ success: false, messaage: "Data not deleted" });
};
