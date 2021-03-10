/**github调用代码 */


// var http = require('http')
// var createHandler = require('github-webhook-handler')
// var handler = createHandler({ path: '/', secret: '7777' })

// function RunCmd(cmd, args, cb) {
//   var spawn = require('child_process').spawn;
//   var child = spawn(cmd, args);
//   var result = '';
//   child.stdout.on('data', function(data) {
//     result += data.toString();
//   });
//   child.stdout.on('end', function() {
//     cb(result)
//   });
// }

// http.createServer(function (req, res) {
//     console.log('启动成功！')
//   handler(req, res, function (err) {
//     res.statusCode = 404;
//     res.end('no such location');
//   })
// }).listen(7777)

// handler.on('error', function (err) {
//   console.error('Error:', err.message);
// })

// handler.on('push', function (event) {
//   console.log('监听推送事件',
//     event.payload.repository.name,
//     event.payload.ref, JSON.stringify(event));
//     if (event.payload.ref == "refs/heads/master") {
//         console.log("进入master推送执行")
//         var shpath = './blog-start.sh';
//         RunCmd('sh', [shpath], function(result) {
//             console.log("脚本执行结果",result);
//         })
//     }  
// })

// handler.on('issues', function (event) {
//   console.log('Received an issue event for %s action=%s: #%d %s',
//     event.payload.repository.name,
//     event.payload.action,
//     event.payload.issue.number,
//     event.payload.issue.title);
// })


/**码云调用代码 */
var http = require('http');
var spawn = require('child_process').spawn;

// 码云用
// token 保持和 码云 后台设置的一致
var createHandler = require('gitee-webhook-middleware');
var handler = createHandler({ path: '/', token: '7777' });
// git用
// var handler = createHandler({ path: '/webhook', secret: 'webhook' });
// var createHandler = require('github-webhook-handler');

// 上面的 secret 保持和 GitHub 后台设置的一致
http.createServer(function (req, res) {
  console.log("启动成功！")
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(7777);
console.log('listen at prot 7777')
          
handler.on('error', function (err) {
  console.error('Error:', err.message)
});
// 阅读上面代码,你会发现handler监听到push事件调用对应的函数,所以你要做的就是在函数中执行deploy.sh命令,你需要在index.js添加代码

// 修改push监听事件,用来启动脚本文件
// 码云是Push Hook， 而git是push
handler.on('Push Hook', function (event) {
  console.log('监听推送事件',
    event.payload.repository.name,
    event.payload.ref); 
    
  runCommand('sh', ['./blog-start.sh'], function( txt ){
    console.log(txt);
  });
}); 

// 启动脚本文件    
function runCommand( cmd, args, callback ){
    var child = spawn( cmd, args );
    var resp = 'Deploy OK';
    child.stdout.on('data', function( buffer ){ resp += buffer.toString(); });
    child.stdout.on('end', function(){ callback( resp ) });
}