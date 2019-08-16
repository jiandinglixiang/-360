'use strict';
module.exports = app => {
  const { router, controller } = app;
  const api = controller.api;
  const userController = Object.assign(api.userController);
  const infoController = Object.assign(api.infoController);
  const verifyToken = app.middleware.verifyToken();
  // router.resources('/api/v1/user', controller.api.userController);User/resetPassword
  router.get('/api/v1/User', verifyToken, userController.findUserDatum); // 获取资料
  router.post('/api/v1/User/login', userController.login); // 登陆
  router.get('/api/v1/User/logout', verifyToken, userController.loginOut); // 退出
  router.post('/api/v1/User/register', userController.create); // 注册
  router.post('/api/v1/User/resetPassword', userController.updatePassword); // 修改密码

  router.get('/api/v1/Config/fetBankList', verifyToken, infoController.backBankList); // 获取银行
  router.get('/api/v1/User/getUserBankCard', verifyToken, infoController.backUserBankInfo); // 银行卡信息
  router.post('/api/v1/User/saveBankCardInfo', verifyToken, infoController.addUserBankInfo); // 银行卡信息
};
