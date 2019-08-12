'use strict';
module.exports = app => {
  const { controller, router } = app;
  router.resources('/admin/user', controller.admin.userController);
  // router.get('/api/v1/test', controller.api.test.test);
};
