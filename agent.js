'use strict';

class Agent {
  constructor(agent) {
    this.agent = agent;
    this.name = 'agent';
    // console.log('agent', agent);
  }

  configWillLoad() {
    console.log(this.name, '配置文件即将加载完成,最后修改配置的时候');
  }

  configDidLoad() {
    console.log(this.name, '加载完成');
  }

  didLoad() {
    console.log(this.name, '文件加载完成');
  }

  willReady() {
    console.log(this.name, '插件启动完成');
  }

  didReady() {
    console.log(this.name, 'worker准备就绪');
  }

  serverDidReady() {
    console.log(this.name, '应用启动完成');
  }

  beforeClose() {
    console.log(this.name, '即将关闭');
  }
}

module.exports = Agent;
