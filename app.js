'use strict';

class App {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    console.log('配置文件即将加载完成,最后修改配置的时候');
  }

  configDidLoad() {
    console.log('加载完成');
  }

  didLoad() {
    console.log('文件加载完成');
  }

  willReady() {
    console.log('插件启动完成');
  }

  didReady() {
    console.log('worker准备就绪');
  }

  serverDidReady() {
    console.log('应用启动完成');
  }

  beforeClose() {
    console.log('即将关闭');
  }
}

module.exports = App;
