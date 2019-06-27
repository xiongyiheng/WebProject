var path = require('path');
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var dbClient = require('./dbClient');
var SessionManager = require('./SessionManager');

var sessionManager = new SessionManager();

var url;


var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    url = req.url;
    var req_header = req.headers;
    var method = req.method;
    console.log(method);

    if (method == 'GET') {
        console.log(1);
        if (querystring.parse(req_header['cookie']) != null) {
            console.log(2);
            var cookies = querystring.parse(req_header['cookie']);
            if (cookies['sessionid'] != null) {
                console.log(3);
                var sessionid = cookies['sessionid'];
                var user = sessionManager.getUser(sessionid);
                if (user == null) {
                    console.log(4);
                    login_first(req, res);
                } else {
                    login_on(req, res);
                }
            } else {
                login_first(req, res);
            }
        } else {
            login_first(req, res);
        }
    }

    if (method == 'POST') {
        console.log(5);
        login_post(req, res);
    }
})
server.listen(3000);

function login_first(req, res) {
    var filePath;
    var fileName = "login.html";

    if (url.length > 1) {
        fileName = url.substring(1);
    }

    filePath = path.resolve(__dirname, fileName);
    fs.readFile(filePath, function (err, data) {
        res.end(data);
    })

}

function login_post(req, res) {
    req.on('data', function (data) {
        var params = querystring.parse(data.toString());
        var rs = dbClient.find({username: params.username}).toArray().then(data => {
            console.log(data[0]);
            if (!data[0]) {
                dbClient.insertOne(params);
                res.end('注册成功！');
                return;
            }
            else if (data[0].userpassword == params.userpassword) {
                var sessionid = sessionManager.newUser(params['username']);
                res.setHeader("Set-Cookie", ['sessionid=' + sessionid + ";HttpOnly"]);
                console.log(res.headers);
                res.end('登陆成功！');
                return;
            }
            else if (data[0].userpassword != params.userpassword) {
                res.end('登陆失败！');
                return;
            }
        });
    })
}

function login_on(req, res) {
    var filePath;
    var fileName = "Main.html";

    filePath = path.resolve(__dirname, fileName);
    fs.readFile(filePath, function (err, data) {
        res.end(data);
    })
}
