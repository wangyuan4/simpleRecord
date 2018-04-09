/**
 * 生产环境的配置内容
 */

module.exports = {
    env: 'production', //环境名称
    port: 3320,         //服务端口号
    mysql: {
      client: 'mysql',
      connection: {
        host: '118.89.24.21',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'myapp',
        charset: 'utf8',
        connectTimeout: 15000,
        stringifyObjects: false,
        multipleStatements: true,
        supportBigNumbers: true,
        connectionLimit: 1
      },
      debug: false
    },
    mongodb_url: '',    //数据库地址
    redis_url:'',       //redis地址
    redis_port: ''      //redis端口号
}
