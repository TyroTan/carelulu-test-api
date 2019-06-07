module.exports = ({ sequelize, Sequelize }) => {
  if (!sequelize || !Sequelize) {
    throw Error(
      `sequelize Sequelize are required.
        typeof ${sequelize},
        typeof ${Sequelize}`
    );
  }

  const { Model } = Sequelize;

  class Note extends Model {}

  Note.init(
    {
      note: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
    },
    {
      modelName: "notes", // if you don't do this, webpack transpiles relations
      timestamps: true,
      sequelize
    }
  );

  return Note;
};
