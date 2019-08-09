'use strict';
module.exports = app => {
  const { controller, router } = app;
  router.resources('/admin/user', controller.admin.userManage);
};
