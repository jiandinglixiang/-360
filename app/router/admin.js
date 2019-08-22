'use strict';
module.exports = app => {
  const { controller, router } = app;
  const userController = Object.assign(controller.admin.userController);
  router.get('/admin/user', userController.server);
  router.get('/admin/user1', userController.client);
  // router.get('/api/v1/test', controller.api.test.test);
};
