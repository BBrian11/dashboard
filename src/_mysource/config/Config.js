import global from "./config.json";

class Config {
  static instance;

  static getInstance = () => {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  };

  isProduction = () => {
    return true; // TODO environments??
  };

  getApiBasePath = () => {
    return this.isProduction() ? global.production.api : global.development.api;
  };
}

export default Config;
