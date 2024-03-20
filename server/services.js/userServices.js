const fs = require('fs').promises;

const getUsers = async (body) => {
  const userdata = await fs.readFile('./db/users.json', 'utf-8');
  return JSON.parse(userdata);
};

module.exports = { getUsers };
