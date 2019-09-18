const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const httpProxy = require('http-proxy');

// const errorhandler = require('errorhandler');
module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(compression());
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(cookieParser());
    app.use(session({
        secret: 'Gibbbon', // 要改
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: require('./init_db').mongoose.connection}),
        rolling: true,
        cookie: {
            maxAge: 604800000 //加了个0,1小时 变 10个小时
        }
    })); 
    app.use('/', express.static(path.join(__dirname, '../public')));

    // var proxy = httpProxy.createProxyServer({
    //     target:'http://120.236.169.14:9080/bbs',
    // })
    // app.use(function(req, res, next) {
    //     if (req.url.indexOf('medias') > -1) {
    //         proxy.web(req, res)
    //     }
    // })
   
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,Content-Length,Authorization,Accept,Cookie,Cache-Control,Pragma,expire-day");
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

        if(!req.session.user_id){
            if(!req.session.isAdmin){
                if(
                    req.url.indexOf('admin-auth/login') !== -1||
                    req.url.indexOf('auth/login') !== -1||
                    req.url.indexOf('auth/verify') !== -1
                ) { //auth admin-auth login接口给予特权, req.url不包括query或者hash,safe
                    console.log('auth api')
                }   else {
                    res.status(401).send('authorization failed')
                    return //不加就会执行next，然后就会报错
                }             
            }
        }
        
        //权限控制写在这
        // if(req.url.indexOf(["管理接口列表"])) {
        //     //判断是否是有管理员权限
        // }
        next();
    });
}

/* 
if(req.url.indexOf("uploadRepo") != -1){
    if(!req.session.userId) {
        res.send("请先登录")
        return 
    }
}
// app.use('/uploadRepo', express.static('uploadRepo')) //path.join(__dirname,
// app.use('/catcher.js', express.static(path.join(__dirname, '../catcher/bug_catcher.js')));
// app.use('/server.md', express.static(path.join(__dirname, '../server.md')));
*/