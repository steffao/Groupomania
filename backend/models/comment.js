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
        foreignKey:{
          allowNull:false
        }
      })
      models.Comment.belongsTo(models.User, {
        foreignKey:{
          allowNull:false
        }
      })
    }
  }
  Comment.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    is_active : DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Comment',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Comment;
};