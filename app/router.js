'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/admin.js')(app); // /admin/后端
  require('./router/api.js')(app); // /api/v1接口
};
