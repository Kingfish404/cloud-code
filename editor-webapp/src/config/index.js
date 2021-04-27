function createConfig() {

    // 开发环境配置
    let config_dev = {}
    // 生产环境配置
    let config_pro = {}

    config_dev.base_url = 'http://127.0.0.1:3210';
    config_pro.base_url = 'http://web.kingfish404.cn';

    if (process.env === 'development') {
        return config_dev;
    }
    return config_pro;
}

export default createConfig()