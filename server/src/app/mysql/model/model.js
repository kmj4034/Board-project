module.exports = (sequelizeConfig, Sequelize) => {
  const Tutorial = sequelizeConfig.define("tutorial", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Tutorial;
};
