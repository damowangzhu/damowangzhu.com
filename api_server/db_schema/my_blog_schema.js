const { Sequelize, Model } = require('sequelize');

const sequelize = require('./_database');

/**
 * 初始化表结构，
 */
class BlogModel extends Model {}
BlogModel.init(
  {
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: Sequelize.STRING,
  },
  {
    sequelize,
    tableName: 'blogs',
    freezeTableName: true,
    underscored: true,
  }
);

/** 自动更新字段 */
BlogModel.sync({ alter: true });

module.exports = BlogModel;
