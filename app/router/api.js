'use strict';
module.exports = app => {
  const { router, controller } = app;
  const userController = controller.api.userController;
  const verifyToken = app.middleware.verifyToken();
  // router.resources('/api/v1/user', controller.api.userController);
  router.get('/api/v1/User', verifyToken, userController.findUserDatum); // 获取资料
  router.post('/api/v1/User/register', userController.create); // 注册
  router.post('/api/v1/User/login', userController.login); // 登陆
};
