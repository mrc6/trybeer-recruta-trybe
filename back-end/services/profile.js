const model = require('../models/index');

const setNewName = (body) => {
  model.profile.setNewName(body);
};

module.exports = {
  setNewName,
};
