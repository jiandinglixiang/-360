'use strict';
module.exports = app => {
  const { controller, router } = app;
  const userController = controller.admin.userController;
  router.resources('/admin/user', userController);
  // router.get('/api/v1/test', controller.api.test.test);
};
