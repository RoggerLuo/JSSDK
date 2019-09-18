const config = () => {
    return {
        port: 8091,
        ctx:{
            domainId: 'workplus',
            orgId: "e63bf7a5-ce40-4c03-bd08-3204d33034ac", 
        }, 
        workplus: {
            apiServer: { //apiServer的对内和对外访问地址
                internal: "https://api4.workplus.io/v1",
                public: "https://api4.workplus.io/v1"
            },
            clientId: "907ed931b41398b0f07c1d551a14160ea6be3889", 
            clientSecret: "07379bd84d0f4785849069bf68ac0cd8"
        },
        mongo: {
          uri: 'mongodb://localhost/bbs',
          opts: {
            user: 'bbsAdmin',
            pass: '123456',
            server: {
              reconnectTries: Number.MAX_VALUE,
              reconnectInterval: 3000
            }
          }
        },
        log4js: {
          appenders: [{
            type: 'console'
          }, {
            type: 'dateFile',
            filename: 'logs/bbs.log',
            pattern: '-yyyy-MM-dd',
            alwaysIncludePattern: false
          }],
          replaceConsole: true
        }
    }
   
}
module.exports = config()