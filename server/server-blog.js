var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: '7777' })

function RunCmd(cmd, args, cb) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var result = '';
  child.stdout.on('data', function(data) {
    result += data.toString();
  });
  child.stdout.on('end', function() {
    cb(result)
  });
}

http.createServer(function (req, res) {
    console.log('启动成功！')
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(7777)

handler.on('error', function (err) {
  console.error('Error:', err.message);
})

handler.on('push', function (event) {
  console.log('监听推送事件',
    event.payload.repository.name,
    event.payload.ref, JSON.stringify(event));
    if (event.payload.ref == "refs/heads/master") {
        console.log("进入master推送执行")
        var shpath = './blog-start.sh';
        RunCmd('sh', [shpath], function(result) {
            console.log("脚本执行结果",result);
        })
    }  
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title);
})