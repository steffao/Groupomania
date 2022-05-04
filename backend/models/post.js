'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {       
        foreignKey : {name:'user_id', allowNull:false}, //déclarer la fk dans le model de provenance également
        onDelete : 'CASCADE'
      }),
      models.Post.hasMany(models.Comment, {
        foreignKey: 'post_id',
        onDelete : 'CASCADE'
      })
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    media_url: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    is_active : DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Post',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Post;
};