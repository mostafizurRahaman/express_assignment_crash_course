const generateRandom = (limit) => {
   const randomNumber = Math.floor(Math.random() * limit);
   if (randomNumber <= limit || randomNumber <= 0) {
      return randomNumber;
   }

   return generateRandom(limit);
};

module.exports = generateRandom;
