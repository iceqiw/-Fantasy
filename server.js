var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

//代理服务器
var proxy = [{
	path: '/api/*', //必须得有一个文件地址，如果顶层文件夹名字不同，则用/*代替
	target: 'http://localhost:19999',
	host: 'localhost',
	secure: false
}];
var server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	progress: true,
	stats: {
		colors: true,
	},
	proxy
});

//将其他路由，全部返回index.html
server.app.get('*', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html')
});
server.listen(18888, function() {
	console.log('正常打开18888端口')
});
