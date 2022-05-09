'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.Post, {
        foreignKey : {name:'post_id', allowNull:false}, //déclarer la fk dans le model de provenance également
        onDelete : 'CASCADE'
      })
      models.Comment.belongsTo(models.User, {
        foreignKey : {name:'user_id', allowNull:false}, //déclarer la fk dans le model de provenance également
        onDelete : 'CASCADE'
      })
    }
  }
  Comment.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Comment',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Comment;
};