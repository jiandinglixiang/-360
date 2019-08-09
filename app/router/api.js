'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.resources('/api/v1/user', controller.api.userManage);
  router.get('/api/v1/test', controller.api.test.test);
};
