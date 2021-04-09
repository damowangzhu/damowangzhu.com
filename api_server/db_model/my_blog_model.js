const BlogModel = require('../db_schema/my_blog_schema');

class BlogModelAction {
  static async findBlogs() {
    return await BlogModel.findAll({
      attributes: ['id', 'url', 'title'],
      raw: true,
      order: [['id']],
      limit: 10,
    });
  }
}

module.exports = BlogModelAction;
