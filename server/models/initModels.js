const { User } = require('./User.models');
const { Favorite } = require('./Favorite.models');
const {Character} = require("./Character.models")


const initModels = () => {


    User.belongsToMany(Character, { through: 'favorite', foreignKey: 'userId' });
	Character.belongsToMany(User, { through: 'favorite', foreignKey: 'ref_api' });
	
};

module.exports = { initModels };