const bcrypt = require("bcrypt");


const saltRounds = 10;

async function generateHash(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    console.log('Generated Hash:', hash);
    return hash;
  } catch (err: any) {
    console.error(err.message);
  }
}

async function validateUser(password, hash) {
  try {
    const result = await bcrypt.compare(password, hash);
    console.log('Validation Result:', result);
    return result;
  } catch (err: any) {
    console.error(err.message);
    return false;
  }
}

module.exports = { generateHash, validateUser };