const crypto = require('crypto');

function generateRandomString(length) {
  const lettersAndDigits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, lettersAndDigits.length);
    randomString += lettersAndDigits[randomIndex];
  }

  return randomString;
}



module.exports = { generateRandomString };
